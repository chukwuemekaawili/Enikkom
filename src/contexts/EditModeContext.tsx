import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PendingChange {
  pageSlug: string;
  sectionKey: string;
  field: string;
  value: any;
  type: 'text' | 'image' | 'video' | 'repeater' | 'json';
}

type HistoryEntry = Map<string, PendingChange>;

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  pendingChanges: Map<string, PendingChange>;
  addChange: (change: PendingChange) => void;
  removeChange: (key: string) => void;
  saveAllChanges: () => Promise<void>;
  discardChanges: () => void;
  isSaving: boolean;
  hasChanges: boolean;
  // Undo/Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  // Status
  lastSaved: Date | null;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    // Return a no-op context for non-admin users
    return {
      isEditMode: false,
      toggleEditMode: () => {},
      pendingChanges: new Map(),
      addChange: () => {},
      removeChange: () => {},
      saveAllChanges: async () => {},
      discardChanges: () => {},
      isSaving: false,
      hasChanges: false,
      canUndo: false,
      canRedo: false,
      undo: () => {},
      redo: () => {},
      lastSaved: null,
      saveStatus: 'idle' as const,
    };
  }
  return context;
};

const MAX_HISTORY = 50;

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  // History stacks for undo/redo
  const historyRef = useRef<HistoryEntry[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [historyTrigger, setHistoryTrigger] = useState(0);

  const pushToHistory = useCallback((newChanges: Map<string, PendingChange>) => {
    // Remove any redo states if we're not at the end
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    }
    
    // Add new state
    historyRef.current.push(new Map(newChanges));
    historyIndexRef.current = historyRef.current.length - 1;
    
    // Limit history size
    if (historyRef.current.length > MAX_HISTORY) {
      historyRef.current = historyRef.current.slice(-MAX_HISTORY);
      historyIndexRef.current = historyRef.current.length - 1;
    }
    
    setHistoryTrigger(t => t + 1);
  }, []);

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) return;
    setIsEditMode(prev => {
      if (prev) {
        // Exiting edit mode - clear everything
        setPendingChanges(new Map());
        historyRef.current = [];
        historyIndexRef.current = -1;
        setHistoryTrigger(t => t + 1);
      } else {
        // Entering edit mode - initialize history
        historyRef.current = [new Map()];
        historyIndexRef.current = 0;
      }
      return !prev;
    });
  }, [isAdmin]);

  const addChange = useCallback((change: PendingChange) => {
    setPendingChanges(prev => {
      const next = new Map(prev);
      const key = `${change.pageSlug}:${change.sectionKey}:${change.field}`;
      next.set(key, change);
      pushToHistory(next);
      return next;
    });
    setSaveStatus('idle');
  }, [pushToHistory]);

  const removeChange = useCallback((key: string) => {
    setPendingChanges(prev => {
      const next = new Map(prev);
      next.delete(key);
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const discardChanges = useCallback(() => {
    setPendingChanges(new Map());
    historyRef.current = [new Map()];
    historyIndexRef.current = 0;
    setHistoryTrigger(t => t + 1);
    setSaveStatus('idle');
    toast.info('Changes discarded');
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const prevState = historyRef.current[historyIndexRef.current];
      setPendingChanges(new Map(prevState));
      setHistoryTrigger(t => t + 1);
      setSaveStatus('idle');
    }
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const nextState = historyRef.current[historyIndexRef.current];
      setPendingChanges(new Map(nextState));
      setHistoryTrigger(t => t + 1);
      setSaveStatus('idle');
    }
  }, []);

  const saveAllChanges = useCallback(async () => {
    if (pendingChanges.size === 0) return;

    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      // Group changes by page and section
      const groupedChanges: Record<string, Record<string, Record<string, any>>> = {};
      
      pendingChanges.forEach((change) => {
        if (!groupedChanges[change.pageSlug]) {
          groupedChanges[change.pageSlug] = {};
        }
        if (!groupedChanges[change.pageSlug][change.sectionKey]) {
          groupedChanges[change.pageSlug][change.sectionKey] = {};
        }
        groupedChanges[change.pageSlug][change.sectionKey][change.field] = change.value;
      });

      // Save each section's changes
      for (const pageSlug of Object.keys(groupedChanges)) {
        for (const sectionKey of Object.keys(groupedChanges[pageSlug])) {
          // First, get existing content
          const { data: existing } = await supabase
            .from('page_content')
            .select('content')
            .eq('page_slug', pageSlug)
            .eq('section_key', sectionKey)
            .maybeSingle();

          const existingContent = (existing?.content as Record<string, any>) || {};
          const changes = groupedChanges[pageSlug][sectionKey];
          
          // Deep merge changes - handle nested fields like "client_logos.0.imageUrl"
          const newContent = { ...existingContent };
          
          Object.entries(changes).forEach(([field, value]) => {
            if (field.includes('.')) {
              // Handle nested path like "client_logos.0.imageUrl"
              const parts = field.split('.');
              let current: any = newContent;
              
              for (let i = 0; i < parts.length - 1; i++) {
                const key = parts[i];
                const nextKey = parts[i + 1];
                const isNextIndex = !isNaN(parseInt(nextKey));
                
                if (!(key in current)) {
                  current[key] = isNextIndex ? [] : {};
                }
                current = current[key];
              }
              
              const lastKey = parts[parts.length - 1];
              current[lastKey] = value;
            } else {
              newContent[field] = value;
            }
          });

          // Upsert the content
          const { error } = await supabase
            .from('page_content')
            .upsert({
              page_slug: pageSlug,
              section_key: sectionKey,
              content: newContent,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'page_slug,section_key',
            });

          if (error) throw error;
        }
      }

      setPendingChanges(new Map());
      historyRef.current = [new Map()];
      historyIndexRef.current = 0;
      setHistoryTrigger(t => t + 1);
      setLastSaved(new Date());
      setSaveStatus('saved');
      toast.success(`Saved ${pendingChanges.size} change${pendingChanges.size > 1 ? 's' : ''}`);
      
      // Reload the page to show saved changes
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveStatus('error');
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges]);

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  // Only render context if admin
  if (!isAdmin) {
    return <>{children}</>;
  }

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        pendingChanges,
        addChange,
        removeChange,
        saveAllChanges,
        discardChanges,
        isSaving,
        hasChanges: pendingChanges.size > 0,
        canUndo,
        canRedo,
        undo,
        redo,
        lastSaved,
        saveStatus,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

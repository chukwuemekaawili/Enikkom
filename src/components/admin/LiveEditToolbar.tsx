import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Pencil, 
  Save, 
  Trash2, 
  Eye, 
  Settings, 
  Loader2,
  Undo2,
  Redo2,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function LiveEditToolbar() {
  const { isAdmin } = useAuth();
  const { 
    isEditMode, 
    toggleEditMode, 
    hasChanges, 
    pendingChanges,
    saveAllChanges, 
    discardChanges,
    isSaving,
    canUndo,
    canRedo,
    undo,
    redo,
    saveStatus,
    lastSaved,
  } = useEditMode();
  const location = useLocation();

  // Don't show on admin pages
  if (!isAdmin || location.pathname.startsWith('/admin')) {
    return null;
  }

  const formatLastSaved = () => {
    if (!lastSaved) return null;
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]",
            "bg-background/95 backdrop-blur-lg border shadow-2xl rounded-full",
            "px-2 py-2 flex items-center gap-1.5"
          )}
        >
          {!isEditMode ? (
            // Not in edit mode - show enter button
            <>
              <Button
                onClick={toggleEditMode}
                size="sm"
                className="rounded-full h-10 px-5 gap-2"
              >
                <Pencil className="h-4 w-4" />
                <span className="font-medium">Edit Page</span>
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full h-10 w-10 p-0"
                    asChild
                  >
                    <Link to="/admin/dashboard">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Admin Dashboard</TooltipContent>
              </Tooltip>
            </>
          ) : (
            // In edit mode - show controls
            <>
              {/* Undo/Redo */}
              <div className="flex items-center border-r border-border pr-1.5 mr-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={undo}
                      disabled={!canUndo}
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-9 w-9 p-0"
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={redo}
                      disabled={!canRedo}
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-9 w-9 p-0"
                    >
                      <Redo2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
                </Tooltip>
              </div>

              {/* Change counter / Status */}
              {hasChanges ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm font-medium text-primary">
                    {pendingChanges.size} unsaved
                  </span>
                </motion.div>
              ) : saveStatus === 'saved' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full"
                >
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Saved {formatLastSaved()}
                  </span>
                </motion.div>
              ) : saveStatus === 'error' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 rounded-full"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-sm font-medium text-destructive">
                    Save failed
                  </span>
                </motion.div>
              ) : null}

              {/* Save button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={saveAllChanges}
                    disabled={!hasChanges || isSaving}
                    size="sm"
                    className={cn(
                      "rounded-full h-10 px-5 gap-2",
                      hasChanges && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span className="font-medium">Save</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save all changes (Ctrl+S)</TooltipContent>
              </Tooltip>

              {/* Discard button */}
              {hasChanges && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={discardChanges}
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-9 w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Discard all changes</TooltipContent>
                </Tooltip>
              )}

              {/* Preview / Exit button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleEditMode}
                    variant="outline"
                    size="sm"
                    className="rounded-full h-10 px-4 gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">Preview</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Exit edit mode</TooltipContent>
              </Tooltip>

              {/* Go to Admin */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full h-9 w-9 p-0"
                    asChild
                  >
                    <Link to="/admin/dashboard">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Admin Dashboard</TooltipContent>
              </Tooltip>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
}

import { useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

export function useEditModeKeyboard() {
  const { isEditMode, saveAllChanges, undo, redo, canUndo, canRedo, hasChanges } = useEditMode();

  useEffect(() => {
    if (!isEditMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 's') {
        e.preventDefault();
        if (hasChanges) {
          saveAllChanges();
        }
      }

      if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          undo();
        }
      }

      if ((modifier && e.key === 'y') || (modifier && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        if (canRedo) {
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode, saveAllChanges, undo, redo, canUndo, canRedo, hasChanges]);
}

import { createContext, useContext, type ReactNode } from "react";

export interface PendingChange {
  pageSlug: string;
  sectionKey: string;
  field: string;
  value: unknown;
  type: "text" | "image" | "video" | "repeater" | "json";
}

interface EditModeContextValue {
  isEditMode: boolean;
  toggleEditMode: () => void;
  pendingChanges: Map<string, PendingChange>;
  addChange: (change: PendingChange) => void;
  removeChange: (key: string) => void;
  saveAllChanges: () => Promise<void>;
  discardChanges: () => void;
  isSaving: boolean;
  hasChanges: boolean;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  lastSaved: Date | null;
  saveStatus: "idle" | "saving" | "saved" | "error";
}

const noop = () => {};
const noopAsync = async () => {};

const defaultValue: EditModeContextValue = {
  isEditMode: false,
  toggleEditMode: noop,
  pendingChanges: new Map(),
  addChange: noop,
  removeChange: noop,
  saveAllChanges: noopAsync,
  discardChanges: noop,
  isSaving: false,
  hasChanges: false,
  canUndo: false,
  canRedo: false,
  undo: noop,
  redo: noop,
  lastSaved: null,
  saveStatus: "idle",
};

const EditModeContext = createContext<EditModeContextValue>(defaultValue);

export function EditModeProvider({ children }: { children: ReactNode }) {
  return (
    <EditModeContext.Provider value={defaultValue}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

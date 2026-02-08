import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  pageSlug: string;
  sectionKey: string;
  field: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  children?: React.ReactNode;
}

export function EditableText({
  value,
  pageSlug,
  sectionKey,
  field,
  as: Component = 'span',
  className,
  multiline = false,
  children,
}: EditableTextProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Check if there's a pending change for this field
  const changeKey = `${pageSlug}:${sectionKey}:${field}`;
  const pendingChange = pendingChanges.get(changeKey);
  
  // Priority: pending change > CMS value passed as prop
  const displayValue = pendingChange?.value ?? value;

  // Update local value when the source value changes (CMS update or prop change)
  useEffect(() => {
    setLocalValue(displayValue);
  }, [displayValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    // Only add change if different from the original CMS value
    if (localValue !== value) {
      addChange({
        pageSlug,
        sectionKey,
        field,
        value: localValue,
        type: 'text',
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(displayValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Non-edit mode: just render the content
  if (!isEditMode) {
    return <Component className={className}>{children || displayValue}</Component>;
  }

  // Editing inline
  if (isEditing) {
    return (
      <div className="relative inline-flex items-center gap-1 min-w-[100px]">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full min-h-[80px] px-2 py-1 rounded border-2 border-primary bg-background text-foreground resize-y",
              className
            )}
            style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full px-2 py-1 rounded border-2 border-primary bg-background text-foreground",
              className
            )}
            style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}
          />
        )}
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={handleSave}
            className="p-1 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
            title="Save"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            title="Cancel"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  const hasChange = !!pendingChange;

  return (
    <Component
      className={cn(
        className,
        "relative cursor-pointer group inline",
        "outline outline-2 outline-dashed outline-transparent hover:outline-primary/50",
        hasChange && "outline-green-500/50 bg-green-500/10"
      )}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {children || displayValue}
      <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground rounded-full p-1 shadow-lg z-10">
        <Pencil className="h-2.5 w-2.5" />
      </span>
    </Component>
  );
}

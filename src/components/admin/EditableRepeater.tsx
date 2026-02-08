import React, { useState, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';
import { Plus, Trash2, GripVertical, Edit2, Check, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RepeaterItem {
  [key: string]: any;
}

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'number';
  placeholder?: string;
}

interface EditableRepeaterProps {
  items: RepeaterItem[];
  pageSlug: string;
  sectionKey: string;
  field: string;
  fields: FieldConfig[];
  renderItem: (item: RepeaterItem, index: number) => React.ReactNode;
  defaultNewItem?: RepeaterItem;
  className?: string;
  itemClassName?: string;
  maxItems?: number;
  minItems?: number;
}

export function EditableRepeater({
  items,
  pageSlug,
  sectionKey,
  field,
  fields,
  renderItem,
  defaultNewItem = {},
  className,
  itemClassName,
  maxItems = 20,
  minItems = 0,
}: EditableRepeaterProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<RepeaterItem>({});

  // Check if there's a pending change for this field
  const changeKey = `${pageSlug}:${sectionKey}:${field}`;
  const pendingChange = pendingChanges.get(changeKey);
  const displayItems: RepeaterItem[] = pendingChange?.value ?? items;

  useEffect(() => {
    if (editingIndex !== null && displayItems[editingIndex]) {
      setEditFormData({ ...displayItems[editingIndex] });
    }
  }, [editingIndex, displayItems]);

  const saveItems = (newItems: RepeaterItem[]) => {
    addChange({
      pageSlug,
      sectionKey,
      field,
      value: newItems,
      type: 'repeater',
    });
  };

  const handleAdd = () => {
    if (displayItems.length >= maxItems) return;
    
    const newItem: RepeaterItem = { ...defaultNewItem };
    fields.forEach(f => {
      if (!newItem[f.key]) {
        newItem[f.key] = f.type === 'number' ? 0 : '';
      }
    });
    
    const newItems = [...displayItems, newItem];
    saveItems(newItems);
    setEditingIndex(newItems.length - 1);
    setEditFormData(newItem);
  };

  const handleDelete = (index: number) => {
    if (displayItems.length <= minItems) return;
    const newItems = displayItems.filter((_, i) => i !== index);
    saveItems(newItems);
    setEditingIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...displayItems];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    saveItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === displayItems.length - 1) return;
    const newItems = [...displayItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    saveItems(newItems);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    const newItems = [...displayItems];
    newItems[editingIndex] = editFormData;
    saveItems(newItems);
    setEditingIndex(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFormData({});
  };

  if (!isEditMode) {
    return (
      <div className={className}>
        {displayItems.map((item, index) => (
          <div key={index} className={itemClassName}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  const hasChange = !!pendingChange;

  return (
    <div className={cn(
      "relative",
      hasChange && "ring-2 ring-green-500/30 ring-offset-2 rounded-lg",
      className
    )}>
      {/* Edit mode header */}
      <div className="flex items-center justify-between mb-3 p-2 bg-primary/10 rounded-lg">
        <span className="text-sm font-medium text-primary flex items-center gap-2">
          <Edit2 className="h-4 w-4" />
          Editing List ({displayItems.length} items)
        </span>
        {displayItems.length < maxItems && (
          <Button size="sm" variant="outline" onClick={handleAdd} className="h-8">
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "relative border rounded-lg overflow-hidden transition-all",
              editingIndex === index ? "border-primary bg-primary/5" : "border-border",
              itemClassName
            )}
          >
            {editingIndex === index ? (
              // Edit form
              <div className="p-4 space-y-3">
                {fields.map((fieldConfig) => (
                  <div key={fieldConfig.key}>
                    <label className="text-sm font-medium mb-1 block">{fieldConfig.label}</label>
                    {fieldConfig.type === 'textarea' ? (
                      <Textarea
                        value={editFormData[fieldConfig.key] || ''}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, [fieldConfig.key]: e.target.value }))}
                        placeholder={fieldConfig.placeholder}
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={fieldConfig.type === 'number' ? 'number' : 'text'}
                        value={editFormData[fieldConfig.key] || ''}
                        onChange={(e) => setEditFormData(prev => ({ 
                          ...prev, 
                          [fieldConfig.key]: fieldConfig.type === 'number' ? Number(e.target.value) : e.target.value 
                        }))}
                        placeholder={fieldConfig.placeholder}
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-2 justify-end pt-2">
                  <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveEdit}>
                    <Check className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              // Display mode with controls
              <div className="flex items-stretch">
                {/* Drag handle and reorder buttons */}
                <div className="flex flex-col justify-center items-center px-2 bg-muted/50 border-r">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === displayItems.length - 1}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Content preview */}
                <div className="flex-1 p-3">
                  {renderItem(item, index)}
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col justify-center gap-1 px-2 border-l">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="p-2 hover:bg-primary/10 rounded text-primary"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {displayItems.length > minItems && (
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 hover:bg-destructive/10 rounded text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {displayItems.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-3">No items yet</p>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1" /> Add First Item
          </Button>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface SortableSectionProps {
  id: string;
  sectionLabel: string;
  hasCustomContent: boolean;
  updatedAt?: string;
  children: React.ReactNode;
}

export function SortableSection({ 
  id, 
  sectionLabel, 
  hasCustomContent, 
  updatedAt, 
  children 
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <AccordionItem ref={setNodeRef} style={style} value={id} className="relative">
      <div className="flex items-center">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-2 cursor-grab active:cursor-grabbing hover:bg-muted rounded-l-md touch-none"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <AccordionTrigger className="flex-1 hover:no-underline">
          <div className="flex items-center gap-3">
            <span className="font-medium">{sectionLabel}</span>
            {hasCustomContent && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                Customized
              </span>
            )}
            {updatedAt && (
              <span className="text-xs text-muted-foreground">
                Updated: {new Date(updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </AccordionTrigger>
      </div>
      <AccordionContent className="pt-4 pb-6">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

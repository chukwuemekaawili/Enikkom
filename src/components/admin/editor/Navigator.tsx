import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Trash2, Plus, Layers } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageSection, SectionTemplate } from '@/services/cms';

interface NavigatorProps {
    sections: PageSection[];
    templates: SectionTemplate[];
    selectedSectionId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onReorder: (event: DragEndEvent) => void;
    onAdd: (templateKey: string) => void;
}

const SortableSectionItem: React.FC<{
    section: PageSection;
    templateName: string;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}> = ({ section, templateName, isSelected, onSelect, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: section.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`p-3 bg-card border rounded-lg cursor-pointer hover:border-primary transition-colors ${isSelected ? 'border-primary border-2 bg-primary/5' : ''
                }`}
            onClick={onSelect}
        >
            <div className="flex items-center gap-2">
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{templateName}</p>
                    <p className="text-xs text-muted-foreground truncate opacity-70">
                        {section.section_key}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export const Navigator: React.FC<NavigatorProps> = ({
    sections,
    templates,
    selectedSectionId,
    onSelect,
    onDelete,
    onReorder,
    onAdd
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between bg-card/50">
                <span className="font-semibold flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Navigator
                </span>
                <Badge variant="secondary">{sections.length}</Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Section List */}
                <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                        Page Sections
                    </h3>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onReorder}>
                        <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2 pb-4">
                                {sections.length === 0 && (
                                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                                        <p className="text-sm text-muted-foreground">No sections yet</p>
                                    </div>
                                )}
                                {sections.map(section => (
                                    <SortableSectionItem
                                        key={section.id}
                                        section={section}
                                        templateName={templates.find(t => t.key === section.template_key)?.name || section.template_key}
                                        isSelected={section.id === selectedSectionId}
                                        onSelect={() => onSelect(section.id)}
                                        onDelete={() => onDelete(section.id)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                {/* Add Widget */}
                <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                        Add Widget
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {templates.map(template => (
                            <Button
                                key={template.key}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start h-auto py-2"
                                onClick={() => onAdd(template.key)}
                            >
                                <Plus className="h-4 w-4 mr-2 text-primary" />
                                <div className="flex flex-col items-start gap-0.5">
                                    <span>{template.name}</span>
                                    <span className="text-[10px] text-muted-foreground font-normal">
                                        {template.description || "Content section"}
                                    </span>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

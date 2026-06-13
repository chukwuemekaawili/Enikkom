import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Sliders, Settings, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { PageSection, SectionTemplate } from '@/services/cms';
import { MediaManager } from '@/components/admin/media/MediaManager';
import { getAssetUrl } from '@/lib/assetMap';

interface FieldProps {
    field: any;
    value: any;
    onChange: (value: any) => void;
}

const FieldEditor: React.FC<FieldProps> = ({ field, value, onChange }) => {
    const [mediaOpen, setMediaOpen] = useState(false);

    switch (field.type) {
        case 'text':
            return (
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
                    <Input
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.label}
                        className="bg-background h-8 text-sm"
                    />
                </div>
            );
        case 'textarea':
            return (
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{field.label}</Label>
                    <Textarea
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.label}
                        rows={3}
                        className="bg-background text-sm resize-y"
                    />
                </div>
            );
        case 'richtext':
            return (
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{field.label}</Label>
                    <Textarea
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.label}
                        rows={6}
                        className="font-mono text-xs bg-background resize-y"
                    />
                    <p className="text-[10px] text-muted-foreground">HTML / Markdown Supported</p>
                </div>
            );
        case 'image':
            return (
                <div className="space-y-2">
                    <Label className="text-xs font-medium">{field.label}</Label>
                    {value && (
                        <div className="relative w-full h-32 bg-muted rounded-md overflow-hidden border group">
                            <img src={getAssetUrl(value)} alt={field.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange('');
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <Input
                            value={value || ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Image URL"
                            className="bg-background h-8 text-sm flex-1"
                        />
                        <Dialog open={mediaOpen} onOpenChange={setMediaOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" title="Select Image">
                                    <ImageIcon className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>Select Image</DialogTitle>
                                </DialogHeader>
                                <div className="flex-1 overflow-y-auto min-h-0">
                                    <MediaManager
                                        onSelect={(url) => {
                                            onChange(url);
                                            setMediaOpen(false);
                                        }}
                                        initialFilter="image"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            );
        case 'select':
            return (
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{field.label}</Label>
                    <select
                        value={value || field.options?.[0] || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-8 px-2 border rounded-md text-sm bg-background focus:ring-1 focus:ring-ring"
                    >
                        {field.options?.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            );
        case 'number':
            return (
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{field.label}</Label>
                    <Input
                        type="number"
                        value={value || field.default || ''}
                        onChange={(e) => onChange(Number(e.target.value))}
                        placeholder={field.label}
                        className="bg-background h-8 text-sm"
                    />
                </div>
            );
        case 'repeater':
            const items = Array.isArray(value) ? value : [];
            return (
                <div className="space-y-2 border rounded-lg p-2 bg-muted/20">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{field.label}</Label>
                    <div className="space-y-3">
                        {items.map((item: any, index: number) => (
                            <Card key={index} className="p-3 bg-background border shadow-sm relative group">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                                    onClick={() => onChange(items.filter((_, i) => i !== index))}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                                <div className="space-y-3 pt-2">
                                    {field.fields?.map((subField: any) => (
                                        <FieldEditor
                                            key={subField.name}
                                            field={subField}
                                            value={item[subField.name]}
                                            onChange={(newValue) => {
                                                const newItems = [...items];
                                                newItems[index] = { ...newItems[index], [subField.name]: newValue };
                                                onChange(newItems);
                                            }}
                                        />
                                    ))}
                                </div>
                            </Card>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onChange([...items, {}])}
                            className="w-full h-7 text-xs border-dashed"
                        >
                            <Plus className="h-3 w-3 mr-1.5" />
                            Add Item
                        </Button>
                    </div>
                </div>
            );
        default:
            return (
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">{field.label}</Label>
                    <Input
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.label}
                        className="bg-background h-8 text-sm"
                    />
                </div>
            );
    }
};

interface InspectorProps {
    selectedSection: PageSection | undefined;
    template: SectionTemplate | undefined;
    onChange: (field: string, value: any) => void;
}

export const Inspector: React.FC<InspectorProps> = ({ selectedSection, template, onChange }) => {
    if (!selectedSection || !template) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center select-none">
                <Settings className="h-12 w-12 mb-4 opacity-10" />
                <p className="text-sm font-medium opacity-50">No Selection</p>
                <p className="text-xs mt-1 max-w-[180px] opacity-40">
                    Select a section to edit its properties.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="h-12 border-b flex items-center px-4 gap-2 bg-card/50 shrink-0">
                <Sliders className="h-4 w-4 text-primary" />
                <div className="overflow-hidden">
                    <h3 className="font-semibold text-sm leading-none truncate">{template.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">Properties</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {template.schema.fields.map(field => (
                    <FieldEditor
                        key={field.name}
                        field={field}
                        value={selectedSection.content_draft[field.name]}
                        onChange={(value) => onChange(field.name, value)}
                    />
                ))}

                <div className="pt-8 border-t mt-4">
                    <p className="text-[10px] text-muted-foreground text-center">
                        Section ID: <span className="font-mono">{selectedSection.id.split('-')[0]}...</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';
import { Video, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditableVideoProps {
  src: string;
  pageSlug: string;
  sectionKey: string;
  field: string;
  className?: string;
  title?: string;
}

export function EditableVideo({
  src,
  pageSlug,
  sectionKey,
  field,
  className,
  title = "Video",
}: EditableVideoProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localUrl, setLocalUrl] = useState(src);

  // Check if there's a pending change for this field
  const changeKey = `${pageSlug}:${sectionKey}:${field}`;
  const pendingChange = pendingChanges.get(changeKey);
  const displaySrc = pendingChange?.value ?? src;

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleSave = () => {
    if (localUrl !== src) {
      addChange({
        pageSlug,
        sectionKey,
        field,
        value: localUrl,
        type: 'video',
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalUrl(displaySrc);
    setIsEditing(false);
  };

  if (!isEditMode) {
    return (
      <iframe
        src={getYouTubeEmbedUrl(displaySrc)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

  const hasChange = !!pendingChange;

  return (
    <div className={cn(
      "relative group",
      "outline outline-2 outline-dashed outline-transparent hover:outline-primary/50",
      hasChange && "outline-green-500/50",
    )}>
      <iframe
        src={getYouTubeEmbedUrl(displaySrc)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
      
      {/* Edit overlay */}
      <div className={cn(
        "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 transition-opacity",
        isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        {isEditing ? (
          <div className="bg-background p-4 rounded-xl shadow-xl max-w-md w-[90%]">
            <label className="text-sm font-medium mb-2 block">Video URL (YouTube)</label>
            <Input
              value={localUrl}
              onChange={(e) => setLocalUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="mb-3"
            />
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Video className="h-8 w-8 text-white" />
            <Button
              size="sm"
              onClick={() => {
                setLocalUrl(displaySrc);
                setIsEditing(true);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Video URL
            </Button>
          </>
        )}
      </div>

      {/* Change indicator */}
      {hasChange && !isEditing && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 z-10">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}

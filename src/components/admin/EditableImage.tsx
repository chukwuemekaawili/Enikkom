import React, { useState, useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';
import { ImageIcon, Upload, X, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EditableImageProps {
  src: string;
  alt: string;
  pageSlug: string;
  sectionKey: string;
  field: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
}

export function EditableImage({
  src,
  alt,
  pageSlug,
  sectionKey,
  field,
  className,
  containerClassName,
  aspectRatio = 'auto',
}: EditableImageProps) {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const [isUploading, setIsUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if there's a pending change for this field
  const changeKey = `${pageSlug}:${sectionKey}:${field}`;
  const pendingChange = pendingChanges.get(changeKey);
  
  // Priority: pending change > CMS value passed as prop (src)
  const displaySrc = pendingChange?.value ?? src;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${pageSlug}-${sectionKey}-${field}-${Date.now()}.${fileExt}`;
      const filePath = `page-content/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      // Add change to pending - this will be saved to page_content table
      addChange({
        pageSlug,
        sectionKey,
        field,
        value: publicUrl,
        type: 'image',
      });

      setShowUpload(false);
      toast.success('Image uploaded - click Save to apply changes');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Non-edit mode: just render the image
  if (!isEditMode) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        <img
          src={displaySrc}
          alt={alt}
          className={cn("w-full h-full object-cover", className)}
        />
      </div>
    );
  }

  const hasChange = !!pendingChange;

  return (
    <div
      className={cn(
        "relative overflow-hidden group cursor-pointer",
        "outline outline-2 outline-dashed outline-transparent hover:outline-primary/50",
        hasChange && "outline-green-500/50",
        containerClassName
      )}
      onClick={() => !isUploading && setShowUpload(true)}
    >
      <img
        src={displaySrc}
        alt={alt}
        className={cn("w-full h-full object-cover transition-opacity", className)}
      />
      
      {/* Edit overlay */}
      <div className={cn(
        "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 transition-opacity",
        showUpload ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
            <span className="text-white text-sm">Uploading...</span>
          </div>
        ) : showUpload ? (
          <div className="flex flex-col items-center gap-3 p-4">
            <Upload className="h-8 w-8 text-white" />
            <span className="text-white text-sm font-medium">Click or drop to replace</span>
            <label className="px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors text-sm font-medium">
              Choose Image
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUpload(false);
              }}
              className="text-white/70 hover:text-white text-sm underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <ImageIcon className="h-6 w-6 text-white" />
            <span className="text-white text-sm font-medium">Click to replace</span>
          </>
        )}
      </div>

      {/* Change indicator */}
      {hasChange && !showUpload && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}

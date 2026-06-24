import React from 'react';
import { EnhancedImage } from "@/components/ui/enhanced-image";

// Static content components. The site has no CMS/backend, so these simply
// render their provided content. The editing-capable variants were removed
// along with the Supabase admin; these passthroughs keep page markup intact.

export const EditableText = ({ value, children }: { value?: string; children?: React.ReactNode }) => {
    return <>{value || children || ''}</>;
};

export const EditableImage = ({
    src,
    alt,
    className,
    containerClassName,
    sizes,
    priority = false,
}: {
    src?: string;
    alt?: string;
    className?: string;
    containerClassName?: string;
    sizes?: string;
    priority?: boolean;
}) => {
    if (!src) return null;
    return (
        <EnhancedImage
            src={src}
            alt={alt || ''}
            wrapperClassName={containerClassName}
            className={className}
            sizes={sizes}
            priority={priority}
            tone="vivid"
        />
    );
};

export const EditableVideo = ({ src, className }: { src?: string; className?: string }) => {
    if (!src) return null;
    return <video src={src} className={className} controls />;
};

export const EditableRepeater = ({ items, renderItem }: { items?: any[]; renderItem: (item: any, index: number) => React.ReactNode }) => {
    if (!items || !Array.isArray(items)) return null;
    return <>{items.map((item, index) => renderItem(item, index))}</>;
};

// No-op components
export const LivePreviewPanel = () => null;
export const LiveEditToolbar = () => null;
export const CurrentAssetPreview = () => null;

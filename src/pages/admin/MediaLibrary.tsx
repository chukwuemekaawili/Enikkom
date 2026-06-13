import React from 'react';
import { MediaManager } from '@/components/admin/media/MediaManager';

const MediaLibrary: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Media Library</h1>
                <p className="text-muted-foreground mt-1">Upload and manage images, videos, and files</p>
            </div>

            <MediaManager />
        </div>
    );
};

export default MediaLibrary;

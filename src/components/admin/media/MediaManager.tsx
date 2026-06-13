import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, Loader2, Trash2, Image as ImageIcon, Video, File, Check } from 'lucide-react';
import { toast } from 'sonner';
import { formatBytes } from '@/lib/utils';
import { getMediaAssets, uploadMedia, deleteMedia, MediaAsset } from '@/services/cms';

interface MediaManagerProps {
    onSelect?: (url: string) => void;
    initialFilter?: 'all' | 'image' | 'video' | 'document';
    className?: string;
}

export const MediaManager: React.FC<MediaManagerProps> = ({
    onSelect,
    initialFilter = 'all',
    className
}) => {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'document'>(initialFilter);

    useEffect(() => {
        loadAssets();
    }, [filter]);

    const loadAssets = async () => {
        setLoading(true);
        try {
            const data = await getMediaAssets(filter);
            setAssets(data);
        } catch (error) {
            console.error('Error loading assets:', error);
            toast.error('Failed to load media');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            await uploadMedia(file);
            toast.success('Upload successful');
            loadAssets();
        } catch (error) {
            console.error('Error uploading:', error);
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (assetId: string) => {
        if (!confirm('Delete this file? This cannot be undone.')) return;

        try {
            await deleteMedia(assetId);
            setAssets(assets.filter(a => a.id !== assetId));
            toast.success('File deleted');
        } catch (error) {
            console.error('Error deleting:', error);
            toast.error('Delete failed');
        }
    };

    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case 'image': return <ImageIcon className="h-6 w-6" />;
            case 'video': return <Video className="h-6 w-6" />;
            default: return <File className="h-6 w-6" />;
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-2 bg-muted p-1 rounded-lg">
                    {(['all', 'image', 'video', 'document'] as const).map((type) => (
                        <Button
                            key={type}
                            variant={filter === type ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setFilter(type)}
                            className="capitalize h-7 px-3 text-xs"
                        >
                            {type}
                        </Button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Input
                        type="file"
                        id="media-upload-input"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                        }}
                        accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                    <Button
                        onClick={() => document.getElementById('media-upload-input')?.click()}
                        disabled={uploading}
                        size="sm"
                        className="w-full sm:w-auto"
                    >
                        {uploading ? (
                            <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                        ) : (
                            <Upload className="h-3.5 w-3.5 mr-2" />
                        )}
                        Upload
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="min-h-[300px]">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : assets.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                        <Upload className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>No files found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {assets.map((asset) => (
                            <Card
                                key={asset.id}
                                className={`overflow-hidden group cursor-pointer transition-all hover:ring-2 hover:ring-primary ${onSelect ? 'hover:scale-[1.02]' : ''
                                    }`}
                                onClick={() => onSelect?.(asset.cdn_url || asset.file_path)}
                            >
                                <div className="aspect-square bg-muted relative">
                                    {asset.file_type === 'image' ? (
                                        <img
                                            src={asset.cdn_url || asset.file_path}
                                            alt={asset.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            {getFileIcon(asset.file_type)}
                                        </div>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        {onSelect ? (
                                            <Button variant="secondary" size="sm" className="pointer-events-none">
                                                Select
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(asset.id);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <CardContent className="p-2">
                                    <p className="text-xs font-medium truncate" title={asset.name}>
                                        {asset.name}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">
                                        {asset.size_bytes ? formatBytes(asset.size_bytes) : 'N/A'}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

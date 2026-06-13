import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface IframePreviewProps {
    url: string;
    className?: string;
}

export const IframePreview: React.FC<IframePreviewProps> = ({ url, className }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loading, setLoading] = useState(true);
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    useEffect(() => {
        setLoading(true);
    }, [url]);

    const handleLoad = () => {
        setLoading(false);
        // TODO: Send handshake postMessage here
    };

    const getWidth = () => {
        switch (device) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-muted/50">
            {/* Toolbar */}
            <div className="h-12 border-b bg-card flex items-center justify-center gap-2 px-4 shrink-0">
                <ToggleGroup type="single" value={device} onValueChange={(v) => v && setDevice(v as any)} className="bg-muted p-1 rounded-md">
                    <ToggleGroupItem value="desktop" size="sm" aria-label="Desktop">
                        <Monitor className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="tablet" size="sm" aria-label="Tablet">
                        <Tablet className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="mobile" size="sm" aria-label="Mobile">
                        <Smartphone className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            {/* Viewport */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                <div
                    className={cn(
                        "bg-background shadow-2xl transition-all duration-300 overflow-hidden relative border",
                        device !== 'desktop' && "rounded-[30px] border-8 border-gray-900"
                    )}
                    style={{
                        width: getWidth(),
                        height: device === 'desktop' ? '100%' : 'calc(100% - 40px)',
                        maxHeight: device === 'desktop' ? '100%' : '850px'
                    }}
                >
                    <iframe
                        ref={iframeRef}
                        src={url}
                        className="w-full h-full border-0 bg-white"
                        onLoad={handleLoad}
                        title="Page Preview"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                </div>
            </div>
        </div>
    );
};

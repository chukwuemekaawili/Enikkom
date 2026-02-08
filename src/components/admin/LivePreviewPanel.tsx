import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2, RefreshCw, ExternalLink, Monitor, Smartphone, Tablet, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';

interface LivePreviewPanelProps {
  pageRoute: string;
  pageName: string;
  isVisible: boolean;
  onToggle: () => void;
  draftContent?: Record<string, any>;
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const viewportSizes: Record<ViewportSize, { width: string; icon: React.ComponentType<any> }> = {
  desktop: { width: '100%', icon: Monitor },
  tablet: { width: '768px', icon: Tablet },
  mobile: { width: '375px', icon: Smartphone },
};

export function LivePreviewPanel({ pageRoute, pageName, isVisible, onToggle, draftContent }: LivePreviewPanelProps) {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDraftOverlay, setShowDraftOverlay] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { pendingChanges, hasChanges } = useEditMode();

  // Get the preview URL
  const previewUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${pageRoute}` 
    : pageRoute;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Send draft content updates to iframe via postMessage
  useEffect(() => {
    if (iframeRef.current && hasChanges && draftContent) {
      const message = {
        type: 'DRAFT_CONTENT_UPDATE',
        payload: {
          changes: Object.fromEntries(pendingChanges),
          draftContent
        }
      };
      iframeRef.current.contentWindow?.postMessage(message, '*');
    }
  }, [pendingChanges, draftContent, hasChanges]);

  if (!isVisible) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <Monitor className="h-4 w-4 mr-2" />
        Show Preview
      </Button>
    );
  }

  return (
    <Card className={cn(
      "fixed right-4 bottom-4 z-50 shadow-2xl transition-all duration-300",
      isExpanded ? "w-[80vw] h-[85vh]" : "w-[500px] h-[650px]"
    )}>
      <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              Live Preview
              {hasChanges && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  {pendingChanges.size} unsaved
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-xs">{pageName}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Draft overlay toggle */}
          <Button 
            variant={showDraftOverlay ? "default" : "ghost"} 
            size="sm" 
            className="h-7 px-2 text-xs gap-1"
            onClick={() => setShowDraftOverlay(!showDraftOverlay)}
            title={showDraftOverlay ? "Showing draft changes" : "Showing saved version"}
          >
            {showDraftOverlay ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {showDraftOverlay ? "Draft" : "Saved"}
          </Button>
          
          {/* Viewport toggles */}
          <div className="flex border rounded-md ml-2">
            {(Object.entries(viewportSizes) as [ViewportSize, typeof viewportSizes.desktop][]).map(([key, { icon: Icon }]) => (
              <Button
                key={key}
                variant={viewport === key ? "default" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setViewport(key)}
              >
                <Icon className="h-3 w-3" />
              </Button>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleRefresh}>
            <RefreshCw className="h-3 w-3" />
          </Button>
          
          <a href={previewUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={onToggle}>
            Hide
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 h-[calc(100%-60px)] bg-muted/30 overflow-hidden relative">
        {/* Draft indicator overlay */}
        {hasChanges && showDraftOverlay && (
          <div className="absolute top-2 left-2 right-2 z-10 flex justify-center pointer-events-none">
            <div className="bg-amber-500/90 text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-lg">
              Previewing {pendingChanges.size} unsaved change{pendingChanges.size > 1 ? 's' : ''}
            </div>
          </div>
        )}
        
        <div 
          className="h-full mx-auto bg-white rounded-lg shadow-inner overflow-hidden transition-all"
          style={{ width: viewportSizes[viewport].width, maxWidth: '100%' }}
        >
          <iframe
            ref={iframeRef}
            key={refreshKey}
            src={previewUrl}
            className="w-full h-full border-0"
            title={`Preview: ${pageName}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
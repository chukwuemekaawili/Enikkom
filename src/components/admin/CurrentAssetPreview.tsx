import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ExternalLink, RotateCcw, Upload, Video, Image as ImageIcon, Loader2 } from 'lucide-react';

interface CurrentAssetPreviewProps {
  type: 'image' | 'video';
  currentUrl: string | null;
  defaultUrl?: string;
  defaultDescription?: string;
  pageRoute?: string;
  isUploading?: boolean;
  onUpload?: (file: File) => void;
  onUrlChange?: (url: string) => void;
  onReset?: () => void;
}

export function CurrentAssetPreview({
  type,
  currentUrl,
  defaultUrl,
  defaultDescription,
  pageRoute,
  isUploading,
  onUpload,
  onUrlChange,
  onReset,
}: CurrentAssetPreviewProps) {
  const isUsingDefault = !currentUrl && defaultUrl;
  const displayUrl = currentUrl || defaultUrl;

  return (
    <Card className={isUsingDefault ? 'border-blue-200 bg-blue-50/50' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'video' ? (
              <Video className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            )}
            <CardTitle className="text-sm">
              {type === 'video' ? 'Background Video' : 'Background Image'}
            </CardTitle>
            {isUsingDefault && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Default
              </Badge>
            )}
            {currentUrl && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Custom
              </Badge>
            )}
          </div>
          {currentUrl && defaultUrl && onReset && (
            <Button size="sm" variant="outline" onClick={onReset}>
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
        {defaultDescription && (
          <CardDescription className="text-xs">
            {defaultDescription}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Preview */}
        {displayUrl && (
          <div className="relative">
            {type === 'video' ? (
              <video
                src={displayUrl}
                className="w-full h-32 object-cover rounded-lg bg-muted"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={displayUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg bg-muted"
              />
            )}
            {isUsingDefault && (
              <span className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                Current Default
              </span>
            )}
          </div>
        )}

        {/* Page link */}
        {pageRoute && (
          <Link
            to={pageRoute}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            View on {pageRoute} <ExternalLink className="h-3 w-3" />
          </Link>
        )}

        {/* Upload */}
        {onUpload && (
          <div className="space-y-2 pt-2 border-t">
            <Label className="text-xs">Replace with custom {type}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept={type === 'video' ? 'video/*' : 'image/*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpload(file);
                }}
                disabled={isUploading}
                className="cursor-pointer flex-1 h-9 text-xs"
              />
              {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          </div>
        )}

        {/* URL Input */}
        {onUrlChange && (
          <Input
            value={currentUrl || ''}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder={`Or paste ${type} URL...`}
            className="h-9 text-xs"
          />
        )}
      </CardContent>
    </Card>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getAssetUrl } from '@/lib/assetMap';
import { 
  Loader2, Upload, Trash2, Video, Copy, Check, Search, 
  FolderOpen, Download, Edit, MapPin, Info, Eye, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Map usage location keywords to actual page routes
const usageLocationRoutes: Record<string, string> = {
  'homepage': '/',
  'home page': '/',
  'home': '/',
  'hero slider': '/',
  'homepage hero': '/',
  'about page': '/about',
  'about': '/about',
  'services page': '/services',
  'services': '/services',
  'contact page': '/contact',
  'contact': '/contact',
  'careers page': '/careers',
  'careers': '/careers',
  'projects page': '/projects',
  'projects': '/projects',
  'gallery': '/gallery',
  'equipment page': '/equipment',
  'equipment': '/equipment',
  'hdd page': '/capabilities/hdd',
  'hdd equipment': '/equipment/hdd',
  'hdd capability': '/capabilities/hdd',
  'capabilities page': '/capabilities',
  'capabilities': '/capabilities',
  'dredging page': '/capabilities/dredging',
  'dredging': '/capabilities/dredging',
  'pipeline page': '/capabilities/pipeline',
  'pipeline': '/capabilities/pipeline',
  'jetty page': '/capabilities/jetty',
  'jetty': '/capabilities/jetty',
  'marine works': '/capabilities/marine',
  'hse page': '/hse-quality',
  'hse': '/hse-quality',
  'quality': '/hse-quality',
  'partners page': '/partners',
  'partners': '/partners',
  'management page': '/about/management',
  'management': '/about/management',
  'team page': '/about/management',
  'team': '/about/management',
  'resources': '/resources',
  'downloads': '/resources',
  'footer': '/',
  'header': '/',
};

// Parse usage location text and extract page links
const parseUsageLocations = (usageLocation: string): { text: string; route: string }[] => {
  if (!usageLocation) return [];
  
  const locations = usageLocation.split(',').map(s => s.trim());
  const results: { text: string; route: string }[] = [];
  
  for (const location of locations) {
    const lowerLocation = location.toLowerCase();
    let matchedRoute = '';
    
    // Find the best matching route
    for (const [keyword, route] of Object.entries(usageLocationRoutes)) {
      if (lowerLocation.includes(keyword)) {
        matchedRoute = route;
        break;
      }
    }
    
    results.push({
      text: location,
      route: matchedRoute || '/',
    });
  }
  
  return results;
};
import { toast } from 'sonner';

interface MediaAsset {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  category: string | null;
  description: string | null;
  usage_location: string | null;
  is_system_asset: boolean | null;
  created_at: string;
}

const categories = ['all', 'branding', 'hero', 'capabilities', 'projects', 'team', 'equipment'];

const MediaManager: React.FC = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [editForm, setEditForm] = useState({
    alt_text: '',
    description: '',
    usage_location: '',
  });

  const fetchAssets = useCallback(async () => {
    try {
      let query = supabase
        .from('media_assets')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,usage_location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setAssets((data as MediaAsset[]) || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast.error('Failed to load media assets');
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const getAssetImageUrl = (asset: MediaAsset) => {
    // For system assets, construct the proper import path
    if (asset.is_system_asset && asset.file_path.startsWith('/src/assets/')) {
      // These are bundled assets - we need to use a dynamic approach
      return asset.file_path;
    }
    // For uploaded assets (from Supabase storage)
    return asset.file_path;
  };

  const handleUpload = async (files: FileList | null, category: string) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${category}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('admin_uploads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('admin_uploads')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase.from('media_assets').insert({
          name: file.name,
          file_path: publicUrl,
          file_type: file.type.startsWith('video/') ? 'video' : 'image',
          mime_type: file.type,
          size_bytes: file.size,
          category,
          uploaded_by: user?.id,
          is_system_asset: false,
          description: 'Newly uploaded asset. Update description and usage location.',
          usage_location: 'Not yet assigned to any page',
        });

        if (dbError) throw dbError;
      }

      toast.success(`${files.length} file(s) uploaded successfully`);
      fetchAssets();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReplace = async (asset: MediaAsset, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${asset.category || 'general'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      // If replacing a non-system asset, delete old file from storage
      if (!asset.is_system_asset && asset.file_path.includes('admin_uploads')) {
        const urlParts = asset.file_path.split('/admin_uploads/');
        if (urlParts.length > 1) {
          await supabase.storage.from('admin_uploads').remove([urlParts[1]]);
        }
      }

      const { error: updateError } = await supabase
        .from('media_assets')
        .update({
          file_path: publicUrl,
          name: file.name,
          mime_type: file.type,
          size_bytes: file.size,
          is_system_asset: false,
        })
        .eq('id', asset.id);

      if (updateError) throw updateError;

      toast.success('Asset replaced successfully');
      fetchAssets();
    } catch (error) {
      console.error('Replace error:', error);
      toast.error('Failed to replace asset');
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (asset.is_system_asset) {
      toast.error('System assets cannot be deleted. You can replace them instead.');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${asset.name}"?`)) return;

    try {
      if (asset.file_path.includes('admin_uploads')) {
        const urlParts = asset.file_path.split('/admin_uploads/');
        if (urlParts.length > 1) {
          await supabase.storage.from('admin_uploads').remove([urlParts[1]]);
        }
      }

      const { error } = await supabase.from('media_assets').delete().eq('id', asset.id);
      if (error) throw error;

      toast.success('Asset deleted successfully');
      fetchAssets();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete asset');
    }
  };

  const handleEditSave = async () => {
    if (!editingAsset) return;

    try {
      const { error } = await supabase
        .from('media_assets')
        .update({
          alt_text: editForm.alt_text,
          description: editForm.description,
          usage_location: editForm.usage_location,
        })
        .eq('id', editingAsset.id);

      if (error) throw error;

      toast.success('Asset details updated');
      setEditingAsset(null);
      fetchAssets();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update asset');
    }
  };

  const openEditDialog = (asset: MediaAsset) => {
    setEditingAsset(asset);
    setEditForm({
      alt_text: asset.alt_text || '',
      description: asset.description || '',
      usage_location: asset.usage_location || '',
    });
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadAsset = async (asset: MediaAsset) => {
    try {
      const response = await fetch(asset.file_path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = asset.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open(asset.file_path, '_blank');
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getCategoryColor = (category: string | null) => {
    const colors: Record<string, string> = {
      branding: 'bg-purple-100 text-purple-800',
      hero: 'bg-blue-100 text-blue-800',
      capabilities: 'bg-green-100 text-green-800',
      projects: 'bg-orange-100 text-orange-800',
      team: 'bg-pink-100 text-pink-800',
      equipment: 'bg-yellow-100 text-yellow-800',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-800';
  };

  // Group assets by category for better organization
  const groupedAssets = assets.reduce((acc, asset) => {
    const cat = asset.category || 'uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(asset);
    return acc;
  }, {} as Record<string, MediaAsset[]>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground mt-1">
            View, edit, and manage all website images and videos
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  id="upload-category"
                  className="w-full p-2 border rounded-md"
                  defaultValue="projects"
                >
                  {categories.filter((c) => c !== 'all').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Select Files</Label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => {
                    const category = (document.getElementById('upload-category') as HTMLSelectElement)?.value || 'projects';
                    handleUpload(e.target.files, category);
                  }}
                  disabled={isUploading}
                  className="cursor-pointer"
                />
              </div>
              {isUploading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Uploading...</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, description, or usage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{assets.length}</div>
          <div className="text-sm text-muted-foreground">Total Assets</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{assets.filter(a => a.file_type === 'image').length}</div>
          <div className="text-sm text-muted-foreground">Images</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{assets.filter(a => a.file_type === 'video').length}</div>
          <div className="text-sm text-muted-foreground">Videos</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{assets.filter(a => a.is_system_asset).length}</div>
          <div className="text-sm text-muted-foreground">System Assets</div>
        </Card>
      </div>

      {/* Assets Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : assets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No media assets found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter
            </p>
          </CardContent>
        </Card>
      ) : activeCategory === 'all' ? (
        // Grouped view by category
        Object.entries(groupedAssets).map(([category, categoryAssets]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold capitalize flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                ({categoryAssets.length} assets)
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                  onEdit={openEditDialog}
                  onDelete={handleDelete}
                  onDownload={downloadAsset}
                  onReplace={handleReplace}
                  onPreview={setPreviewAsset}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Flat view for specific category
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              copiedId={copiedId}
              onCopy={copyToClipboard}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              onDownload={downloadAsset}
              onReplace={handleReplace}
              onPreview={setPreviewAsset}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingAsset} onOpenChange={(open) => !open && setEditingAsset(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Asset Details</DialogTitle>
          </DialogHeader>
          {editingAsset && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {editingAsset.file_type === 'video' ? (
                  <video src={getAssetUrl(editingAsset.file_path)} className="w-full h-full object-cover" controls />
                ) : (
                  <img
                    src={getAssetUrl(editingAsset.file_path)}
                    alt={editingAsset.alt_text || editingAsset.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>File:</strong> {editingAsset.name}
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt_text">Alt Text (for accessibility & SEO)</Label>
                <Input
                  id="alt_text"
                  value={editForm.alt_text}
                  onChange={(e) => setEditForm({ ...editForm, alt_text: e.target.value })}
                  placeholder="Describe the image for screen readers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (what this image is about)</Label>
                <Textarea
                  id="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Explain what this image shows and what it should be used for"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usage_location">Usage Location (where is this used)</Label>
                <Input
                  id="usage_location"
                  value={editForm.usage_location}
                  onChange={(e) => setEditForm({ ...editForm, usage_location: e.target.value })}
                  placeholder="e.g., Homepage Hero, About Page, Contact Section"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAsset(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewAsset} onOpenChange={(open) => !open && setPreviewAsset(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewAsset?.name}</DialogTitle>
          </DialogHeader>
          {previewAsset && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg overflow-hidden max-h-[60vh]">
                {previewAsset.file_type === 'video' ? (
                  <video src={getAssetUrl(previewAsset.file_path)} className="w-full h-full object-contain" controls autoPlay />
                ) : (
                  <img
                    src={getAssetUrl(previewAsset.file_path)}
                    alt={previewAsset.alt_text || previewAsset.name}
                    className="w-full h-full object-contain max-h-[60vh]"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Category:</strong> <span className="capitalize">{previewAsset.category}</span>
                </div>
                <div>
                  <strong>Size:</strong> {formatFileSize(previewAsset.size_bytes)}
                </div>
                <div className="col-span-2">
                  <strong>Alt Text:</strong> {previewAsset.alt_text || 'Not set'}
                </div>
                <div className="col-span-2">
                  <strong>Description:</strong> {previewAsset.description || 'Not set'}
                </div>
                <div className="col-span-2">
                  <strong className="block mb-2">Shown on these pages:</strong>
                  {previewAsset.usage_location ? (
                    <div className="flex flex-wrap gap-2">
                      {parseUsageLocations(previewAsset.usage_location).map((location, idx) => (
                        <Link
                          key={idx}
                          to={location.route}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors"
                        >
                          {location.text}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Not specified</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Separate AssetCard component for cleaner code
interface AssetCardProps {
  asset: MediaAsset;
  copiedId: string | null;
  onCopy: (url: string, id: string) => void;
  onEdit: (asset: MediaAsset) => void;
  onDelete: (asset: MediaAsset) => void;
  onDownload: (asset: MediaAsset) => void;
  onReplace: (asset: MediaAsset, file: File) => void;
  onPreview: (asset: MediaAsset) => void;
  getCategoryColor: (category: string | null) => string;
}

const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  copiedId,
  onCopy,
  onEdit,
  onDelete,
  onDownload,
  onReplace,
  onPreview,
  getCategoryColor,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const displayUrl = getAssetUrl(asset.file_path);

  return (
    <Card className="overflow-hidden group">
      <div 
        className="relative aspect-video bg-muted cursor-pointer"
        onClick={() => onPreview(asset)}
      >
        {asset.file_type === 'video' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-blue-900/40">
            <video 
              src={displayUrl} 
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <span className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
              VIDEO
            </span>
          </div>
        ) : (
          <img
            src={displayUrl}
            alt={asset.alt_text || asset.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Handle broken images
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        )}
        
        {/* System asset badge */}
        {asset.is_system_asset && (
          <span className="absolute top-2 left-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
            SYSTEM
          </span>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); onPreview(asset); }}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); onEdit(asset); }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); onCopy(asset.file_path, asset.id); }}>
            {copiedId === asset.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); onDownload(asset); }}>
            <Download className="h-4 w-4" />
          </Button>
          {!asset.is_system_asset && (
            <Button size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete(asset); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        <p className="text-sm font-medium truncate" title={asset.name}>
          {asset.name}
        </p>
        
        {/* Description */}
        {asset.description && (
          <p className="text-xs text-muted-foreground line-clamp-2" title={asset.description}>
            <Info className="h-3 w-3 inline mr-1" />
            {asset.description}
          </p>
        )}

        {/* Usage location with clickable page links */}
        {asset.usage_location && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Used on:</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {parseUsageLocations(asset.usage_location).map((location, idx) => (
                <Link
                  key={idx}
                  to={location.route}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {location.text}
                  <ExternalLink className="h-2.5 w-2.5" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Replace button */}
        <div className="pt-2 border-t">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onReplace(asset, file);
            }}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3 w-3 mr-2" />
            Replace Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaManager;

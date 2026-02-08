import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Pencil, Trash2, Upload, Eye, EyeOff, GripVertical, Info, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Import default gallery images from codebase
import galHddRig from "@/assets/projects/hdd-rig-operation.png";
import galPipeline from "@/assets/projects/pipe-welding.png";
import galDredging from "@/assets/projects/dredging-marine.png";
import galJetty from "@/assets/projects/330b-excavator.jpg";
import galShore from "@/assets/projects/drilling-site.png";
import galWelding from "@/assets/projects/welding-crew.jpg";
import galEquipment from "@/assets/projects/hdd-equipment-fleet-4.jpg";
import galExcavator from "@/assets/projects/cat-excavator.jpg";
import galScope from "@/assets/projects/scope-operations.jpg";
import galDrillString from "@/assets/projects/hdd-drill-string.jpg";
import galFleet from "@/assets/projects/equipment-fleet.jpg";
import galRiver from "@/assets/projects/swamp-pipeline.png";
import galAtlas from "@/assets/projects/pipeline-laying.png";
import galLekki from "@/assets/projects/rig-setup.png";
import galNipco from "@/assets/projects/nipco-pipeline.jpg";
import galCrane from "@/assets/projects/pipe-handling.jpg";
import galSafety from "@/assets/projects/workers-ppe.jpg";
import galTeam from "@/assets/projects/hse-safety.jpg";
import galTripping from "@/assets/projects/tripping-safety.jpg";

// Default gallery items from codebase
const defaultGalleryItems = [
  { image: galHddRig, title: "500T Maxi HDD Rig Operation", category: "HDD", description: "500-ton maxi HDD rig performing directional drilling for major Niger Delta river crossing." },
  { image: galPipeline, title: "36\" Pipeline Welding", category: "Pipelines", description: "API 1104 certified welders performing pipeline tie-in operations." },
  { image: galDredging, title: "Marine Dredging Operations", category: "Marine Civil", description: "Dredging operations for channel deepening and reclamation." },
  { image: galJetty, title: "330B Excavator Operations", category: "Equipment", description: "CAT 330B excavator supporting pipeline construction." },
  { image: galShore, title: "Drilling Site Setup", category: "HDD", description: "Comprehensive HDD site setup with all support equipment." },
  { image: galWelding, title: "Pipeline Welding Crew", category: "Pipelines", description: "Expert welding team performing pipeline fabrication." },
  { image: galEquipment, title: "HDD Equipment Spread", category: "Equipment", description: "Complete HDD equipment spread including maxi rig and support equipment." },
  { image: galExcavator, title: "Excavation Operations", category: "Equipment", description: "CAT excavator performing ROW preparation." },
  { image: galScope, title: "Scope Rig Operations", category: "HDD", description: "Real-time trajectory monitoring during drilling operations." },
  { image: galDrillString, title: "Drill String Assembly", category: "HDD", description: "Drill string assembly and preparation for deep crossing." },
  { image: galFleet, title: "Equipment Fleet Overview", category: "Equipment", description: "Part of Enikkom's extensive fleet of 10+ maxi HDD rigs." },
  { image: galRiver, title: "Swamp Pipeline Installation", category: "Pipelines", description: "Pipeline installation in challenging swamp terrain." },
  { image: galAtlas, title: "Pipeline Laying Operations", category: "Pipelines", description: "Large diameter pipeline laying with specialized equipment." },
  { image: galLekki, title: "Rig Setup Process", category: "HDD", description: "HDD rig setup and alignment for major crossing." },
  { image: galNipco, title: "NIPCO Gas Network", category: "Pipelines", description: "Urban gas distribution network construction." },
  { image: galCrane, title: "Pipe Handling Operations", category: "Marine Civil", description: "Specialized pipe handling for offshore installation." },
  { image: galSafety, title: "PPE & Safety Compliance", category: "HSE", description: "Workers in full PPE maintaining safety standards." },
  { image: galTeam, title: "HSE Safety Briefing", category: "HSE", description: "Daily safety briefing maintaining zero LTI record." },
  { image: galTripping, title: "Tripping Operations Safety", category: "HSE", description: "Safe tripping operations during drill string handling." },
];

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

const categories = ['HDD', 'Pipelines', 'Marine Civil', 'Equipment', 'HSE', 'Shore Approach', 'Other'];

const emptyItem: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  category: 'Other',
  description: '',
  image_url: '',
  display_order: 0,
  is_visible: true,
};

const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>>(emptyItem);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Failed to load gallery items');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    setUploadingPhoto(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `gallery-${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleOpenDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description || '',
        image_url: item.image_url,
        display_order: item.display_order,
        is_visible: item.is_visible,
      });
    } else {
      setEditingItem(null);
      setFormData({ ...emptyItem, display_order: items.length });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) {
      toast.error('Title and image are required');
      return;
    }

    setIsSaving(true);
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery_items')
          .update({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image_url: formData.image_url,
            display_order: formData.display_order,
            is_visible: formData.is_visible,
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Gallery item updated');
      } else {
        const { error } = await supabase
          .from('gallery_items')
          .insert([{
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image_url: formData.image_url,
            display_order: formData.display_order,
            is_visible: formData.is_visible,
          }]);

        if (error) throw error;
        toast.success('Gallery item added');
      }

      setIsDialogOpen(false);
      fetchItems();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save gallery item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Gallery item deleted');
      fetchItems();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete gallery item');
    }
  };

  const toggleVisibility = async (item: GalleryItem) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({ is_visible: !item.is_visible })
        .eq('id', item.id);

      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update visibility');
    }
  };

  const importDefaultItem = async (defaultItem: typeof defaultGalleryItems[0], index: number) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .insert([{
          title: defaultItem.title,
          category: defaultItem.category,
          description: defaultItem.description,
          image_url: defaultItem.image,
          display_order: items.length + index,
          is_visible: true,
        }]);

      if (error) throw error;
      toast.success(`Imported "${defaultItem.title}"`);
      fetchItems();
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import item');
    }
  };

  const importAllDefaults = async () => {
    if (!confirm(`Import all ${defaultGalleryItems.length} default gallery items?`)) return;
    
    try {
      const itemsToInsert = defaultGalleryItems.map((item, index) => ({
        title: item.title,
        category: item.category,
        description: item.description,
        image_url: item.image,
        display_order: items.length + index,
        is_visible: true,
      }));

      const { error } = await supabase
        .from('gallery_items')
        .insert(itemsToInsert);

      if (error) throw error;
      toast.success(`Imported ${defaultGalleryItems.length} items`);
      fetchItems();
    } catch (error) {
      console.error('Import all error:', error);
      toast.error('Failed to import items');
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gallery Manager</h1>
          <p className="text-muted-foreground mt-1">
            Manage gallery images displayed on the Gallery page
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/gallery" target="_blank">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Gallery
            </Button>
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Gallery Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="500T Maxi HDD Rig Operation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Image *</Label>
                  <div className="space-y-3">
                    {formData.image_url && (
                      <div className="relative">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="w-full h-40 rounded-lg object-cover bg-muted"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          Preview
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePhotoUpload(file);
                        }}
                        disabled={uploadingPhoto}
                        className="cursor-pointer flex-1"
                      />
                      {uploadingPhoto && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                      placeholder="Or paste image URL..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the image..."
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="visible"
                      checked={formData.is_visible}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_visible: checked }))}
                    />
                    <Label htmlFor="visible">Visible on website</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingItem ? 'Update' : 'Add'} Item
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Default Gallery Items from Codebase */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-base text-blue-800">Current Gallery in Codebase ({defaultGalleryItems.length} items)</CardTitle>
                <CardDescription className="text-blue-700">
                  These images are currently hardcoded. Import them to manage dynamically.
                </CardDescription>
              </div>
            </div>
            <Button size="sm" onClick={importAllDefaults} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Import All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {defaultGalleryItems.slice(0, 10).map((item, idx) => (
              <div key={idx} className="group relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-lg bg-muted border-2 border-blue-200"
                />
                <button
                  onClick={() => importDefaultItem(item, idx)}
                  className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
            {defaultGalleryItems.length > 10 && (
              <div className="aspect-square rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                +{defaultGalleryItems.length - 10} more
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filter and Stats */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            All ({items.length})
          </Button>
          {categories.map((cat) => {
            const count = items.filter(i => i.category === cat).length;
            if (count === 0) return null;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Gallery Items Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Database Gallery Items ({filteredItems.length})</CardTitle>
          <CardDescription>
            {items.length === 0 
              ? "No gallery items in database. Import from codebase or add new items."
              : "Click to edit, toggle visibility, or delete items"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No gallery items found.</p>
              <Button variant="outline" className="mt-4" onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`group relative rounded-lg overflow-hidden border ${!item.is_visible ? 'opacity-50' : ''}`}
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <Badge variant="secondary" className="text-[10px] mb-1">
                        {item.category}
                      </Badge>
                      <p className="text-white text-xs font-medium truncate">{item.title}</p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-7 w-7"
                        onClick={() => toggleVisibility(item)}
                      >
                        {item.is_visible ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-7 w-7"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-7 w-7"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Visibility badge */}
                  {!item.is_visible && (
                    <Badge variant="secondary" className="absolute top-2 left-2 text-[10px]">
                      Hidden
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManager;

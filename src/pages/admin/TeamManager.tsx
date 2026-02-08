import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Pencil, Trash2, Upload, Eye, EyeOff, GripVertical, Info, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Import default team photos from codebase
import photoEdwardAmene from "@/assets/team/edward-amene.png";
import photoSaleemKhan from "@/assets/team/saleem-khan.png";
import photoFrancisAnatogu from "@/assets/team/francis-anatogu.png";
import photoAdekunleAdewole from "@/assets/team/adekunle-adewole.png";
import photoChibuikeNwachukwu from "@/assets/team/chibuike-nwachukwu.png";
import photoTeddyAllen from "@/assets/team/teddy-allen.png";
import photoIdigborEmeka from "@/assets/team/idigbor-emeka.png";
import photoBiodunAdefila from "@/assets/team/biodun-adefila.jpg";
import photoKenJames from "@/assets/team/ken-james.png";

// Default team members from the codebase
const defaultTeamMembers = [
  { name: "Engr. Edward Amene", title: "Chief Executive Officer / Managing Director", photo: photoEdwardAmene, category: "management" },
  { name: "Engr. Saleem Ahmad Khan", title: "Chief Technical Officer", photo: photoSaleemKhan, category: "management" },
  { name: "Mr. Francis Anatogu", title: "Chief Growth & Transformation Officer", photo: photoFrancisAnatogu, category: "management" },
  { name: "Adekunle Adewole, PhD", title: "Chief Operations & Strategy Officer", photo: photoAdekunleAdewole, category: "management" },
  { name: "Mr. Chibuike Nwachukwu", title: "Executive Director", photo: photoChibuikeNwachukwu, category: "management" },
  { name: "Teddy Allen", title: "General Manager, Drilling", photo: photoTeddyAllen, category: "management" },
  { name: "Idigbor Emeka, FCA", title: "Chief Accountant", photo: photoIdigborEmeka, category: "management" },
  { name: "Biodun Adefila", title: "Chairman, Board of Directors", photo: photoBiodunAdefila, category: "board" },
  { name: "Ken James", title: "Non-Executive Director", photo: photoKenJames, category: "board" },
];

interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string | null;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_visible: boolean;
  category: string;
  qualifications: string | null;
  highlights: string | null;
}

const emptyMember: Omit<TeamMember, 'id'> = {
  name: '',
  title: '',
  department: '',
  bio: '',
  photo_url: '',
  email: '',
  linkedin_url: '',
  display_order: 0,
  is_visible: true,
  category: 'management',
  qualifications: '',
  highlights: '',
};

const categories = [
  { value: 'board', label: 'Board of Directors' },
  { value: 'management', label: 'Management Team' },
  { value: 'operations', label: 'Operations' },
  { value: 'technical', label: 'Technical' },
];

const TeamManager: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>(emptyMember);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    setUploadingPhoto(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `team-${Date.now()}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, photo_url: publicUrl }));
      toast.success('Photo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        title: member.title,
        department: member.department || '',
        bio: member.bio || '',
        photo_url: member.photo_url || '',
        email: member.email || '',
        linkedin_url: member.linkedin_url || '',
        display_order: member.display_order,
        is_visible: member.is_visible,
        category: member.category,
        qualifications: member.qualifications || '',
        highlights: member.highlights || '',
      });
    } else {
      setEditingMember(null);
      setFormData({ ...emptyMember, display_order: members.length });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.title) {
      toast.error('Name and title are required');
      return;
    }

    setIsSaving(true);
    try {
      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update(formData)
          .eq('id', editingMember.id);

        if (error) throw error;
        toast.success('Team member updated');
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([formData]);

        if (error) throw error;
        toast.success('Team member added');
      }

      setIsDialogOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save team member');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Team member deleted');
      fetchMembers();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete team member');
    }
  };

  const toggleVisibility = async (member: TeamMember) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update({ is_visible: !member.is_visible })
        .eq('id', member.id);

      if (error) throw error;
      fetchMembers();
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update visibility');
    }
  };

  // Open dialog with a codebase default member pre-filled
  const handleOpenDialogWithDefaults = (defaultMember: typeof defaultTeamMembers[0]) => {
    setEditingMember(null);
    setFormData({
      name: defaultMember.name,
      title: defaultMember.title,
      department: '',
      bio: '',
      photo_url: defaultMember.photo,
      email: '',
      linkedin_url: '',
      display_order: members.length,
      is_visible: true,
      category: defaultMember.category,
      qualifications: '',
      highlights: '',
    });
    setIsDialogOpen(true);
  };

  // Import all codebase team members to database
  const handleImportAll = async () => {
    if (!confirm('Import all 9 team members from codebase to the database? This will add them as new entries.')) return;
    
    setIsImporting(true);
    try {
      const toImport = defaultTeamMembers.map((member, idx) => ({
        name: member.name,
        title: member.title,
        photo_url: member.photo,
        category: member.category,
        display_order: idx,
        is_visible: true,
      }));

      const { error } = await supabase
        .from('team_members')
        .insert(toImport);

      if (error) throw error;
      toast.success(`Successfully imported ${defaultTeamMembers.length} team members`);
      fetchMembers();
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import team members');
    } finally {
      setIsImporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your leadership and team profiles
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/about/management" target="_blank">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Page
            </Button>
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Engr. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Managing Director / CEO"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                    placeholder="Operations, Engineering, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Photo</Label>
                <div className="flex items-center gap-4">
                  {formData.photo_url && (
                    <img
                      src={formData.photo_url}
                      alt="Preview"
                      className="w-20 h-20 rounded-lg object-cover bg-muted"
                    />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePhotoUpload(file);
                      }}
                      disabled={uploadingPhoto}
                      className="cursor-pointer"
                    />
                  </div>
                  {uploadingPhoto && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                <Input
                  value={formData.photo_url || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, photo_url: e.target.value }))}
                  placeholder="Or paste image URL"
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief biography..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Textarea
                  id="qualifications"
                  value={formData.qualifications || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, qualifications: e.target.value }))}
                  placeholder="Educational qualifications, certifications..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="highlights">Career Highlights</Label>
                <Textarea
                  id="highlights"
                  value={formData.highlights || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, highlights: e.target.value }))}
                  placeholder="Key achievements, notable projects..."
                  rows={2}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@enikkom.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin_url || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
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
                  {editingMember ? 'Update' : 'Add'} Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Current Default Team Members from Codebase */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-base text-blue-800">Current Team in Codebase</CardTitle>
                <CardDescription className="text-blue-700">
                  Click any team member to edit, or import all to database for dynamic management.
                </CardDescription>
              </div>
            </div>
            <Button 
              onClick={handleImportAll} 
              disabled={isImporting}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isImporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Import All to Database
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {defaultTeamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className="text-center cursor-pointer group"
                onClick={() => handleOpenDialogWithDefaults(member)}
              >
                <div className="relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full aspect-square object-cover object-top rounded-lg bg-muted border-2 border-blue-200 group-hover:border-primary group-hover:shadow-md transition-all"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Pencil className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-[10px] font-medium mt-1 truncate group-hover:text-primary" title={member.name}>
                  {member.name.split(' ').slice(-1)[0]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-3">
            <Link to="/about/management" target="_blank" className="hover:underline inline-flex items-center gap-1">
              View Management Page <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Team Members ({members.length})</CardTitle>
          <CardDescription>
            {members.length === 0 
              ? "No custom team members added yet. Add members here to manage them dynamically."
              : "Drag to reorder, toggle visibility, or edit details"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No team members added yet.</p>
              <Button variant="outline" className="mt-4" onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Team Member
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-20">Visible</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id} className={!member.is_visible ? 'opacity-50' : ''}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    </TableCell>
                    <TableCell>
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.title}</TableCell>
                    <TableCell className="capitalize">{member.category}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(member)}
                      >
                        {member.is_visible ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManager;

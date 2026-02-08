import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Save, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BrandingData {
  logoUrl: string;
  faviconUrl: string;
  companyName: string;
  tagline: string;
}

interface ContactData {
  phone: string;
  email: string;
  address: string;
  youtubeUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

const BrandingSettings: React.FC = () => {
  const { user } = useAuth();
  const [branding, setBranding] = useState<BrandingData>({
    logoUrl: '',
    faviconUrl: '',
    companyName: '',
    tagline: '',
  });
  const [contact, setContact] = useState<ContactData>({
    phone: '',
    email: '',
    address: '',
    youtubeUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data: brandingData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'branding')
          .single();

        const { data: contactData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'contact')
          .single();

        if (brandingData?.value) {
          setBranding(brandingData.value as unknown as BrandingData);
        }
        if (contactData?.value) {
          setContact(contactData.value as unknown as ContactData);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleFileUpload = async (
    file: File,
    type: 'logo' | 'favicon'
  ) => {
    if (type === 'logo') setUploadingLogo(true);
    else setUploadingFavicon(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `branding/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      if (type === 'logo') {
        setBranding((prev) => ({ ...prev, logoUrl: publicUrl }));
      } else {
        setBranding((prev) => ({ ...prev, faviconUrl: publicUrl }));
      }

      toast.success(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingFavicon(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Update branding settings
      const { error: brandingError } = await supabase
        .from('site_settings')
        .update({
          value: JSON.parse(JSON.stringify(branding)),
          updated_by: user?.id,
        })
        .eq('key', 'branding');

      if (brandingError) throw brandingError;

      // Update contact settings
      const { error: contactError } = await supabase
        .from('site_settings')
        .update({
          value: JSON.parse(JSON.stringify(contact)),
          updated_by: user?.id,
        })
        .eq('key', 'contact');

      if (contactError) throw contactError;

      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
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
          <h1 className="text-3xl font-bold">Branding Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your company branding and contact information
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Logo & Favicon */}
        <Card>
          <CardHeader>
            <CardTitle>Logo & Favicon</CardTitle>
            <CardDescription>Upload your company logo and favicon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                {branding.logoUrl && (
                  <img
                    src={branding.logoUrl}
                    alt="Logo preview"
                    className="h-16 w-auto object-contain bg-muted rounded p-2"
                  />
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'logo');
                    }}
                    disabled={uploadingLogo}
                    className="cursor-pointer"
                  />
                </div>
                {uploadingLogo && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: PNG or SVG, minimum 200x50px
              </p>
            </div>

            {/* Favicon Upload */}
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                {branding.faviconUrl && (
                  <img
                    src={branding.faviconUrl}
                    alt="Favicon preview"
                    className="h-10 w-10 object-contain bg-muted rounded p-1"
                  />
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'favicon');
                    }}
                    disabled={uploadingFavicon}
                    className="cursor-pointer"
                  />
                </div>
                {uploadingFavicon && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: PNG or ICO, 32x32px or 64x64px
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={branding.companyName}
                onChange={(e) =>
                  setBranding((prev) => ({ ...prev, companyName: e.target.value }))
                }
                placeholder="Enikkom Construction Limited"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={branding.tagline}
                onChange={(e) =>
                  setBranding((prev) => ({ ...prev, tagline: e.target.value }))
                }
                placeholder="Building Infrastructure Excellence"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Company contact details and social links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+234-803-508-2614"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="info@enikkom.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={contact.address}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, address: e.target.value }))
                  }
                  placeholder="Plot 2 Isaac John Street, Ikeja GRA, Lagos"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube Channel URL</Label>
                <Input
                  id="youtube"
                  value={contact.youtubeUrl}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, youtubeUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/@enikkom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={contact.linkedinUrl}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, linkedinUrl: e.target.value }))
                  }
                  placeholder="https://linkedin.com/company/enikkom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X URL</Label>
                <Input
                  id="twitter"
                  value={contact.twitterUrl}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, twitterUrl: e.target.value }))
                  }
                  placeholder="https://x.com/enikkom"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandingSettings;

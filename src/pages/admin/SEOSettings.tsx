import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Save, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  keywords: string;
}

interface HeroData {
  videoUrl: string;
  headline: string;
  subheadline: string;
}

const SEOSettings: React.FC = () => {
  const { user } = useAuth();
  const [seo, setSeo] = useState<SEOData>({
    metaTitle: '',
    metaDescription: '',
    ogImageUrl: '',
    keywords: '',
  });
  const [hero, setHero] = useState<HeroData>({
    videoUrl: '',
    headline: '',
    subheadline: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data: seoData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'seo')
          .single();

        const { data: heroData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'hero')
          .single();

        if (seoData?.value) {
          setSeo(seoData.value as unknown as SEOData);
        }
        if (heroData?.value) {
          setHero(heroData.value as unknown as HeroData);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleOgImageUpload = async (file: File) => {
    setUploadingOg(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `og-image-${Date.now()}.${fileExt}`;
      const filePath = `seo/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('admin_uploads')
        .getPublicUrl(filePath);

      setSeo((prev) => ({ ...prev, ogImageUrl: publicUrl }));
      toast.success('OG image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload OG image');
    } finally {
      setUploadingOg(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Update SEO settings
      const { error: seoError } = await supabase
        .from('site_settings')
        .update({
          value: JSON.parse(JSON.stringify(seo)),
          updated_by: user?.id,
        })
        .eq('key', 'seo');

      if (seoError) throw seoError;

      // Update hero settings
      const { error: heroError } = await supabase
        .from('site_settings')
        .update({
          value: JSON.parse(JSON.stringify(hero)),
          updated_by: user?.id,
        })
        .eq('key', 'hero');

      if (heroError) throw heroError;

      toast.success('SEO settings saved successfully');
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
          <h1 className="text-3xl font-bold">SEO Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage search engine optimization and hero section content
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
        {/* Meta Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Meta Tags</CardTitle>
            <CardDescription>
              These appear in search engine results and browser tabs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">
                Meta Title
                <span className="text-muted-foreground ml-2 text-xs">
                  ({seo.metaTitle.length}/60 characters)
                </span>
              </Label>
              <Input
                id="metaTitle"
                value={seo.metaTitle}
                onChange={(e) =>
                  setSeo((prev) => ({ ...prev, metaTitle: e.target.value }))
                }
                placeholder="Enikkom Construction – HDD, Pipelines, Dredging"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">
                Meta Description
                <span className="text-muted-foreground ml-2 text-xs">
                  ({seo.metaDescription.length}/160 characters)
                </span>
              </Label>
              <Textarea
                id="metaDescription"
                value={seo.metaDescription}
                onChange={(e) =>
                  setSeo((prev) => ({ ...prev, metaDescription: e.target.value }))
                }
                placeholder="Nigeria's leading contractor specializing in HDD, pipeline construction..."
                maxLength={160}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Textarea
                id="keywords"
                value={seo.keywords}
                onChange={(e) =>
                  setSeo((prev) => ({ ...prev, keywords: e.target.value }))
                }
                placeholder="HDD Nigeria, pipeline construction, dredging, marine works"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* OG Image */}
        <Card>
          <CardHeader>
            <CardTitle>Social Sharing Image</CardTitle>
            <CardDescription>
              This image appears when sharing links on social media
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>OG Image (1200x630px recommended)</Label>
              {seo.ogImageUrl && (
                <div className="relative aspect-[1200/630] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={seo.ogImageUrl}
                    alt="OG image preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleOgImageUpload(file);
                  }}
                  disabled={uploadingOg}
                  className="cursor-pointer flex-1"
                />
                {uploadingOg && <Loader2 className="h-9 w-9 animate-spin text-muted-foreground" />}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImageUrl">Or paste image URL</Label>
              <Input
                id="ogImageUrl"
                value={seo.ogImageUrl}
                onChange={(e) =>
                  setSeo((prev) => ({ ...prev, ogImageUrl: e.target.value }))
                }
                placeholder="https://example.com/og-image.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>
              Content for the main hero section on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="headline">Main Headline</Label>
                <Input
                  id="headline"
                  value={hero.headline}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, headline: e.target.value }))
                  }
                  placeholder="Nigeria's Premier Pipeline & HDD Contractor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subheadline">Subheadline</Label>
                <Input
                  id="subheadline"
                  value={hero.subheadline}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, subheadline: e.target.value }))
                  }
                  placeholder="30+ years of excellence in trenchless technology"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="videoUrl">Hero Video URL (YouTube or MP4)</Label>
                <Input
                  id="videoUrl"
                  value={hero.videoUrl}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, videoUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use the default hero video/image
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Search Engine Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg border max-w-2xl">
              <p className="text-blue-600 text-xl hover:underline cursor-pointer truncate">
                {seo.metaTitle || 'Your page title will appear here'}
              </p>
              <p className="text-green-700 text-sm truncate mt-1">
                enikkom.com
              </p>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {seo.metaDescription || 'Your meta description will appear here. Make it compelling to increase click-through rates.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOSettings;

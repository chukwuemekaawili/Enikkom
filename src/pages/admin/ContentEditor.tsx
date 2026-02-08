import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PageSection {
  id: string;
  page_slug: string;
  section_key: string;
  content: Record<string, string>;
  updated_at?: string;
  updated_by?: string | null;
}

const defaultSections = [
  { page_slug: 'home', section_key: 'kpi_stats', label: 'KPI Statistics' },
  { page_slug: 'home', section_key: 'capabilities_intro', label: 'Capabilities Introduction' },
  { page_slug: 'about', section_key: 'company_overview', label: 'Company Overview' },
  { page_slug: 'about', section_key: 'mission_vision', label: 'Mission & Vision' },
  { page_slug: 'contact', section_key: 'contact_intro', label: 'Contact Introduction' },
];

const ContentEditor: React.FC = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_slug', { ascending: true });

      if (error) throw error;

      // Merge with defaults if no data exists
      const existingSections = data || [];
      const mergedSections: PageSection[] = defaultSections.map((def) => {
        const existing = existingSections.find(
          (s) => s.page_slug === def.page_slug && s.section_key === def.section_key
        );
        if (existing) {
          return {
            id: existing.id,
            page_slug: existing.page_slug,
            section_key: existing.section_key,
            content: (existing.content && typeof existing.content === 'object' && !Array.isArray(existing.content)) 
              ? existing.content as Record<string, string>
              : {},
            updated_at: existing.updated_at,
            updated_by: existing.updated_by,
          };
        }
        return {
          id: `new-${def.page_slug}-${def.section_key}`,
          page_slug: def.page_slug,
          section_key: def.section_key,
          content: {},
        };
      });

      setSections(mergedSections);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSectionContent = (sectionId: string, field: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, [field]: value } }
          : section
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      for (const section of sections) {
        const isNew = section.id.startsWith('new-');
        
        if (isNew) {
          // Insert new section
          const { error } = await supabase.from('page_content').insert({
            page_slug: section.page_slug,
            section_key: section.section_key,
            content: section.content,
            updated_by: user?.id,
          });
          if (error) throw error;
        } else {
          // Update existing section
          const { error } = await supabase
            .from('page_content')
            .update({
              content: section.content,
              updated_by: user?.id,
            })
            .eq('id', section.id);
          if (error) throw error;
        }
      }

      toast.success('Content saved successfully');
      fetchSections(); // Refresh to get new IDs
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const pages = [...new Set(sections.map((s) => s.page_slug))];

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
          <h1 className="text-3xl font-bold">Page Content</h1>
          <p className="text-muted-foreground mt-1">
            Edit text content across different pages
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {pages.map((page) => (
            <TabsTrigger key={page} value={page} className="capitalize">
              {page}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page} value={page} className="space-y-6 mt-6">
            {sections
              .filter((s) => s.page_slug === page)
              .map((section) => {
                const sectionLabel =
                  defaultSections.find(
                    (d) => d.page_slug === section.page_slug && d.section_key === section.section_key
                  )?.label || section.section_key;

                return (
                  <Card key={section.id}>
                    <CardHeader>
                      <CardTitle>{sectionLabel}</CardTitle>
                      <CardDescription>
                        Section: {section.section_key}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {section.section_key === 'kpi_stats' && (
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Years of Experience</Label>
                            <Input
                              value={section.content.years || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'years', e.target.value)
                              }
                              placeholder="30+"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Projects Completed</Label>
                            <Input
                              value={section.content.projects || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'projects', e.target.value)
                              }
                              placeholder="200+"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Safety Hours</Label>
                            <Input
                              value={section.content.safetyHours || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'safetyHours', e.target.value)
                              }
                              placeholder="2M+"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Pipeline Kilometers</Label>
                            <Input
                              value={section.content.kilometers || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'kilometers', e.target.value)
                              }
                              placeholder="500+"
                            />
                          </div>
                        </div>
                      )}

                      {section.section_key === 'capabilities_intro' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={section.content.title || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'title', e.target.value)
                              }
                              placeholder="Our Core Capabilities"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={section.content.description || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'description', e.target.value)
                              }
                              placeholder="We specialize in..."
                              rows={4}
                            />
                          </div>
                        </div>
                      )}

                      {section.section_key === 'company_overview' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={section.content.title || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'title', e.target.value)
                              }
                              placeholder="About Enikkom Construction"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={section.content.description || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'description', e.target.value)
                              }
                              placeholder="Enikkom Construction Limited was founded in..."
                              rows={6}
                            />
                          </div>
                        </div>
                      )}

                      {section.section_key === 'mission_vision' && (
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Mission Statement</Label>
                            <Textarea
                              value={section.content.mission || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'mission', e.target.value)
                              }
                              placeholder="Our mission is to..."
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Vision Statement</Label>
                            <Textarea
                              value={section.content.vision || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'vision', e.target.value)
                              }
                              placeholder="Our vision is to..."
                              rows={4}
                            />
                          </div>
                        </div>
                      )}

                      {section.section_key === 'contact_intro' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={section.content.title || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'title', e.target.value)
                              }
                              placeholder="Get In Touch"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={section.content.description || ''}
                              onChange={(e) =>
                                updateSectionContent(section.id, 'description', e.target.value)
                              }
                              placeholder="Have a project in mind? Contact us..."
                              rows={3}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentEditor;

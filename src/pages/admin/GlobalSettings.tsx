import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

interface SiteSettings {
    site_name?: string;
    logo_url?: string;
    favicon_url?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
    social_facebook?: string;
    social_twitter?: string;
    social_linkedin?: string;
    social_instagram?: string;
    default_seo_title?: string;
    default_seo_description?: string;
    default_og_image?: string;
    menu_items?: Array<{ label: string; url: string; order: number }>;
}

const GlobalSettings: React.FC = () => {
    const [settings, setSettings] = useState<SiteSettings>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .single();

            if (error && error.code !== 'PGRST116') throw error; // Ignore "no rows" error

            if (data) {
                const parsedSettings: SiteSettings = {};
                if (data.settings && typeof data.settings === 'object') {
                    Object.assign(parsedSettings, data.settings);
                }
                setSettings(parsedSettings);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const { data: existing } = await supabase
                .from('site_settings')
                .select('id')
                .single();

            if (existing) {
                await supabase
                    .from('site_settings')
                    .update({ settings })
                    .eq('id', existing.id);
            } else {
                await supabase
                    .from('site_settings')
                    .insert({ settings });
            }

            toast.success('Settings saved');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const updateSetting = (key: keyof SiteSettings, value: any) => {
        setSettings({ ...settings, [key]: value });
    };

    const addMenuItem = () => {
        const menus = settings.menu_items || [];
        updateSetting('menu_items', [...menus, { label: '', url: '', order: menus.length }]);
    };

    const updateMenuItem = (index: number, field: string, value: any) => {
        const menus = [...(settings.menu_items || [])];
        menus[index] = { ...menus[index], [field]: value };
        updateSetting('menu_items', menus);
    };

    const removeMenuItem = (index: number) => {
        const menus = [...(settings.menu_items || [])];
        menus.splice(index, 1);
        updateSetting('menu_items', menus);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Global Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Configure site-wide settings, branding, and defaults
                    </p>
                </div>
                <Button onClick={saveSettings} disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Settings
                </Button>
            </div>

            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                    <TabsTrigger value="seo">SEO Defaults</TabsTrigger>
                    <TabsTrigger value="menu">Navigation Menu</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Site Name</Label>
                                <Input
                                    value={settings.site_name || ''}
                                    onChange={(e) => updateSetting('site_name', e.target.value)}
                                    placeholder="Enikkom Construction"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="branding" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Branding</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Logo URL</Label>
                                <Input
                                    value={settings.logo_url || ''}
                                    onChange={(e) => updateSetting('logo_url', e.target.value)}
                                    placeholder="/logo.png"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Favicon URL</Label>
                                <Input
                                    value={settings.favicon_url || ''}
                                    onChange={(e) => updateSetting('favicon_url', e.target.value)}
                                    placeholder="/favicon.ico"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={settings.contact_email || ''}
                                    onChange={(e) => updateSetting('contact_email', e.target.value)}
                                    placeholder="contact@enikkom.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input
                                    value={settings.contact_phone || ''}
                                    onChange={(e) => updateSetting('contact_phone', e.target.value)}
                                    placeholder="+234 123 456 7890"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Textarea
                                    value={settings.contact_address || ''}
                                    onChange={(e) => updateSetting('contact_address', e.target.value)}
                                    placeholder="123 Main St, City, Country"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Facebook</Label>
                                <Input
                                    value={settings.social_facebook || ''}
                                    onChange={(e) => updateSetting('social_facebook', e.target.value)}
                                    placeholder="https://facebook.com/enikkom"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Twitter</Label>
                                <Input
                                    value={settings.social_twitter || ''}
                                    onChange={(e) => updateSetting('social_twitter', e.target.value)}
                                    placeholder="https://twitter.com/enikkom"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>LinkedIn</Label>
                                <Input
                                    value={settings.social_linkedin || ''}
                                    onChange={(e) => updateSetting('social_linkedin', e.target.value)}
                                    placeholder="https://linkedin.com/company/enikkom"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Instagram</Label>
                                <Input
                                    value={settings.social_instagram || ''}
                                    onChange={(e) => updateSetting('social_instagram', e.target.value)}
                                    placeholder="https://instagram.com/enikkom"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Default SEO Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Default Page Title</Label>
                                <Input
                                    value={settings.default_seo_title || ''}
                                    onChange={(e) => updateSetting('default_seo_title', e.target.value)}
                                    placeholder="Enikkom Construction - Premium Construction Services"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Default Meta Description</Label>
                                <Textarea
                                    value={settings.default_seo_description || ''}
                                    onChange={(e) => updateSetting('default_seo_description', e.target.value)}
                                    placeholder="Leading construction company providing top-tier services..."
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Default OG Image URL</Label>
                                <Input
                                    value={settings.default_og_image || ''}
                                    onChange={(e) => updateSetting('default_og_image', e.target.value)}
                                    placeholder="/og-image.jpg"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="menu" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Navigation Menu</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(settings.menu_items || []).map((item, index) => (
                                <div key={index} className="flex gap-2 items-end">
                                    <div className="flex-1 space-y-2">
                                        <Label>Label</Label>
                                        <Input
                                            value={item.label}
                                            onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                                            placeholder="Home"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label>URL</Label>
                                        <Input
                                            value={item.url}
                                            onChange={(e) => updateMenuItem(index, 'url', e.target.value)}
                                            placeholder="/"
                                        />
                                    </div>
                                    <Button variant="destructive" onClick={() => removeMenuItem(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addMenuItem} className="w-full">
                                Add Menu Item
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default GlobalSettings;

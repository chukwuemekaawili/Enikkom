import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { normalizeAssetUrls } from '@/lib/assetMap';
import { usePageContent as useNewPageContent } from './usePageContent';

export interface BrandingSettings {
  logoUrl: string;
  faviconUrl: string;
  companyName: string;
  tagline: string;
}

export interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  youtubeUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  keywords: string;
}

export interface HeroSettings {
  videoUrl: string;
  headline: string;
  subheadline: string;
}

interface SiteSettings {
  branding: BrandingSettings;
  contact: ContactSettings;
  seo: SEOSettings;
  hero: HeroSettings;
  isLoading: boolean;
}

const defaultBranding: BrandingSettings = {
  logoUrl: '',
  faviconUrl: '',
  companyName: 'Enikkom Construction Limited',
  tagline: 'Building Infrastructure Excellence',
};

const defaultContact: ContactSettings = {
  phone: '+234 803 508 2614',
  email: 'info@enikkom.com',
  address: 'Plot 2 Isaac John Street, Ikeja GRA, Lagos',
  youtubeUrl: '',
  linkedinUrl: '',
  twitterUrl: '',
};

const defaultSEO: SEOSettings = {
  metaTitle: 'Enikkom Construction – HDD, Pipelines, Dredging & Marine Civils – Nigeria',
  metaDescription: "Nigeria's leading contractor specializing in HDD, pipeline construction, dredging, and marine works. 30+ years of experience.",
  ogImageUrl: '',
  keywords: 'HDD Nigeria, pipeline construction, dredging, marine works, trenchless technology',
};

const defaultHero: HeroSettings = {
  videoUrl: '',
  headline: "Nigeria's Premier Trenchless & Pipeline Contractor",
  subheadline: 'Pioneers of HDD in Nigeria since 2003',
};

export function useSiteSettings(): SiteSettings {
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [seo, setSeo] = useState<SEOSettings>(defaultSEO);
  const [hero, setHero] = useState<HeroSettings>(defaultHero);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Try to fetch new JSON settings first
        const { data: newSettings, error: newError } = await supabase
          .from('site_settings')
          .select('settings')
          .single();

        if (newSettings?.settings) {
          const s = normalizeAssetUrls(newSettings.settings as Record<string, any>) as any;
          if (s.site_name) setBranding(b => ({ ...b, companyName: s.site_name }));
          if (s.logo_url) setBranding(b => ({ ...b, logoUrl: s.logo_url }));
          if (s.favicon_url) setBranding(b => ({ ...b, faviconUrl: s.favicon_url }));

          if (s.contact_email) setContact(c => ({ ...c, email: s.contact_email }));
          if (s.contact_phone) setContact(c => ({ ...c, phone: s.contact_phone }));
          if (s.contact_address) setContact(c => ({ ...c, address: s.contact_address }));

          // Map social links
          setContact(c => ({
            ...c,
            facebookUrl: s.social_facebook,
            twitterUrl: s.social_twitter,
            linkedinUrl: s.social_linkedin,
            instagramUrl: s.social_instagram
          }));

          // Map SEO
          if (s.default_seo_title) setSeo(seo => ({ ...seo, metaTitle: s.default_seo_title }));
          if (s.default_seo_description) setSeo(seo => ({ ...seo, metaDescription: s.default_seo_description }));
        } else {
          // Fallback to old Key-Value rows if new JSON is empty
          const { data, error } = await supabase
            .from('site_settings')
            .select('key, value');

          if (data) {
            data.forEach((setting) => {
              const value = normalizeAssetUrls(setting.value as Record<string, any>);
              switch (setting.key) {
                case 'branding':
                  setBranding({ ...defaultBranding, ...value });
                  break;
                case 'contact':
                  setContact({ ...defaultContact, ...value });
                  break;
                case 'seo':
                  setSeo({ ...defaultSEO, ...value });
                  break;
                case 'hero':
                  setHero({ ...defaultHero, ...value });
                  break;
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { branding, contact, seo, hero, isLoading };
}

// ADAPTER: Wraps useNewPageContent to return Key-Value format expected by legacy pages
export function usePageContent(pageSlug: string) {
  const { content: cmsContent, isLoading } = useNewPageContent(pageSlug);

  const content = useMemo(() => {
    if (!cmsContent?.sections) return {};
    const sections: Record<string, any> = {};

    cmsContent.sections.forEach(s => {
      // Map section_key to content object
      // If content is wrapped (legacy format might vary), assume s.content is the data
      sections[s.section_key] = normalizeAssetUrls(s.content);
    });

    return sections;
  }, [cmsContent]);

  return { content, isLoading };
}

export function useTeamMembers(category?: string) {
  // TODO: Update this to use new table if schema changed, but for now kept same
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        let query = supabase
          .from('team_members') // Assuming this table still exists or was migrated? 
          // Check migration: I didn't drop it. I only created CMS tables.
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (error) throw error;
        setMembers(data || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [category]);

  return { members, isLoading };
}

export function useGalleryItems() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_items') // Assuming this table still exists
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        // console.error('Error fetching gallery items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  return { items, isLoading };
}

export function useCollection(key: string) {
  // Adapter for "Collections" (like project lists)
  // Old logic: fetched from page_content where page_slug='shared' and section_key=key
  // New logic: fetch from page named 'shared', look for section with key

  const { content, isLoading } = usePageContent('shared');

  const data = useMemo(() => {
    if (!content || !content[key]) return [];
    // Assuming the content is an array or has an items array
    const sectionData = content[key];
    if (Array.isArray(sectionData)) return sectionData;
    if (sectionData.items && Array.isArray(sectionData.items)) return sectionData.items;
    return [];
  }, [content, key]);

  return { data, isLoading };
}

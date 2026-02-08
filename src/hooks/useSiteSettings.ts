import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value');

        if (error) throw error;

        if (data) {
          data.forEach((setting) => {
            const value = setting.value as Record<string, any>;
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

export function usePageContent(pageSlug: string) {
  const [content, setContent] = useState<Record<string, Record<string, any>>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('page_content')
          .select('section_key, content')
          .eq('page_slug', pageSlug);

        if (error) throw error;

        const contentMap: Record<string, Record<string, any>> = {};
        if (data) {
          data.forEach((section) => {
            if (section.content && typeof section.content === 'object' && !Array.isArray(section.content)) {
              contentMap[section.section_key] = section.content as Record<string, any>;
            }
          });
        }
        setContent(contentMap);
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pageSlug) {
      fetchContent();
    }
  }, [pageSlug]);

  return { content, isLoading };
}

export function useTeamMembers(category?: string) {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        let query = supabase
          .from('team_members')
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
          .from('gallery_items')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, isLoading };
}

import { useMemo } from 'react';

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
  metaTitle: 'Enikkom Construction - HDD, Pipelines, Dredging & Marine Civils - Nigeria',
  metaDescription: "Nigeria's leading contractor specializing in HDD, pipeline construction, dredging, and marine works. 30+ years of experience.",
  ogImageUrl: '',
  keywords: 'HDD Nigeria, pipeline construction, dredging, marine works, trenchless technology',
};

const defaultHero: HeroSettings = {
  videoUrl: '',
  headline: "Nigeria's Premier Trenchless & Pipeline Contractor",
  subheadline: 'Pioneers of HDD in Nigeria since 2003',
};

/**
 * Static site settings. Previously these were fetched from Supabase with the
 * defaults below as a fallback; the backend is gone, so the defaults are now
 * the single source of truth. Pages consume the same shape as before.
 */
export function useSiteSettings(): SiteSettings {
  return useMemo(
    () => ({
      branding: defaultBranding,
      contact: defaultContact,
      seo: defaultSEO,
      hero: defaultHero,
      isLoading: false,
    }),
    []
  );
}

// Legacy adapters retained so existing pages compile. With no backend there is
// no dynamic content, so every page renders its own hard-coded defaults.
export function usePageContent(_pageSlug: string) {
  return { content: {} as Record<string, unknown>, isLoading: false };
}

export function useTeamMembers(_category?: string) {
  return { members: [] as unknown[], isLoading: false };
}

export function useGalleryItems() {
  return { items: [] as unknown[], isLoading: false };
}

export function useCollection(_key: string) {
  return { data: [] as unknown[], isLoading: false };
}

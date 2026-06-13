import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { normalizeAssetUrls } from '@/lib/assetMap';

interface PageSection {
    id: string;
    template_key: string;
    section_key: string;
    display_order: number;
    is_visible: boolean;
    content: Record<string, any>;
}

interface PageContent {
    slug: string;
    title: string;
    seo_title?: string;
    seo_description?: string;
    sections: PageSection[];
}

/**
 * Hook to load page content from the CMS
 * This is the ONLY hook that should be used by public frontend pages
 * 
 * @param slug - Page slug (e.g., 'home', 'about')
 * @param preview - If true, load draft content (requires admin auth)
 * @returns Page content with sections
 */
export const usePageContent = (slug: string, preview = false) => {
    const [content, setContent] = useState<PageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadContent = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Load page metadata
                const { data: page, error: pageError } = await supabase
                    .from('cms_pages')
                    .select('slug, title, seo_title, seo_description')
                    .eq('slug', slug)
                    .eq('status', preview ? undefined : 'published')  // Only published for non-preview
                    .single();

                if (pageError) throw pageError;
                if (!page) throw new Error(`Page "${slug}" not found`);

                // Load sections
                const { data: sections, error: sectionsError } = await supabase
                    .from('page_sections')
                    .select('id, template_key, section_key, display_order, is_visible, content_draft, content_published')
                    .eq('page_id', page.id)
                    .eq('is_visible', true)
                    .order('display_order', { ascending: true });

                if (sectionsError) throw sectionsError;

                // Map sections to use correct content based on preview mode
                const mappedSections: PageSection[] = (sections || []).map(section => ({
                    id: section.id,
                    template_key: section.template_key,
                    section_key: section.section_key,
                    display_order: section.display_order,
                    is_visible: section.is_visible,
                    content: normalizeAssetUrls((preview ? section.content_draft : section.content_published) || {}),
                }));

                setContent({
                    slug: page.slug,
                    title: page.title,
                    seo_title: page.seo_title,
                    seo_description: page.seo_description,
                    sections: mappedSections,
                });
            } catch (err) {
                console.error('Error loading page content:', err);
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        loadContent();
    }, [slug, preview]);

    return { content, isLoading, error };
};

/**
 * Helper function to get a specific section by key
 */
export const getSection = (sections: PageSection[], key: string) => {
    return sections.find(s => s.section_key === key);
};

/**
 * Helper function to get sections by template type
 */
export const getSectionsByTemplate = (sections: PageSection[], templateKey: string) => {
    return sections.filter(s => s.template_key === templateKey);
};

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PageSection {
    id: string;
    page_id: string;
    template_key: string;
    section_key: string;
    display_order: number;
    is_visible: boolean;
    content_draft: Record<string, any>;
    content_published: Record<string, any>;
    draft_version: number;
    published_version: number;
}

interface CMSPage {
    id: string;
    slug: string;
    title: string;
    template: string;
    status: 'draft' | 'published' | 'archived';
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string[];
    og_image_url?: string;
    sections?: PageSection[];
}

interface CMSContextType {
    currentPage: CMSPage | null;
    loading: boolean;
    loadPage: (slug: string, preview?: boolean) => Promise<void>;
    saveDraft: (sectionId: string, content: Record<string, any>) => Promise<void>;
    publishPage: (pageId: string) => Promise<void>;
    createSection: (pageId: string, templateKey: string) => Promise<void>;
    updateSectionOrder: (sectionId: string, newOrder: number) => Promise<void>;
    deleteSection: (sectionId: string) => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
    const context = useContext(CMSContext);
    if (!context) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAdmin } = useAuth();
    const [currentPage, setCurrentPage] = useState<CMSPage | null>(null);
    const [loading, setLoading] = useState(false);

    const loadPage = useCallback(async (slug: string, preview = false) => {
        setLoading(true);
        try {
            // Fetch page
            const { data: page, error: pageError } = await supabase
                .from('cms_pages')
                .select('*')
                .eq('slug', slug)
                .single();

            if (pageError) throw pageError;

            // Fetch sections
            const { data: sections, error: sectionsError } = await supabase
                .from('page_sections')
                .select('*')
                .eq('page_id', page.id)
                .order('display_order', { ascending: true });

            if (sectionsError) throw sectionsError;

            setCurrentPage({
                ...page,
                sections: sections || [],
            });
        } catch (error) {
            console.error('Error loading page:', error);
            toast.error('Failed to load page');
        } finally {
            setLoading(false);
        }
    }, []);

    const saveDraft = useCallback(async (sectionId: string, content: Record<string, any>) => {
        if (!isAdmin) return;

        try {
            const { error } = await supabase
                .from('page_sections')
                .update({
                    content_draft: content,
                    draft_version: supabase.rpc('increment', { x: 1 }),
                })
                .eq('id', sectionId);

            if (error) throw error;

            toast.success('Draft saved');

            // Reload page to get updated data
            if (currentPage) {
                await loadPage(currentPage.slug, true);
            }
        } catch (error) {
            console.error('Error saving draft:', error);
            toast.error('Failed to save draft');
        }
    }, [isAdmin, currentPage, loadPage]);

    const publishPage = useCallback(async (pageId: string) => {
        if (!isAdmin) return;

        try {
            // Call the publish_page function
            const { error } = await supabase.rpc('publish_page', {
                page_id_param: pageId,
                user_id_param: user?.id,
            });

            if (error) throw error;

            toast.success('Page published successfully');

            // Reload page
            if (currentPage) {
                await loadPage(currentPage.slug);
            }
        } catch (error) {
            console.error('Error publishing page:', error);
            toast.error('Failed to publish page');
        }
    }, [isAdmin, user, currentPage, loadPage]);

    const createSection = useCallback(async (pageId: string, templateKey: string) => {
        if (!isAdmin) return;

        try {
            // Get current max display_order
            const { data: sections } = await supabase
                .from('page_sections')
                .select('display_order')
                .eq('page_id', pageId)
                .order('display_order', { ascending: false })
                .limit(1);

            const maxOrder = sections && sections.length > 0 ? sections[0].display_order : -1;

            // Create new section
            const { error } = await supabase.from('page_sections').insert({
                page_id: pageId,
                template_key: templateKey,
                section_key: `${templateKey}_${Date.now()}`,
                display_order: maxOrder + 1,
                content_draft: {},
                content_published: {},
            });

            if (error) throw error;

            toast.success('Section added');

            // Reload page
            if (currentPage) {
                await loadPage(currentPage.slug, true);
            }
        } catch (error) {
            console.error('Error creating section:', error);
            toast.error('Failed to create section');
        }
    }, [isAdmin, currentPage, loadPage]);

    const updateSectionOrder = useCallback(async (sectionId: string, newOrder: number) => {
        if (!isAdmin) return;

        try {
            const { error } = await supabase
                .from('page_sections')
                .update({ display_order: newOrder })
                .eq('id', sectionId);

            if (error) throw error;

            // Reload page
            if (currentPage) {
                await loadPage(currentPage.slug, true);
            }
        } catch (error) {
            console.error('Error updating section order:', error);
            toast.error('Failed to reorder section');
        }
    }, [isAdmin, currentPage, loadPage]);

    const deleteSection = useCallback(async (sectionId: string) => {
        if (!isAdmin) return;

        try {
            const { error } = await supabase
                .from('page_sections')
                .delete()
                .eq('id', sectionId);

            if (error) throw error;

            toast.success('Section deleted');

            // Reload page
            if (currentPage) {
                await loadPage(currentPage.slug, true);
            }
        } catch (error) {
            console.error('Error deleting section:', error);
            toast.error('Failed to delete section');
        }
    }, [isAdmin, currentPage, loadPage]);

    return (
        <CMSContext.Provider
            value={{
                currentPage,
                loading,
                loadPage,
                saveDraft,
                publishPage,
                createSection,
                updateSectionOrder,
                deleteSection,
            }}
        >
            {children}
        </CMSContext.Provider>
    );
};
 
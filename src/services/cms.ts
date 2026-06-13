import { supabase } from "@/integrations/supabase/client";

// --- Types ---

export interface CMSPage {
    id: string;
    slug: string;
    title: string;
    template: string;
    status: 'draft' | 'published' | 'archived';
    seo_title?: string;
    seo_description?: string;
    display_order: number;
    updated_at: string;
    created_at: string;
    // Computed/Frontend only
    is_home?: boolean;
}

export interface PageSection {
    id: string;
    page_id: string;
    template_key: string;
    section_key: string;
    display_order: number;
    content_draft: Record<string, any>;
    content_published: Record<string, any>;
    is_visible: boolean;
    content?: Record<string, any>; // Helper for published vs draft
}

export interface SectionTemplate {
    id: string;
    key: string;
    name: string;
    description: string;
    schema: {
        fields: any[]; // refined later
    };
    is_active: boolean;
}

export interface MediaAsset {
    id: string;
    name: string;
    file_path: string;
    file_type: 'image' | 'video' | 'document' | 'other';
    mime_type?: string;
    size_bytes?: number;
    cdn_url?: string;
    version: number;
    created_at: string;
    uploaded_by?: string;
}

// --- API Service ---

/**
 * Fetch all CMS pages
 */
export const getPages = async (): Promise<CMSPage[]> => {
    // @ts-ignore - types not generated yet
    const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;

    // Normalize
    return (data || []).map((p: any) => ({
        ...p,
        is_home: p.slug === 'home'
    }));
};

/**
 * Fetch a single page by slug with its sections
 */
export const getPageBySlug = async (slug: string): Promise<{ page: CMSPage; sections: PageSection[] }> => {
    // 1. Get Page
    // @ts-ignore
    const { data: page, error: pageError } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .single();

    if (pageError) throw pageError;

    // 2. Get Sections
    // @ts-ignore
    const { data: sections, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id)
        .order('display_order', { ascending: true });

    if (sectionsError) throw sectionsError;

    return {
        page: { ...page, is_home: page.slug === 'home' },
        sections: sections || []
    };
};

/**
 * Create a new page
 */
export const createPage = async (title: string, slug: string, template = 'default', userId?: string): Promise<CMSPage> => {
    // Normalize slug: remove leading slash, lowercase
    const cleanSlug = slug.replace(/^\//, '').toLowerCase();

    // @ts-ignore
    const { data, error } = await supabase
        .from('cms_pages')
        .insert({
            title,
            slug: cleanSlug,
            template,
            status: 'draft',
            created_by: userId
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Add a section to a page
 */
export const createSection = async (pageId: string, templateKey: string, order: number): Promise<PageSection> => {
    // @ts-ignore
    const { data, error } = await supabase
        .from('page_sections')
        .insert({
            page_id: pageId,
            template_key: templateKey,
            section_key: `${templateKey}_${Date.now()}`, // fallback key
            display_order: order,
            content_draft: {},
            content_published: {}
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Update a section's draft content (Auto-save)
 */
export const updateSectionDraft = async (sectionId: string, content: Record<string, any>) => {
    // @ts-ignore
    const { error } = await supabase
        .from('page_sections')
        .update({
            content_draft: content,
            updated_at: new Date().toISOString()
        })
        .eq('id', sectionId);

    if (error) throw error;
};

/**
 * Delete a section
 */
export const deleteSection = async (sectionId: string) => {
    // @ts-ignore
    const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', sectionId);

    if (error) throw error;
};

/**
 * Reorder sections
 */
export const reorderSections = async (updates: { id: string; display_order: number }[]) => {
    // Naive loop for now, or use RPC if performance is bad. 
    // Given < 20 sections usually, loop is fine.
    for (const update of updates) {
        // @ts-ignore
        await supabase
            .from('page_sections')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
    }
};

/**
 * Publish Page (RPC)
 */
export const publishPage = async (pageId: string, userId?: string) => {
    const { error } = await supabase.rpc('publish_page', {
        page_id_param: pageId,
        user_id_param: userId
    });
    if (error) throw error;
};

/**
 * Delete Page
 */
export const deletePage = async (pageId: string) => {
    // @ts-ignore
    const { error } = await supabase.from('cms_pages').delete().eq('id', pageId);
    if (error) throw error;
};

/**
 * Get Template Registry
 */
export const getSectionTemplates = async (): Promise<SectionTemplate[]> => {
    // @ts-ignore
    const { data, error } = await supabase
        .from('section_templates')
        .select('*')
        .eq('is_active', true);

    if (error) throw error;
    return data || [];
};

/**
 * Media API
 */

export const getMediaAssets = async (type: 'all' | 'image' | 'video' | 'document' = 'all'): Promise<MediaAsset[]> => {
    let query = supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

    if (type !== 'all') {
        query = query.eq('file_type', type);
    }

    // @ts-ignore
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
};

export const uploadMedia = async (file: File, userId?: string): Promise<MediaAsset> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `media/${fileName}`;

    // 1. Upload
    const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

    // 3. Determine Type
    let fileType = 'document';
    if (file.type.startsWith('image/')) fileType = 'image';
    else if (file.type.startsWith('video/')) fileType = 'video';

    // 4. Create Record
    // @ts-ignore
    const { data, error: dbError } = await supabase.from('media_assets').insert({
        name: file.name,
        file_path: publicUrl,
        file_type: fileType,
        mime_type: file.type,
        size_bytes: file.size,
        version: 1,
        uploaded_by: userId,
    }).select().single();

    if (dbError) throw dbError;
    return data;
};

export const deleteMedia = async (assetId: string) => {
    // @ts-ignore
    const { error } = await supabase.from('media_assets').delete().eq('id', assetId);
    if (error) throw error;
};


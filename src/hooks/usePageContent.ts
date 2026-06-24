interface PageSection {
    id: string;
    template_key: string;
    section_key: string;
    display_order: number;
    is_visible: boolean;
    content: Record<string, unknown>;
}

interface PageContent {
    slug: string;
    title: string;
    seo_title?: string;
    seo_description?: string;
    sections: PageSection[];
}

/**
 * Static replacement for the former CMS-backed page content hook.
 *
 * The site no longer has a backend, so there is no dynamic page content to
 * load. Pages already fall back to their hard-coded defaults when no content
 * is returned, so this simply returns an empty/idle result. The signature is
 * kept intact so existing callers compile unchanged.
 */
export const usePageContent = (_slug: string, _preview = false) => {
    const content: PageContent | null = null;
    return { content, isLoading: false, error: null as Error | null };
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

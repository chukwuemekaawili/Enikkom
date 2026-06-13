import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
    Save,
    Eye,
    Upload,
    ArrowLeft,
    Loader2,
    Monitor,
    Smartphone,
    Tablet
} from 'lucide-react';
import { toast } from 'sonner';
import { arrayMove } from '@dnd-kit/sortable';
import {
    getPageBySlug,
    createPage,
    createSection,
    updateSectionDraft,
    deleteSection as deleteSectionService,
    reorderSections,
    publishPage as publishPageService,
    getSectionTemplates,
    PageSection,
    SectionTemplate
} from '@/services/cms';

import { EditorLayout } from '@/components/admin/editor/EditorLayout';
import { IframePreview } from '@/components/admin/editor/IframePreview';
import { Navigator } from '@/components/admin/editor/Navigator';
import { Inspector } from '@/components/admin/editor/Inspector';

const PageBuilder: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pageId, setPageId] = useState<string | null>(null);
    const [pageTitle, setPageTitle] = useState('');
    const [sections, setSections] = useState<PageSection[]>([]);
    const [templates, setTemplates] = useState<SectionTemplate[]>([]);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

    // Initial Load
    useEffect(() => {
        loadData();
    }, [slug]);

    const loadData = async () => {
        setLoading(true);
        try {
            const tmpls = await getSectionTemplates();
            setTemplates(tmpls);

            if (slug && slug !== 'new') {
                const { page, sections } = await getPageBySlug(slug);
                setPageId(page.id);
                setPageTitle(page.title);
                setSections(sections);
                if (sections.length > 0) setSelectedSectionId(sections[0].id);
            } else {
                setPageTitle('New Page');
            }
        } catch (error) {
            console.error('Error loading page:', error);
            toast.error('Failed to load page data');
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---

    const saveDraft = async () => {
        setSaving(true);
        try {
            let currentPageId = pageId;

            if (!currentPageId) {
                const newPage = await createPage(
                    pageTitle || 'New Page',
                    slug === 'new' ? (pageTitle ? pageTitle.toLowerCase().replace(/\s+/g, '-') : 'new-page') : slug!,
                    'default',
                    user?.id
                );
                currentPageId = newPage.id;
                setPageId(newPage.id);
                // Optionally navigate to new slug here
            }

            // Save all sections (naive)
            for (const section of sections) {
                await updateSectionDraft(section.id, section.content_draft);
            }

            toast.success('Draft saved');
        } catch (error) {
            console.error('Error saving draft:', error);
            toast.error('Failed to save draft');
        } finally {
            setSaving(false);
        }
    };

    const publishPage = async () => {
        if (!pageId) {
            toast.error('Save draft first');
            return;
        }

        try {
            await publishPageService(pageId, user?.id);
            toast.success('Page published!');
        } catch (error) {
            console.error('Error publishing:', error);
            toast.error('Failed to publish');
        }
    };

    const addSection = async (templateKey: string) => {
        if (!pageId) {
            toast.error('Please save the page first to create an ID');
            return;
        }

        try {
            const maxOrder = sections.length > 0 ? Math.max(...sections.map(s => s.display_order)) : -1;
            const newSection = await createSection(pageId, templateKey, maxOrder + 1);

            setSections([...sections, newSection]);
            setSelectedSectionId(newSection.id);
            toast.success('Section added');
        } catch (error) {
            console.error('Add section error:', error);
            toast.error('Failed to add section');
        }
    };

    const deleteSection = async (sectionId: string) => {
        if (!confirm('Delete this section?')) return;

        try {
            await deleteSectionService(sectionId);
            setSections(sections.filter(s => s.id !== sectionId));
            if (selectedSectionId === sectionId) setSelectedSectionId(null);
            toast.success('Section deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete section');
        }
    };

    const handleReorder = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                const reordered = arrayMove(items, oldIndex, newIndex);

                // Optimistic update
                const updates = reordered.map((item, index) => ({
                    id: item.id,
                    display_order: index
                }));
                reorderSections(updates).catch(console.error);

                return reordered.map((item, index) => ({ ...item, display_order: index }));
            });
        }
    };

    const updateSectionContent = (field: string, value: any) => {
        if (!selectedSectionId) return;

        setSections(sections.map(s => {
            if (s.id === selectedSectionId) {
                return { ...s, content_draft: { ...s.content_draft, [field]: value } };
            }
            return s;
        }));
    };

    // --- Derived State ---

    const selectedSection = sections.find(s => s.id === selectedSectionId);
    const selectedTemplate = templates.find(t => t.key === selectedSection?.template_key);

    const previewUrl = React.useMemo(() => {
        if (!slug) return '';
        const baseUrl = slug === 'home' ? '/' : `/${slug}`;
        return `${baseUrl}?preview=true&t=${Date.now()}`; // Add timestamp to force reload if needed? No, purely iframe src.
    }, [slug]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <EditorLayout
            header={
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/pages')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div className="h-6 w-px bg-border" />
                        <Input
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            placeholder="Page Title"
                            className="w-64 h-8 bg-background border-transparent hover:border-border focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground mr-2">
                            {saving ? 'Saving...' : 'All changes saved locally'}
                        </div>
                        <Button variant="secondary" size="sm" onClick={saveDraft} disabled={saving}>
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Draft
                        </Button>
                        <Button size="sm" onClick={publishPage}>
                            <Upload className="h-4 w-4 mr-2" />
                            Publish
                        </Button>
                    </div>
                </div>
            }
            leftPanel={
                <Navigator
                    sections={sections}
                    templates={templates}
                    selectedSectionId={selectedSectionId}
                    onSelect={setSelectedSectionId}
                    onDelete={deleteSection}
                    onReorder={handleReorder}
                    onAdd={addSection}
                />
            }
            rightPanel={
                <Inspector
                    selectedSection={selectedSection}
                    template={selectedTemplate}
                    onChange={updateSectionContent}
                />
            }
        >
            <IframePreview url={previewUrl} />
        </EditorLayout>
    );
};

export default PageBuilder;

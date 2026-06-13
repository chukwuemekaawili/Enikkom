-- New CMS System Database Schema
-- This migration creates the new tables for the WordPress-style CMS
-- with draft/published versioning and proper media asset management

-- ============================================================================
-- 1. CMS Pages Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  template TEXT NOT NULL,  -- 'home', 'about', 'services', etc.
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  -- SEO fields
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  og_image_url TEXT,
  
  -- Ordering
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  
  -- User tracking
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_cms_pages_slug ON public.cms_pages(slug);
CREATE INDEX idx_cms_pages_status ON public.cms_pages(status);
CREATE INDEX idx_cms_pages_display_order ON public.cms_pages(display_order);

-- ============================================================================
-- 2. Section Templates Table (defines available section types)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.section_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,  -- 'hero', 'stats', 'text_block', 'gallery', etc.
  name TEXT NOT NULL,
  description TEXT,
  schema JSONB NOT NULL,  -- JSON schema defining  available fields
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default section templates
INSERT INTO public.section_templates (key, name, description, schema) VALUES
  ('hero', 'Hero Section', 'Hero section with title, subtitle, and CTA', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Title", "required": true},
      {"name": "subtitle", "type": "textarea", "label": "Subtitle"},
      {"name": "background_image", "type": "image", "label": "Background Image"},
      {"name": "cta_text", "type": "text", "label": "CTA Button Text"},
      {"name": "cta_link", "type": "text", "label": "CTA Button Link"}
    ]
  }'::jsonb),
  ('stats', 'Statistics/KPIs', 'Statistics or KPIs with numbers and labels', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Section Title"},
      {"name": "items", "type": "repeater", "label": "Stats", "fields": [
        {"name": "number", "type": "text", "label": "Number"},
        {"name": "label", "type": "text", "label": "Label"},
        {"name": "icon", "type": "icon", "label": "Icon (optional)"}
      ]}
    ]
  }'::jsonb),
  ('text_block', 'Text Block', 'Simple text content block', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Title"},
      {"name": "content", "type": "richtext", "label": "Content"},
      {"name": "alignment", "type": "select", "label": "Alignment", "options": ["left", "center", "right"]}
    ]
  }'::jsonb),
  ('gallery', 'Image Gallery', 'Grid of images', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Title"},
      {"name": "columns", "type": "number", "label": "Columns", "default": 3},
      {"name": "images", "type": "repeater", "label": "Images", "fields": [
        {"name": "image_url", "type": "image", "label": "Image"},
        {"name": "caption", "type": "text", "label": "Caption"},
        {"name": "alt_text", "type": "text", "label": "Alt Text"}
      ]}
    ]
  }'::jsonb),
  ('team', 'Team Grid', 'Team members grid', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Title"},
      {"name": "data_source", "type": "select", "label": "Data Source", "options": ["manual", "team_members_table"], "default": "team_members_table"}
    ]
  }'::jsonb),
  ('video', 'Video', 'Video embed or upload', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Title"},
      {"name": "video_type", "type": "select", "label": "Video Type", "options": ["youtube", "vimeo", "upload"]},
      {"name": "video_url", "type": "text", "label": "Video URL or Embed Code"},
      {"name": "video_file", "type": "video", "label": "Upload Video"}
    ]
  }'::jsonb),
  ('trust_badges', 'Trust Badges/Client Logos', 'Client logos or trust badges', '{
    "fields": [
      {"name": "title", "type": "text", "label": "Title"},
      {"name": "logos", "type": "repeater", "label": "Logos", "fields": [
        {"name": "image_url", "type": "image", "label": "Logo"},
        {"name": "alt_text", "type": "text", "label": "Alt Text"},
        {"name": "link", "type": "text", "label": "Link (optional)"}
      ]}
    ]
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- 3. Page Sections Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  template_key TEXT NOT NULL REFERENCES public.section_templates(key),
  
  -- Section metadata
  section_key TEXT NOT NULL,  -- unique key for this section on the page
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  -- Content (will be different for draft vs published)
  content_draft JSONB DEFAULT '{}'::jsonb,
  content_published JSONB DEFAULT '{}'::jsonb,
  
  -- Version tracking
  draft_version INT DEFAULT 1,
  published_version INT DEFAULT 0,  -- 0 = never published
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  
  UNIQUE(page_id, section_key)
);

CREATE INDEX idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX idx_page_sections_display_order ON public.page_sections(page_id, display_order);

-- ============================================================================
-- 4. Page Section Versions Table (audit history)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.page_section_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  UNIQUE(section_id, version_number)
);

CREATE INDEX idx_section_versions_section_id ON public.page_section_versions(section_id);

-- ============================================================================
-- 5. Enhanced Media Assets Table
-- ============================================================================
-- Drop and recreate with cache-busting support
-- First, backup any existing data if the table exists
DO $$
BEGIN
  -- Check if table exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'media_assets_backup') THEN
    DROP TABLE public.media_assets_backup;
  END IF;
  
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'media_assets') THEN
    CREATE TABLE public.media_assets_backup AS SELECT * FROM public.media_assets;
  END IF;
END $$;

-- Drop old table
DROP TABLE IF EXISTS public.media_assets CASCADE;

-- Create new media_assets table
CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- File information
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,  -- Storage path
  file_type TEXT NOT NULL,  -- 'image', 'video', 'document'
  mime_type TEXT,
  size_bytes BIGINT,
  
  -- Display information
  alt_text TEXT,
  description TEXT,
  category TEXT,
  
  -- Versioning for cache-busting
  version INT DEFAULT 1,
  cdn_url TEXT,  -- Full URL with cache-busting param: ?v=1
  
  -- Usage tracking
  used_in_pages UUID[] DEFAULT '{}',
  usage_location TEXT,  -- Descriptive text of where it's used
  
  -- System flag
  is_system_asset BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_media_assets_file_type ON public.media_assets(file_type);
CREATE INDEX idx_media_assets_category ON public.media_assets(category);
CREATE INDEX idx_media_assets_created_at ON public.media_assets(created_at DESC);

-- ============================================================================
-- 6. Global Settings Table (keep existing, but add version support)
-- ============================================================================
-- site_settings table already exists, just add columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'site_settings' 
                 AND column_name = 'version') THEN
    ALTER TABLE public.site_settings ADD COLUMN version INT DEFAULT 1;
  END IF;
END $$;

-- ============================================================================
-- 7. Publish Events Table (audit log)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.publish_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sections_published INT DEFAULT 0,
  changes_summary TEXT
);

CREATE INDEX idx_publish_events_page_id ON public.publish_events(page_id);
CREATE INDEX idx_publish_events_published_at ON public.publish_events(published_at DESC);

-- ============================================================================
-- 8. Row Level Security Policies
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_section_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publish_events ENABLE ROW LEVEL SECURITY;

-- cms_pages policies
CREATE POLICY "Anyone can view published pages"
  ON public.cms_pages FOR SELECT
  TO authenticated, anon
  USING (status = 'published');

CREATE POLICY "Admins and editors can view all pages"
  ON public.cms_pages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins and editors can create pages"
  ON public.cms_pages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins and editors can update pages"
  ON public.cms_pages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Only admins can delete pages"
  ON public.cms_pages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- section_templates policies (read-only for editors)
CREATE POLICY "Anyone can view section templates"
  ON public.section_templates FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Only admins can modify section templates"
  ON public.section_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- page_sections policies
CREATE POLICY "Admins and editors can manage sections"
  ON public.page_sections FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

-- page_section_versions policies
CREATE POLICY "Admins and editors can view version history"
  ON public.page_section_versions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "System can create version history"
  ON public.page_section_versions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- media_assets policies
CREATE POLICY "Anyone can view media assets"
  ON public.media_assets FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins and editors can upload media"
  ON public.media_assets FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins and editors can update media"
  ON public.media_assets FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Only admins can delete media"
  ON public.media_assets FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- publish_events policies
CREATE POLICY "Admins and editors can view publish history"
  ON public.publish_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- 9. Utility Functions
-- ============================================================================

-- Function to publish a section (copy draft to published)
CREATE OR REPLACE FUNCTION public.publish_section(section_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.page_sections
  SET 
    content_published = content_draft,
    published_version = draft_version,
    published_at = now()
  WHERE id = section_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to publish all sections on a page
CREATE OR REPLACE FUNCTION public.publish_page(page_id_param UUID, user_id_param UUID)
RETURNS void AS $$
DECLARE
  sections_count INT;
BEGIN
  -- Update all sections
  UPDATE public.page_sections
  SET 
    content_published = content_draft,
    published_version = draft_version,
    published_at = now()
  WHERE page_id = page_id_param;
  
  GET DIAGNOSTICS sections_count = ROW_COUNT;
  
  -- Update page status
  UPDATE public.cms_pages
  SET 
    status = 'published',
    published_at = now(),
    updated_by = user_id_param
  WHERE id = page_id_param;
  
  -- Log publish event
  INSERT INTO public.publish_events (page_id, published_by, sections_published)
  VALUES (page_id_param, user_id_param, sections_count);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update media asset URL with cache-busting
CREATE OR REPLACE FUNCTION public.update_media_cdn_url()
RETURNS TRIGGER AS $$
BEGIN
  -- Generate cache-busted URL
  NEW.cdn_url := NEW.file_path || '?v=' || NEW.version;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER media_assets_update_cdn_url
  BEFORE INSERT OR UPDATE OF file_path, version
  ON public.media_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_media_cdn_url();

-- ============================================================================
-- 10. Updated_at Triggers
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cms_pages_updated_at
  BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER page_sections_updated_at
  BEFORE UPDATE ON public.page_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

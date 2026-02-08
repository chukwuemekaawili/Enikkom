-- 1. Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- 2. Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Create site_settings table for global site configuration
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings (for frontend display)
CREATE POLICY "Anyone can read site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can modify site settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Create page_content table for editable page sections
CREATE TABLE public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE (page_slug, section_key)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read page content
CREATE POLICY "Anyone can read page content"
ON public.page_content
FOR SELECT
USING (true);

-- Only admins can modify page content
CREATE POLICY "Admins can manage page content"
ON public.page_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Create media_assets table for uploaded images/videos
CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  alt_text TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Anyone can view media assets
CREATE POLICY "Anyone can view media assets"
ON public.media_assets
FOR SELECT
USING (true);

-- Only admins can manage media assets
CREATE POLICY "Admins can manage media assets"
ON public.media_assets
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 7. Update RFQ submissions policies to allow admin management
DROP POLICY IF EXISTS "Service role can insert submissions" ON public.rfq_submissions;
DROP POLICY IF EXISTS "Service role can select submissions" ON public.rfq_submissions;

CREATE POLICY "Service role can insert submissions"
ON public.rfq_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
ON public.rfq_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
ON public.rfq_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
ON public.rfq_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Update RFQ files policies for admin access
DROP POLICY IF EXISTS "Service role can insert files" ON public.rfq_files;
DROP POLICY IF EXISTS "Service role can select files" ON public.rfq_files;

CREATE POLICY "Service role can insert files"
ON public.rfq_files
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all files"
ON public.rfq_files
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 9. Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin_uploads', 'admin_uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for admin uploads
CREATE POLICY "Anyone can view admin uploads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'admin_uploads');

CREATE POLICY "Admins can upload to admin_uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'admin_uploads' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update admin uploads"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'admin_uploads' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete admin uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'admin_uploads' 
  AND public.has_role(auth.uid(), 'admin')
);

-- 10. Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('branding', '{"logoUrl": "", "faviconUrl": "", "companyName": "Enikkom Construction Limited", "tagline": "Building Infrastructure Excellence"}'),
  ('seo', '{"metaTitle": "Enikkom Construction – HDD, Pipelines, Dredging & Marine Civils – Nigeria", "metaDescription": "Nigeria''s leading indigenous contractor specializing in HDD, pipeline construction, dredging, and marine civil works.", "ogImageUrl": ""}'),
  ('contact', '{"phone": "+234-803-508-2614", "email": "info@enikkom.com", "address": "Plot 2 Isaac John Street, Ikeja GRA, Lagos, Nigeria", "youtubeUrl": "", "linkedinUrl": "", "twitterUrl": ""}'),
  ('hero', '{"videoUrl": "", "headline": "Nigeria''s Premier Pipeline & HDD Contractor", "subheadline": "30+ years of excellence in trenchless technology"}')
ON CONFLICT (key) DO NOTHING;

-- 11. Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
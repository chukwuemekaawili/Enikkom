-- Create team_members table for managing leadership profiles
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  category TEXT DEFAULT 'management',
  qualifications TEXT,
  highlights TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view visible team members" 
ON public.team_members 
FOR SELECT 
USING (is_visible = true);

CREATE POLICY "Admins can manage team members" 
ON public.team_members 
FOR ALL 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial default settings if they don't exist
INSERT INTO public.site_settings (key, value) 
VALUES 
  ('branding', '{"logoUrl": "", "faviconUrl": "", "companyName": "Enikkom Construction Limited", "tagline": "Building Infrastructure Excellence"}'),
  ('contact', '{"phone": "+234 803 508 2614", "email": "info@enikkom.com", "address": "Plot 2 Isaac John Street, Ikeja GRA, Lagos", "youtubeUrl": "", "linkedinUrl": "", "twitterUrl": ""}'),
  ('seo', '{"metaTitle": "Enikkom Construction – HDD, Pipelines, Dredging & Marine Civils – Nigeria", "metaDescription": "Nigeria''s leading contractor specializing in HDD, pipeline construction, dredging, and marine works. 30+ years of experience.", "ogImageUrl": "", "keywords": "HDD Nigeria, pipeline construction, dredging, marine works, trenchless technology"}'),
  ('hero', '{"videoUrl": "", "headline": "Nigeria''s Premier Trenchless & Pipeline Contractor", "subheadline": "Pioneers of HDD in Nigeria since 2003"}')
ON CONFLICT (key) DO NOTHING;
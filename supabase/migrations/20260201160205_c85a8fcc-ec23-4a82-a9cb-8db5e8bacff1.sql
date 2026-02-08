-- Seed default site settings if they don't exist
INSERT INTO public.site_settings (key, value) VALUES
  ('branding', '{
    "logoUrl": "",
    "faviconUrl": "",
    "companyName": "Enikkom Construction Limited",
    "tagline": "Building Infrastructure Excellence"
  }'::jsonb),
  ('contact', '{
    "phone": "+234 803 508 2614",
    "email": "info@enikkom.com",
    "address": "Plot 2 Isaac John Street, Ikeja GRA, Lagos",
    "youtubeUrl": "",
    "linkedinUrl": "",
    "twitterUrl": ""
  }'::jsonb),
  ('seo', '{
    "metaTitle": "Enikkom Construction – HDD, Pipelines, Dredging & Marine Civils – Nigeria",
    "metaDescription": "Nigeria''s leading contractor specializing in HDD, pipeline construction, dredging, and marine works. 30+ years of experience.",
    "ogImageUrl": "",
    "keywords": "HDD Nigeria, pipeline construction, dredging, marine works, trenchless technology"
  }'::jsonb),
  ('hero', '{
    "videoUrl": "https://www.youtube.com/embed/uv_ozmjIo-E",
    "headline": "Nigeria''s Premier Trenchless & Pipeline Contractor",
    "subheadline": "Pioneers of HDD in Nigeria since 2003. Over 100km installed, including Africa''s longest single drill (3.1km) and Nigeria''s longest Continuous HDD (12km). Trusted by Shell, Dangote, NNPC, and Saipem."
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Seed default home page content if it doesn't exist
INSERT INTO public.page_content (page_slug, section_key, content) VALUES
  ('home', 'hero', '{
    "title": "Nigeria''s Premier Trenchless & Pipeline Contractor",
    "subtitle": "Pioneers of HDD in Nigeria since 2003. Over 100km installed, including Africa''s longest single drill (3.1km) and Nigeria''s longest Continuous HDD (12km). Trusted by Shell, Dangote, NNPC, and Saipem.",
    "badge": "Pioneers of HDD in Nigeria since 2003",
    "primaryBtnText": "Get Your Free Quote",
    "primaryBtnLink": "/contact",
    "secondaryBtnText": "View Our Projects",
    "secondaryBtnLink": "/projects",
    "slides": []
  }'::jsonb),
  ('home', 'kpi_stats', '{
    "stat1_value": "100+",
    "stat1_label": "KM HDD Installed",
    "stat2_value": "10+",
    "stat2_label": "Maxi HDD Rigs",
    "stat3_value": "30+",
    "stat3_label": "Years Experience",
    "stat4_value": "0",
    "stat4_label": "Lost Time Incidents"
  }'::jsonb),
  ('home', 'capabilities_intro', '{
    "title": "Infrastructure Capabilities",
    "subtitle": "What We Do",
    "description": "End-to-end solutions for Nigeria''s most demanding infrastructure projects."
  }'::jsonb),
  ('home', 'about_section', '{
    "title": "Pioneers of HDD in Nigeria Since 2003",
    "subtitle": "Our Story",
    "description": "Founded in 1995, Enikkom Construction Limited pioneered Horizontal Directional Drilling (HDD) technology in Nigeria with the historic River Niger crossing in 2003. Today, we hold records for Africa''s longest single drill (3.1km) and Nigeria''s longest Continuous HDD (12km).",
    "description2": "Our strategic partnership with HDDThailand and ownership of West Africa''s largest HDD fleet—10+ maxi rigs with capacities up to 500 tons—positions us as the region''s premier trenchless contractor.",
    "mission": "To offer innovative and cost effective solutions to our clients.",
    "vision": "To be the foremost indigenous engineering construction company in Nigeria."
  }'::jsonb),
  ('home', 'video_showcase', '{
    "title": "OML34 Continuous HDD - 12km Record",
    "subtitle": "Featured Project",
    "description": "Watch the documentary of Nigeria''s longest functional Continuous HDD project—10\" x 12km pipeline installation for NPDC, setting a new industry benchmark.",
    "videoUrl": "https://www.youtube.com/embed/uv_ozmjIo-E",
    "stats": [
      {"value": "12km", "label": "Total Length"},
      {"value": "10\"", "label": "Pipe Diameter"},
      {"value": "NPDC", "label": "Client"},
      {"value": "#1", "label": "In Nigeria"}
    ]
  }'::jsonb),
  ('home', 'cta_band', '{
    "headline": "Start Your Project Today",
    "subhead": "Response within 24 hours",
    "primaryBtnText": "Get Your Free Quote",
    "primaryBtnLink": "/contact"
  }'::jsonb)
ON CONFLICT (page_slug, section_key) DO NOTHING;

-- Create unique constraint on page_slug + section_key if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'page_content_slug_key_unique'
  ) THEN
    CREATE UNIQUE INDEX page_content_slug_key_unique ON public.page_content (page_slug, section_key);
  END IF;
END $$;
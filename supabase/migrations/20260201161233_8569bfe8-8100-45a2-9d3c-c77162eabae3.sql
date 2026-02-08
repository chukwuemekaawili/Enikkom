-- First, let's add a usage_location and description column to media_assets for context
ALTER TABLE public.media_assets ADD COLUMN IF NOT EXISTS usage_location text;
ALTER TABLE public.media_assets ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.media_assets ADD COLUMN IF NOT EXISTS is_system_asset boolean DEFAULT false;

-- Insert all existing website assets with their descriptions and usage locations
-- Branding assets
INSERT INTO public.media_assets (name, file_path, file_type, category, alt_text, description, usage_location, is_system_asset)
VALUES 
  ('enikkom-logo-color.png', '/src/assets/enikkom-logo-color.png', 'image', 'branding', 'Enikkom Color Logo', 'Primary company logo in full color. Used on light backgrounds.', 'Header, Footer, About Page', true),
  ('enikkom-logo-light.png', '/src/assets/enikkom-logo-light.png', 'image', 'branding', 'Enikkom Light Logo', 'Light version of company logo for dark backgrounds.', 'Dark sections, Hero overlays', true),
  ('enikkom-logo-white.png', '/src/assets/enikkom-logo-white.png', 'image', 'branding', 'Enikkom White Logo', 'White version of company logo for dark backgrounds.', 'Footer, Dark Hero sections', true),

  -- Hero assets
  ('hero-hdd-rig.jpg', '/src/assets/hero/hero-hdd-rig.jpg', 'image', 'hero', 'HDD Rig Hero Image', 'Main hero image showing HDD drilling rig in operation. Should be high-resolution (1920x1080 min).', 'Homepage Hero Slider', true),

  -- Capabilities assets
  ('dredging-marine.jpg', '/src/assets/capabilities/dredging-marine.jpg', 'image', 'capabilities', 'Dredging and Marine Works', 'Image showcasing dredging and marine construction operations.', 'Capabilities Page - Dredging Section', true),
  ('hdd-drilling.jpg', '/src/assets/capabilities/hdd-drilling.jpg', 'image', 'capabilities', 'HDD Drilling Operations', 'Image showing Horizontal Directional Drilling equipment and operations.', 'Capabilities Page - HDD Section', true),
  ('jetty-construction.jpg', '/src/assets/capabilities/jetty-construction.jpg', 'image', 'capabilities', 'Jetty Construction', 'Image of jetty/pier construction work in progress.', 'Capabilities Page - Jetty Section', true),
  ('pipeline-construction.jpg', '/src/assets/capabilities/pipeline-construction.jpg', 'image', 'capabilities', 'Pipeline Construction', 'Image showing pipeline installation and construction work.', 'Capabilities Page - Pipeline Section', true),

  -- Equipment assets
  ('equipment-fleet.jpg', '/src/assets/equipment/equipment-fleet.jpg', 'image', 'equipment', 'Equipment Fleet', 'Overview image of company equipment fleet and machinery.', 'Equipment Page Hero, About Section', true),

  -- Video assets
  ('hdd-operations-hero.mp4', '/src/assets/videos/hdd-operations-hero.mp4', 'video', 'hero', 'HDD Operations Video', 'Background video showing HDD drilling operations. MP4 format, optimized for web playback.', 'Homepage Video Hero Section', true),

  -- Project images
  ('atlas-cove-mosimi.jpg', '/src/assets/projects/atlas-cove-mosimi.jpg', 'image', 'projects', 'Atlas Cove to Mosimi Pipeline', 'Project image for Atlas Cove to Mosimi pipeline installation.', 'Projects Page, Case Studies', true),
  ('atlas-cove-mosimi-2.jpg', '/src/assets/projects/atlas-cove-mosimi-2.jpg', 'image', 'projects', 'Atlas Cove to Mosimi Pipeline - View 2', 'Additional angle of Atlas Cove to Mosimi project.', 'Project Detail Page', true),
  ('lekki-gas-pipeline.jpg', '/src/assets/projects/lekki-gas-pipeline.jpg', 'image', 'projects', 'Lekki Gas Pipeline', 'Lekki Gas Pipeline project documentation image.', 'Projects Page', true),
  ('nipco-ibafo.jpg', '/src/assets/projects/nipco-ibafo.jpg', 'image', 'projects', 'NIPCO Ibafo Project', 'NIPCO Ibafo pipeline project image.', 'Projects Page, Case Studies', true),
  ('nipco-ibafo-2.jpg', '/src/assets/projects/nipco-ibafo-2.jpg', 'image', 'projects', 'NIPCO Ibafo Project - View 2', 'Additional image from NIPCO Ibafo project.', 'Project Detail Page', true),
  ('nipco-ibafo-3.jpg', '/src/assets/projects/nipco-ibafo-3.jpg', 'image', 'projects', 'NIPCO Ibafo Project - View 3', 'Third angle from NIPCO Ibafo project.', 'Project Detail Page', true),
  ('nipco-pipeline.jpg', '/src/assets/projects/nipco-pipeline.jpg', 'image', 'projects', 'NIPCO Pipeline Overview', 'General NIPCO pipeline project image.', 'Projects Page', true),
  ('otumara-escravos.jpg', '/src/assets/projects/otumara-escravos.jpg', 'image', 'projects', 'Otumara Escravos Project', 'Otumara to Escravos pipeline project image.', 'Projects Page', true),
  ('otumara-escravos-2.jpg', '/src/assets/projects/otumara-escravos-2.jpg', 'image', 'projects', 'Otumara Escravos Project - View 2', 'Additional view of Otumara Escravos project.', 'Project Detail Page', true),
  ('dredging-hero.jpg', '/src/assets/projects/dredging-hero.jpg', 'image', 'projects', 'Dredging Operations Hero', 'Hero image for dredging operations page.', 'Dredging Capability Page Hero', true),
  ('dredging-marine.png', '/src/assets/projects/dredging-marine.png', 'image', 'projects', 'Dredging Marine Work', 'Marine dredging operations image.', 'Dredging Page Content', true),
  ('drilling-site.png', '/src/assets/projects/drilling-site.png', 'image', 'projects', 'Drilling Site Overview', 'Overview of drilling site operations.', 'HDD Page, Services Page', true),
  ('drilling-site-2.jpg', '/src/assets/projects/drilling-site-2.jpg', 'image', 'projects', 'Drilling Site - View 2', 'Secondary drilling site image.', 'HDD Equipment Page', true),
  ('drilling-ops-4.jpg', '/src/assets/projects/drilling-ops-4.jpg', 'image', 'projects', 'Drilling Operations 4', 'Drilling operations documentation.', 'Gallery, Operations Page', true),
  ('drilling-ops-5.jpg', '/src/assets/projects/drilling-ops-5.jpg', 'image', 'projects', 'Drilling Operations 5', 'Drilling operations documentation.', 'Gallery, Operations Page', true),
  ('drilling-ops-6.jpg', '/src/assets/projects/drilling-ops-6.jpg', 'image', 'projects', 'Drilling Operations 6', 'Drilling operations documentation.', 'Gallery, Operations Page', true),
  ('drilling-ops-7.jpg', '/src/assets/projects/drilling-ops-7.jpg', 'image', 'projects', 'Drilling Operations 7', 'Drilling operations documentation.', 'Gallery, Operations Page', true),
  ('hdd-rig-operation.png', '/src/assets/projects/hdd-rig-operation.png', 'image', 'projects', 'HDD Rig Operation', 'HDD rig during active operation.', 'HDD Page Hero, Equipment Page', true),
  ('hdd-rig-night.jpg', '/src/assets/projects/hdd-rig-night.jpg', 'image', 'projects', 'HDD Rig Night Operations', 'Night-time HDD rig operations showing lighting setup.', 'HDD Page, 24/7 Operations Section', true),
  ('hdd-night-panorama.jpg', '/src/assets/projects/hdd-night-panorama.jpg', 'image', 'projects', 'HDD Night Panorama', 'Panoramic view of HDD operations at night.', 'Gallery, Hero Slider', true),
  ('hdd-operations-2.jpg', '/src/assets/projects/hdd-operations-2.jpg', 'image', 'projects', 'HDD Operations', 'HDD drilling operations image.', 'HDD Equipment Page', true),
  ('hdd-drill-string.jpg', '/src/assets/projects/hdd-drill-string.jpg', 'image', 'projects', 'HDD Drill String', 'Close-up of HDD drill string and components.', 'HDD Equipment Page, Technical Specs', true),
  ('hdd-equipment-fleet.jpg', '/src/assets/projects/hdd-equipment-fleet.jpg', 'image', 'equipment', 'HDD Equipment Fleet', 'Overview of HDD equipment fleet.', 'HDD Equipment Page Hero', true),
  ('hdd-equipment-fleet-2.jpg', '/src/assets/projects/hdd-equipment-fleet-2.jpg', 'image', 'equipment', 'HDD Equipment Fleet - View 2', 'Secondary view of HDD equipment.', 'HDD Equipment Page', true),
  ('hdd-equipment-fleet-3.jpg', '/src/assets/projects/hdd-equipment-fleet-3.jpg', 'image', 'equipment', 'HDD Equipment Fleet - View 3', 'Third view of HDD equipment lineup.', 'HDD Equipment Page', true),
  ('hdd-equipment-fleet-4.jpg', '/src/assets/projects/hdd-equipment-fleet-4.jpg', 'image', 'equipment', 'HDD Equipment Fleet - View 4', 'Fourth view showing HDD equipment.', 'Equipment Gallery', true),
  ('hero-hdd.jpg', '/src/assets/projects/hero-hdd.jpg', 'image', 'hero', 'HDD Hero Image', 'Hero image for HDD capability pages.', 'HDD Capability Page Hero', true),
  ('jetty-construction.jpg', '/src/assets/projects/jetty-construction.jpg', 'image', 'projects', 'Jetty Construction Project', 'Jetty and marine structure construction work.', 'Jetty Capability Page', true),
  ('pipeline-construction.jpg', '/src/assets/projects/pipeline-construction.jpg', 'image', 'projects', 'Pipeline Construction', 'Pipeline construction and laying operations.', 'Pipeline Capability Page', true),
  ('pipeline-laying.png', '/src/assets/projects/pipeline-laying.png', 'image', 'projects', 'Pipeline Laying', 'Active pipeline laying operation.', 'Pipeline Page, Services Page', true),
  ('pipeline-crew.jpg', '/src/assets/projects/pipeline-crew.jpg', 'image', 'projects', 'Pipeline Crew at Work', 'Pipeline installation crew in action.', 'About Page, Careers Page', true),
  ('pipe-handling.jpg', '/src/assets/projects/pipe-handling.jpg', 'image', 'projects', 'Pipe Handling Operations', 'Pipe handling and logistics operations.', 'Equipment Page, Operations', true),
  ('pipe-laying-crane.jpg', '/src/assets/projects/pipe-laying-crane.jpg', 'image', 'projects', 'Pipe Laying with Crane', 'Crane-assisted pipe laying operations.', 'Equipment Page', true),
  ('pipe-welding.png', '/src/assets/projects/pipe-welding.png', 'image', 'projects', 'Pipe Welding', 'Pipe welding operations on site.', 'Services Page, Quality Section', true),
  ('swamp-pipeline.png', '/src/assets/projects/swamp-pipeline.png', 'image', 'projects', 'Swamp Pipeline', 'Pipeline installation in swamp/wetland terrain.', 'Capabilities Page, Challenging Terrains', true),
  ('shore-approach.jpg', '/src/assets/projects/shore-approach.jpg', 'image', 'projects', 'Shore Approach Installation', 'Shore approach pipeline installation.', 'Marine Works Page', true),
  ('shore-approach.png', '/src/assets/projects/shore-approach.png', 'image', 'projects', 'Shore Approach Overview', 'Overview of shore approach work.', 'Marine Works Page', true),
  ('rig-setup.png', '/src/assets/projects/rig-setup.png', 'image', 'projects', 'Rig Setup', 'Drilling rig setup and preparation.', 'HDD Page, Setup Process', true),
  ('crane-operations.jpg', '/src/assets/projects/crane-operations.jpg', 'image', 'equipment', 'Crane Operations', 'Heavy crane operations on site.', 'Equipment Page', true),
  ('multi-crane-operations.jpg', '/src/assets/projects/multi-crane-operations.jpg', 'image', 'equipment', 'Multi-Crane Operations', 'Multiple cranes working together.', 'Equipment Page, Large Projects', true),
  ('330b-excavator.jpg', '/src/assets/projects/330b-excavator.jpg', 'image', 'equipment', '330B Excavator', 'CAT 330B Excavator on site.', 'Equipment Page', true),
  ('cat-excavator.jpg', '/src/assets/projects/cat-excavator.jpg', 'image', 'equipment', 'CAT Excavator', 'Caterpillar excavator at work.', 'Equipment Page', true),
  ('equipment-fleet.jpg', '/src/assets/projects/equipment-fleet.jpg', 'image', 'equipment', 'Full Equipment Fleet', 'Overview of company equipment fleet.', 'Equipment Page Hero', true),
  ('hse-safety.jpg', '/src/assets/projects/hse-safety.jpg', 'image', 'projects', 'HSE Safety Practices', 'Health, Safety, and Environment practices on site.', 'HSE Page, Quality Page', true),
  ('safety-signage.jpg', '/src/assets/projects/safety-signage.jpg', 'image', 'projects', 'Safety Signage', 'Safety signage and protocols.', 'HSE Page', true),
  ('team-safety.jpg', '/src/assets/projects/team-safety.jpg', 'image', 'projects', 'Team Safety Meeting', 'Team safety briefing and meeting.', 'HSE Page, About Page', true),
  ('tripping-safety.jpg', '/src/assets/projects/tripping-safety.jpg', 'image', 'projects', 'Tripping Safety', 'Safety during tripping operations.', 'HSE Page', true),
  ('workers-ppe.jpg', '/src/assets/projects/workers-ppe.jpg', 'image', 'projects', 'Workers in PPE', 'Workers wearing proper PPE on site.', 'HSE Page, Careers Page', true),
  ('welding-crew.jpg', '/src/assets/projects/welding-crew.jpg', 'image', 'projects', 'Welding Crew', 'Welding crew at work.', 'Services Page, Careers Page', true),
  ('careers-team.jpg', '/src/assets/projects/careers-team.jpg', 'image', 'projects', 'Careers Team Photo', 'Team photo for careers section.', 'Careers Page Hero', true),
  ('hdd-team-1.jpg', '/src/assets/projects/hdd-team-1.jpg', 'image', 'projects', 'HDD Team', 'HDD operations team on site.', 'About Page, Team Section', true),
  ('client-logos.jpg', '/src/assets/projects/client-logos.jpg', 'image', 'branding', 'Client Logos', 'Collection of client logos and partnerships.', 'Partners Page, Footer', true),
  ('qms-iso-cert.jpg', '/src/assets/projects/qms-iso-cert.jpg', 'image', 'projects', 'ISO QMS Certificate', 'ISO Quality Management System certification.', 'About Page, Quality Section', true),
  ('contact-office.jpg', '/src/assets/projects/contact-office.jpg', 'image', 'projects', 'Contact Office', 'Company office building/location.', 'Contact Page Hero', true),
  ('brochure-hero.jpg', '/src/assets/projects/brochure-hero.jpg', 'image', 'projects', 'Brochure Hero Image', 'Hero image used in company brochure.', 'Resources Page, Downloads', true),
  ('partnership-hddthailand.jpg', '/src/assets/projects/partnership-hddthailand.jpg', 'image', 'projects', 'HDD Thailand Partnership', 'Partnership with HDD Thailand.', 'Partners Page', true),
  ('partnership-hddthailand-2.jpg', '/src/assets/projects/partnership-hddthailand-2.jpg', 'image', 'projects', 'HDD Thailand Partnership - 2', 'Additional partnership image.', 'Partners Page', true),
  ('scope-operations.jpg', '/src/assets/projects/scope-operations.jpg', 'image', 'projects', 'Scope of Operations', 'Overview of operational scope.', 'About Page, Services Page', true),
  ('scope-operations-2.jpg', '/src/assets/projects/scope-operations-2.jpg', 'image', 'projects', 'Scope of Operations - View 2', 'Operations scope image.', 'Services Page', true),
  ('scope-operations-3.jpg', '/src/assets/projects/scope-operations-3.jpg', 'image', 'projects', 'Scope of Operations - View 3', 'Additional operations scope image.', 'Services Page', true),

  -- Team member photos
  ('md-ceo.jpg', '/src/assets/team/md-ceo.jpg', 'image', 'team', 'Managing Director/CEO Photo', 'Professional headshot of Managing Director/CEO. Should be formal, high-quality portrait.', 'Management Page, About Page', true),
  ('technical-director.jpg', '/src/assets/team/technical-director.jpg', 'image', 'team', 'Technical Director Photo', 'Professional headshot of Technical Director.', 'Management Page', true),
  ('operations-director.jpg', '/src/assets/team/operations-director.jpg', 'image', 'team', 'Operations Director Photo', 'Professional headshot of Operations Director.', 'Management Page', true),
  ('commercial-director.jpg', '/src/assets/team/commercial-director.jpg', 'image', 'team', 'Commercial Director Photo', 'Professional headshot of Commercial Director.', 'Management Page', true),
  ('projects-director.jpg', '/src/assets/team/projects-director.jpg', 'image', 'team', 'Projects Director Photo', 'Professional headshot of Projects Director.', 'Management Page', true),
  ('hse-director.jpg', '/src/assets/team/hse-director.jpg', 'image', 'team', 'HSE Director Photo', 'Professional headshot of HSE Director.', 'Management Page', true),
  ('adekunle-adewole.png', '/src/assets/team/adekunle-adewole.png', 'image', 'team', 'Adekunle Adewole Photo', 'Professional headshot of Adekunle Adewole.', 'Team Page', true),
  ('biodun-adefila.jpg', '/src/assets/team/biodun-adefila.jpg', 'image', 'team', 'Biodun Adefila Photo', 'Professional headshot of Biodun Adefila.', 'Team Page', true),
  ('chibuike-nwachukwu.png', '/src/assets/team/chibuike-nwachukwu.png', 'image', 'team', 'Chibuike Nwachukwu Photo', 'Professional headshot of Chibuike Nwachukwu.', 'Team Page', true),
  ('edward-amene.png', '/src/assets/team/edward-amene.png', 'image', 'team', 'Edward Amene Photo', 'Professional headshot of Edward Amene.', 'Team Page', true),
  ('francis-anatogu.png', '/src/assets/team/francis-anatogu.png', 'image', 'team', 'Francis Anatogu Photo', 'Professional headshot of Francis Anatogu.', 'Team Page', true),
  ('idigbor-emeka.png', '/src/assets/team/idigbor-emeka.png', 'image', 'team', 'Idigbor Emeka Photo', 'Professional headshot of Idigbor Emeka.', 'Team Page', true),
  ('ken-james.png', '/src/assets/team/ken-james.png', 'image', 'team', 'Ken James Photo', 'Professional headshot of Ken James.', 'Team Page', true),
  ('saleem-khan.png', '/src/assets/team/saleem-khan.png', 'image', 'team', 'Saleem Khan Photo', 'Professional headshot of Saleem Khan.', 'Team Page', true),
  ('teddy-allen.png', '/src/assets/team/teddy-allen.png', 'image', 'team', 'Teddy Allen Photo', 'Professional headshot of Teddy Allen.', 'Team Page', true)

ON CONFLICT DO NOTHING;
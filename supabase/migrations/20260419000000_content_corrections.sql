DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'page_sections'
  ) AND EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'cms_pages'
  ) THEN
    UPDATE public.page_sections AS ps
    SET
      content_draft = jsonb_set(COALESCE(ps.content_draft, '{}'::jsonb), '{stat3_value}', to_jsonb('34'::text), true),
      content_published = jsonb_set(COALESCE(ps.content_published, '{}'::jsonb), '{stat3_value}', to_jsonb('34'::text), true)
    FROM public.cms_pages AS cp
    WHERE ps.page_id = cp.id
      AND cp.slug = 'home'
      AND ps.section_key = 'kpi_stats';

    UPDATE public.page_sections AS ps
    SET
      content_draft = jsonb_set(COALESCE(ps.content_draft, '{}'::jsonb), '{stat1_value}', to_jsonb('34'::text), true),
      content_published = jsonb_set(COALESCE(ps.content_published, '{}'::jsonb), '{stat1_value}', to_jsonb('34'::text), true)
    FROM public.cms_pages AS cp
    WHERE ps.page_id = cp.id
      AND cp.slug = 'services'
      AND ps.section_key = 'why_us';

    UPDATE public.page_sections AS ps
    SET
      content_draft = jsonb_set(
        jsonb_set(COALESCE(ps.content_draft, '{}'::jsonb), '{stat1_value}', to_jsonb('120'::text), true),
        '{stat4_value}',
        to_jsonb('34'::text),
        true
      ),
      content_published = jsonb_set(
        jsonb_set(COALESCE(ps.content_published, '{}'::jsonb), '{stat1_value}', to_jsonb('120'::text), true),
        '{stat4_value}',
        to_jsonb('34'::text),
        true
      )
    FROM public.cms_pages AS cp
    WHERE ps.page_id = cp.id
      AND cp.slug = 'completed-projects'
      AND ps.section_key = 'stats';

    UPDATE public.page_sections AS ps
    SET
      content_draft = jsonb_set(COALESCE(ps.content_draft, '{}'::jsonb), '{title}', to_jsonb('34 Years of Experience'::text), true),
      content_published = jsonb_set(COALESCE(ps.content_published, '{}'::jsonb), '{title}', to_jsonb('34 Years of Experience'::text), true)
    FROM public.cms_pages AS cp
    WHERE ps.page_id = cp.id
      AND cp.slug = 'company-intro'
      AND ps.section_key = 'timeline';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'page_content'
  ) THEN
    UPDATE public.page_content
    SET content = jsonb_set(COALESCE(content, '{}'::jsonb), '{stat3_value}', to_jsonb('34'::text), true)
    WHERE page_slug = 'home'
      AND section_key = 'kpi_stats';

    UPDATE public.page_content
    SET content = jsonb_set(COALESCE(content, '{}'::jsonb), '{stat1_value}', to_jsonb('34'::text), true)
    WHERE page_slug = 'services'
      AND section_key = 'why_us';

    UPDATE public.page_content
    SET content = jsonb_set(
      jsonb_set(COALESCE(content, '{}'::jsonb), '{stat1_value}', to_jsonb('120'::text), true),
      '{stat4_value}',
      to_jsonb('34'::text),
      true
    )
    WHERE page_slug = 'completed-projects'
      AND section_key = 'stats';

    UPDATE public.page_content
    SET content = jsonb_set(COALESCE(content, '{}'::jsonb), '{title}', to_jsonb('34 Years of Experience'::text), true)
    WHERE page_slug = 'company-intro'
      AND section_key = 'timeline';
  END IF;
END $$;

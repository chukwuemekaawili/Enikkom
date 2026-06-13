-- Fix hero subtitle duplication on the homepage
-- The subtitle field in page_content previously began with:
--   "Pioneers of HDD in Nigeria since 2003. "
-- This phrase is already displayed via the separate `badge` field.
-- This migration removes the redundant prefix from the JSON content.

UPDATE public.page_content
SET content = jsonb_set(
  content,
  '{subtitle}',
  to_jsonb(
    replace(
      content->>'subtitle',
      'Pioneers of HDD in Nigeria since 2003. ',
      ''
    )
  )
)
WHERE page_slug = 'home'
  AND section_key = 'hero'
  AND content->>'subtitle' LIKE 'Pioneers of HDD in Nigeria since 2003. %';

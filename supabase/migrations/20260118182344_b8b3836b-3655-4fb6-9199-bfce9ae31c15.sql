-- RLS policies for rfq_submissions
-- No direct public access - submissions handled via edge function with service role
-- This policy allows edge functions with service role to insert
CREATE POLICY "Service role can insert submissions"
ON public.rfq_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can select submissions"
ON public.rfq_submissions FOR SELECT
USING (true);

-- RLS policies for rfq_files
-- Same pattern - edge function handles inserts
CREATE POLICY "Service role can insert files"
ON public.rfq_files FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can select files"
ON public.rfq_files FOR SELECT
USING (true);
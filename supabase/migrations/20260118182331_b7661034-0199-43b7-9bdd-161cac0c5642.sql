-- Create RFQ submissions table
CREATE TABLE public.rfq_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  project_location TEXT NOT NULL,
  target_diameter TEXT,
  target_crossing_length TEXT,
  target_depth_cover TEXT,
  desired_start_date DATE,
  additional_notes TEXT,
  consent BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'new',
  metadata JSONB
);

-- Create RFQ files table
CREATE TABLE public.rfq_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  submission_id UUID NOT NULL REFERENCES public.rfq_submissions(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT
);

-- Enable RLS on both tables
ALTER TABLE public.rfq_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_files ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for RFQ uploads (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('rfq_uploads', 'rfq_uploads', false);

-- Create storage policies
CREATE POLICY "Authenticated users can upload RFQ files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'rfq_uploads');

CREATE POLICY "Service role can read RFQ files"
ON storage.objects FOR SELECT
USING (bucket_id = 'rfq_uploads');
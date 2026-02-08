import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max submissions per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// Server-side validation matching the client-side zod schema
function validateInput(data: unknown): { valid: boolean; errors?: string[]; sanitized?: Record<string, unknown> } {
  const errors: string[] = [];
  
  if (typeof data !== "object" || data === null) {
    return { valid: false, errors: ["Invalid request body"] };
  }

  const input = data as Record<string, unknown>;

  // Required fields validation
  const requiredFields = [
    { key: "fullName", label: "Full Name", minLength: 2, maxLength: 200 },
    { key: "company", label: "Company", minLength: 2, maxLength: 200 },
    { key: "email", label: "Email", minLength: 5, maxLength: 254 },
    { key: "phone", label: "Phone", minLength: 8, maxLength: 30 },
    { key: "projectType", label: "Project Type", minLength: 1, maxLength: 50 },
    { key: "projectLocation", label: "Project Location", minLength: 2, maxLength: 500 },
  ];

  for (const field of requiredFields) {
    const value = input[field.key];
    if (typeof value !== "string" || value.trim().length < field.minLength) {
      errors.push(`${field.label} is required and must be at least ${field.minLength} characters`);
    } else if (value.length > field.maxLength) {
      errors.push(`${field.label} must be less than ${field.maxLength} characters`);
    }
  }

  // Email format validation
  const email = input.email;
  if (typeof email === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push("Invalid email format");
    }
  }

  // Consent validation
  if (input.consent !== true) {
    errors.push("You must agree to be contacted");
  }

  // Optional fields validation with length limits
  const optionalFields = [
    { key: "targetDiameter", maxLength: 100 },
    { key: "targetCrossingLength", maxLength: 100 },
    { key: "targetDepthCover", maxLength: 100 },
    { key: "desiredStartDate", maxLength: 20 },
    { key: "additionalNotes", maxLength: 5000 },
  ];

  for (const field of optionalFields) {
    const value = input[field.key];
    if (value !== undefined && value !== null && value !== "") {
      if (typeof value !== "string" || value.length > field.maxLength) {
        errors.push(`${field.key} must be a string with max ${field.maxLength} characters`);
      }
    }
  }

  // Project type must be one of allowed values
  const allowedProjectTypes = ["hdd", "pipeline", "dredging", "jetty", "shore", "other"];
  if (typeof input.projectType === "string" && !allowedProjectTypes.includes(input.projectType)) {
    errors.push("Invalid project type");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Return sanitized data
  return {
    valid: true,
    sanitized: {
      full_name: (input.fullName as string).trim().slice(0, 200),
      company: (input.company as string).trim().slice(0, 200),
      email: (input.email as string).trim().toLowerCase().slice(0, 254),
      phone: (input.phone as string).trim().slice(0, 30),
      project_type: (input.projectType as string).trim().slice(0, 50),
      project_location: (input.projectLocation as string).trim().slice(0, 500),
      target_diameter: input.targetDiameter ? (input.targetDiameter as string).trim().slice(0, 100) : null,
      target_crossing_length: input.targetCrossingLength ? (input.targetCrossingLength as string).trim().slice(0, 100) : null,
      target_depth_cover: input.targetDepthCover ? (input.targetDepthCover as string).trim().slice(0, 100) : null,
      desired_start_date: input.desiredStartDate ? (input.desiredStartDate as string).trim().slice(0, 20) : null,
      additional_notes: input.additionalNotes ? (input.additionalNotes as string).trim().slice(0, 5000) : null,
      consent: true,
      status: "new",
    },
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Rate limiting by IP
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP.slice(0, 10)}...`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateInput(body);
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Add metadata
    const submissionData = {
      ...validation.sanitized,
      metadata: {
        submitted_at: new Date().toISOString(),
        user_agent: req.headers.get("user-agent")?.slice(0, 500) || null,
        origin: req.headers.get("origin") || null,
      },
    };

    // Insert into database
    const { data, error } = await supabase
      .from("rfq_submissions")
      .insert(submissionData)
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit request. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`RFQ submission created successfully: ${data.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Request submitted successfully",
        submissionId: data.id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

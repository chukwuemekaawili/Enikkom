// One-time admin creation script.
// Fill in SUPABASE_URL and SUPABASE_KEY from your .env before running.
// Run with: node create-admin.js
// Delete this file after use — do not commit credentials.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node create-admin.js <email> <password>');
  process.exit(1);
}

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Error creating user:', error.message);
    process.exit(1);
  }

  console.log('User created successfully. User ID:', data.user.id);
  process.exit(0);
}

createAdmin();

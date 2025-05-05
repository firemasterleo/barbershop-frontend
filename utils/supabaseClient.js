// utils/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and Anon key
const supabaseUrl = 'https://wmhpulllzyarvfatyfuw.supabase.co'  // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtaHB1bGxsenlhcnZmYXR5ZnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjcyODU5NiwiZXhwIjoyMDU4MzA0NTk2fQ.PY8wgMW8hx-hRAsnKr1wTXh3PqiMavav0ljB3SvnMps'  // Replace with your Supabase Anon key

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

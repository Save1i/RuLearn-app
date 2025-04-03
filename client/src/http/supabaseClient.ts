import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL или Anon Key не загружены! Проверьте .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

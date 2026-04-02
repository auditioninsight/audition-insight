import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://krkkpxqhcyymgulygkoy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtya2tweHFoY3l5bWd1bHlna295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjU4NDUsImV4cCI6MjA5MDY0MTg0NX0.NXpHhqFo_A1_2C2HYnnSX7JbFNgcy5gg9iMdiCC4N3k';

export const supabase = createClient(supabaseUrl, supabaseKey);
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://rdrawvjjxbhxdqthuyek.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcmF3dmpqeGJoeGRxdGh1eWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDAyMTAsImV4cCI6MjA5NjE3NjIxMH0.Wk84fXYWjrZwXr_igNHmnID7xfOBF-hGW5cyB9qju6s';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

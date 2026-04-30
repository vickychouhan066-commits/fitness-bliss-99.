import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          goal: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          goal: string;
          source?: string;
          created_at?: string;
        };
      };
      memberships: {
        Row: {
          id: string;
          user_id: string;
          plan_type: string;
          status: 'active' | 'expired' | 'pending';
          start_date: string;
          end_date: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_type: string;
          status?: 'active' | 'expired' | 'pending';
          start_date?: string;
          end_date: string;
        };
      };
    };
  };
};

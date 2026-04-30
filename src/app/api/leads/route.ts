import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
  try {
    const { name, phone, goal } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        { name, phone, goal, source: 'website_form' }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Lead captured successfully!' });
  } catch (error: any) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to capture lead' }, { status: 500 });
  }
}

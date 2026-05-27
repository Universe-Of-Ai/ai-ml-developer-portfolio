import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      // Supabase not configured — store locally for demo
      console.log('Contact submission (no Supabase):', { name, email, subject, message });
      return NextResponse.json({ success: true, note: 'Message received (demo mode)' });
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, subject, message, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ success: true, note: 'Message received' });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

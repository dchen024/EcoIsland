import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const body = await req.json();
    const { container_id, user_id } = body;

    if (!container_id || !user_id) {
      return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
    }

    const { data: container, error: containerError } = await supabase
      .from('containers')
      .select('*')
      .eq('id', container_id)
      .single();

    if (containerError || !container) {
      return NextResponse.json({ message: 'Container not found' }, { status: 404 });
    }

    const { error: insertError } = await supabase
      .from('container_transactions')
      .insert([{ container_id, user_id, status: 'returned' }]);

    if (insertError) {
      return NextResponse.json({ message: 'Error updating container transaction', error: insertError }, { status: 500 });
    }

    // Commenting out points reward
    /*
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', user_id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ message: 'Error fetching user profile', error: profileError }, { status: 500 });
    }

    const newPoints = profile.points + 100;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ points: newPoints })
      .eq('id', user_id);

    if (updateError) {
      return NextResponse.json({ message: 'Error updating user points', error: updateError }, { status: 500 });
    }
    */

    return NextResponse.json({ message: 'Transaction updated successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unexpected error occurred', error: error.message }, { status: 500 });
  }
}

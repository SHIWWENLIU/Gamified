import { supabase } from '@/app/lib/Supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = 'mock-user'
  const { data } = await supabase
    .from('user_badges')
    .select('id, badge_id, user_id')
    .eq('user_id', userId)

  return NextResponse.json({ badges: data || [] })
}

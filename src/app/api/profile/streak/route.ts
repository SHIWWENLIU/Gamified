import { getStreak } from '@/app/actions/gamify'
import { NextResponse } from 'next/server'

export async function GET() {
  const userId = 'mock-user'
  //data displayed on the multiple places, using cache to reduce wait times 
  const streak = await getStreak(userId)
  return NextResponse.json({ streak })
}

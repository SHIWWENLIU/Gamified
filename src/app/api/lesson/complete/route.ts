import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/Supabase'
import { updateStreak } from '@/app/actions/gamify'

const BADGE_RULES = [
  { streak: 1, badgeId: 'badge-streak-1', name: '1 Day Streak' },
  { streak: 7, badgeId: 'badge-streak-7', name: '7 Days Streak' },
]


export async function POST() {
  // mock user
  const userId = 'mock-user'
  const newStreak = await updateStreak(userId)

  // query all badges
  const { data: ownedBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const ownedBadgeIds = new Set((ownedBadges || []).map(b => b.badge_id))

  
  const newBadgesToGrant = BADGE_RULES.filter(rule =>
    newStreak === rule.streak && !ownedBadgeIds.has(rule.badgeId)
  )

  // batch insert
  let grantedBadgeNames: string[] = []
  if (newBadgesToGrant.length > 0) {
    const inserts = newBadgesToGrant.map(rule => ({
      user_id: userId,
      badge_id: rule.badgeId,
    }))
    await supabase.from('user_badges').insert(inserts)
    grantedBadgeNames = newBadgesToGrant.map(rule => rule.name)
  }

  return NextResponse.json({ success: true, streak: newStreak, badges: grantedBadgeNames })
}


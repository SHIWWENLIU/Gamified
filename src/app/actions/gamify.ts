import { supabase } from '../lib/Supabase'
import { redis } from '../lib/redis'
import { isToday, isYesterday, parseISO } from 'date-fns'

const STREAK_KEY = (userId: string) => `streak:${userId}`

export async function getStreak(userId: string): Promise<number> {
  // Try get from redis cache first
  const cached = await redis.get<number>(STREAK_KEY(userId))
  if (cached !== null && typeof cached === 'number') {
    return cached
  }

  const { data } = await supabase
    .from('users')
    .select('streak')
    .eq('id', userId)
    .single()

  const streak = data?.streak || 0
  await redis.set(STREAK_KEY(userId), streak, { ex: 900 })
  return streak
}

export async function updateStreak(userId: string): Promise<number> {
  const today = new Date()
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (!user) throw new Error('User not found')

  const lastActive = user.last_active ? parseISO(user.last_active) : null
  let newStreak = 1

  if (lastActive) {
    if (isToday(lastActive)) {
      await redis.set(STREAK_KEY(userId), user.streak, { ex: 900 })
      return user.streak 
    } else if (isYesterday(lastActive)) {
      newStreak = user.streak + 1
    }
  }

  await supabase.from('users').update({
    streak: newStreak,
    last_active: today.toISOString().slice(0, 10),
  }).eq('id', userId)

  await redis.set(STREAK_KEY(userId), newStreak, { ex: 900 })

  return newStreak
}

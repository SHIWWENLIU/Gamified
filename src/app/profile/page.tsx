'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserBadge {
  id: number
  badge_id: string
  user_id: string
}

export default function ProfilePage() {
  const [streak, setStreak] = useState<number>(0)
  const [badges, setBadges] = useState<UserBadge[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchProfile() {
      const resStreak = await fetch('/api/profile/streak')
      const dataStreak = await resStreak.json()
      setStreak(dataStreak.streak || 0)

      const resBadges = await fetch('/api/profile/badge')
      const dataBadges = await resBadges.json()
      setBadges(dataBadges.badges || [])

      setLoading(false)
    }
    fetchProfile()
  }, [])

  if (loading) return <div>Loading profile...</div>

  return (
    <div>
      <h1>Profile</h1>
      <div style={{ marginBottom: 24 }}>
        <strong>Current streak:</strong> {streak} day{streak === 1 ? '' : 's'}
      </div>
      <div>
        <strong>Badges:</strong>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
          {badges.length === 0 ? (
            <span>No badges yet.</span>
          ) : (
            badges.map((badge) => (
              <div key={badge.id} style={{ textAlign: 'center' }}>
                <div>{badge.badge_id}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <button onClick={() => router.push('/')}>
        Back to Home
        </button>
      <button onClick={() => router.push('/lesson')} style={{ marginLeft: 16 }}>
        Start a Lesson
      </button>
    </div>
  )
}

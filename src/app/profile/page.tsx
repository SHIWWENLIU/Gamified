'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Box, Paper, Typography, Stack, Chip, Divider } from '@mui/material'
import RouteButtons from '../components/RouteButton'

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
    <Box maxWidth={600} mx="auto" mt={6}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h5">Your Profile</Typography>
            <Stack direction="row" spacing={2} alignItems="center" mt={1}>
              <Chip label={`Streak: ${streak ?? 0} days`} color="primary" sx={{ fontSize: 16, height: 36 }} />
              <Chip label={`Badges: ${badges.length}`} color="success" sx={{ fontSize: 16, height: 36 }} />
            </Stack>
          </Box>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>Badges</Typography>
        {badges.length === 0 && <Typography variant="body1">No badges earned yet. Keep learning!</Typography>}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {badges.map((badge, idx) => (
            <Chip
              key={badge.id || idx}
              label={badge.badge_id}
              color="warning"
              sx={{ mb: 1, fontSize: 15 }}
            />
          ))}
        </Stack>
        <Divider sx={{ my: 3 }} />
        <RouteButtons
        routes={[
          { label: 'Back to Home', to: '/', variant: 'outlined' },
          { label: 'Start a Lesson', to: '/lesson', variant: 'contained' }
        ]}
      />
      </Paper>
    </Box>
  )
}

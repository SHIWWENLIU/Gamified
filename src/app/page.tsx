'use client'
import { Box, Paper, Typography, Stack } from '@mui/material'
import RouteButtons from './components/RouteButton'

export default function HomePage() {


  return (
    <Box maxWidth={1200} mx="auto" mt={6}>
    <Paper elevation={4} sx={{ p: 4 }}>
      <Stack alignItems="center" spacing={3}>
        <Typography variant="h4" fontWeight={600}>
          Welcome to the Gamified Learning Platform
        </Typography>
        <RouteButtons
          routes={[
            { label: 'Start a Lesson', to: '/lesson', variant: 'outlined' },
            { label: 'View My Profile', to: '/profile', variant: 'outlined' }
          ]}
        />
      </Stack>
    </Paper>
  </Box>
  )
}

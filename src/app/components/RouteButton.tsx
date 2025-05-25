'use client'
import { useRouter } from 'next/navigation'
import { Stack, Button } from '@mui/material'

export interface RouteButton {
  label: string
  to: string
  variant?: 'outlined' | 'contained'
}

export default function RouteButtons({ routes }: { routes: RouteButton[] }) {
  const router = useRouter()
  return (
    <Stack direction="row" spacing={2}>
      {routes.map(({ label, to, variant = 'outlined' }, idx) => (
        <Button key={to + idx} variant={variant} onClick={() => router.push(to)}>
          {label}
        </Button>
      ))}
    </Stack>
  )
}

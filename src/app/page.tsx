'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div>
      <h1>Welcome to Gamified Learning Platform</h1>
      <button onClick={() => router.push('/profile')}>
        Go to Profile
        </button>
      <button onClick={() => router.push('/lesson')} style={{ marginLeft: 16 }}>
        Start a Lesson
      </button>
    </div>
  )
}

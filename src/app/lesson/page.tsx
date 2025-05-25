'use client'

import { useState, useEffect } from 'react'
import { QuestionBackend } from '../schemas/types'
import {
  Box, Button, Typography, Radio, RadioGroup,
  FormControlLabel, FormControl, Paper, Stack
} from '@mui/material'
import RouteButtons from '../components/RouteButton'

export default function LessonPage() {
  const [questions, setQuestions] = useState<QuestionBackend[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [badge, setBadge] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  
  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(resp => {
        if (Array.isArray(resp.data)) {
          setQuestions(resp.data)
        }
      })
  }, [])

  const handleSubmit = async () => {
    const currentQuestion = questions[currentIndex]
    if (selected === currentQuestion.correct_index) {
      setFeedback('Correct!')
      const res = await fetch('/api/lesson/complete', { method: 'POST' })
      const data = await res.json()
      setDone(true)
      if (data.badge) {
        setBadge(data.badge)
      }
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1)
        setSelected(null)
        setFeedback(null)
      } else {
        setDone(true)
      }
    } else {
      setFeedback('Incorrect.')
    }
  }

  if (questions && questions.length === 0) return <p>Loading...</p>

  const q = questions[currentIndex]

  return (
  <Box maxWidth={600} mx="auto" mt={6}>
  {q ? (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>The Lesson</Typography>
      <Typography variant="subtitle1" gutterBottom>{q.question}</Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup
          name="answers"
          value={selected}
          onChange={(_, value) => setSelected(Number(value))}
        >
          {[q.answer_1, q.answer_2, q.answer_3, q.answer_4].map((ans, idx) => (
            <FormControlLabel
              key={idx}
              value={idx}
              control={<Radio />}
              label={ans}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Stack direction="row" mb={2}>
        <Button variant="contained" onClick={handleSubmit} disabled={selected === null}>
          Submit
        </Button>
        </Stack>
        <RouteButtons
          routes={[
            { label: 'Back to Home', to: '/', variant: 'outlined' },
            { label: 'Go to Profile', to: '/profile', variant: 'outlined' }
          ]}
        />
      {feedback && <Typography sx={{ mt: 2 }}>{feedback}</Typography>}
      {done && <Typography sx={{ mt: 2 }}>Completed! Streak updated.</Typography>}
      {badge && <Typography sx={{ mt: 2 }}>Got new badge: {badge}</Typography>}
    </Paper>
  ) : (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography>No lesson.</Typography>
          <RouteButtons
            routes={[
              { label: 'Back to Home', to: '/', variant: 'outlined' },
              { label: 'Go to Profile', to: '/profile', variant: 'outlined' }
            ]}
          />
        </Paper>
  )}
</Box>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { fetchQuestions } from '../actions/fetchQuestions'
import { QuestionBackend } from '../schemas/types'
import { useRouter } from 'next/navigation'

export default function LessonPage() {
  const [questions, setQuestions] = useState<QuestionBackend[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [badge, setBadge] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    fetchQuestions().then((qs) => {
      if (qs) setQuestions(qs)
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

  if (questions.length === 0) return <p>Loading...</p>

  const q = questions[currentIndex]

  return (
    <div>
      <h1>The Lesson</h1>
      <p>{q.question}</p>
      <ol type="A">
        {[q.answer_1, q.answer_2, q.answer_3, q.answer_4].map((ans, idx) => (
          <li key={idx}>
            <label>
              <input
                type="radio"
                name="answer"
                checked={selected === idx}
                onChange={() => setSelected(idx)}
              />
              {ans}
            </label>
          </li>
        ))}
      </ol>

      <button onClick={handleSubmit} disabled={selected === null}>
        Submit
      </button>

      {feedback && <p>{feedback}</p>}
      {done && <p>Completed! Streak updated.</p>}
      {badge && <p>Got new badge: {badge}</p>}
        <br/>
      <button onClick={() => router.push('/')} style={{ marginTop: 20 }}>
        Back to Home
        </button>
      <button onClick={() => router.push('/profile')} style={{ marginLeft: 16 }}>
        Go to Profile
      </button>
    </div>
  )
}

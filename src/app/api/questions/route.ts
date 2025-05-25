import { getQuestions } from '@/app/actions/questions'
import { NextResponse } from 'next/server'

export async function GET() {
  const questions = await getQuestions()
  return NextResponse.json({ data: questions })
}

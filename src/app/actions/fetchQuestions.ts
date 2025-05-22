import { supabase } from '../lib/Supabase'
import { QuestionBackend } from '../schemas/types'

export async function fetchQuestions(): Promise<QuestionBackend[] | null> {
  const { data, error } = await supabase.from("questions").select("*");
  if (error) {
    return null;
  }
  return data as QuestionBackend[];
} 
import { supabase } from "../lib/supabase"
import { QuestionBackend } from "../schemas/types"

export async function getQuestions(): Promise<QuestionBackend[]>{
  const {data} =  await supabase.from('questions').select('*')
  return (data as QuestionBackend[]) || []
}
'use client';
import { useEffect, useState } from "react";
import { fetchQuestions } from '../actions/fetchQuestions';
import { QuestionBackend } from '../schemas/types';

const SupabaseComp: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionBackend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchQuestions();
      console.log(`data: ${JSON.stringify(data, null, 2)}`);
      setQuestions(data || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      
      {error && <p>{error}</p>}
      
      {!loading && !error && (
        questions && questions.length > 0 ? (
          <div>
            {questions.map((question) => (
              <div key={question.id}>
                <h3>Question: {question.question}</h3>
                
                <div>
                  <p>Options:</p>
                  
                  <div>
                    A: {question.answer_1}
                  </div>
                  
                  <div>
                    B: {question.answer_2}
                  </div>
                  
                  <div>
                    C: {question.answer_3}
                  </div>
                  
                  <div>
                    D: {question.answer_4}
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No questions available</p>
          </div>
        )
      )}
    </div>
  );
};

export default SupabaseComp; 
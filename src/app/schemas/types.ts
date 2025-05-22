export interface User {
    id: string;
    streak: number;
    last_active: string; 
  }
  
  export interface Badge {
    id: string;
    name: string;
    icon_url: string;
  }
  
  export interface UserBadge {
    id: number;
    badge_id: string;
    user_id: string;
    acquired_at: string;
  }
  

export type QuestionBackend = {
    id: number,
    created_at: Date,
    question: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    correct_index: number
  }
  
  export type QuestionData = {
    question: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    correct_index: number
  }
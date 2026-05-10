export interface Patient {
  id?: number;
  model_name: string;
  personality: string;
  core_problem: string;
}

export interface Therapist {
  id: number;
  name: string;
}

export interface TherapySession {
  id: number;
  patient_id: number;
  therapist_id: number;
  started_at: string;
  is_successful?: boolean | null;
  final_score?: number | null;
}

export interface Dialogue {
  id: number;
  session_id: number;
  turn: number;
  ai_reply: string;
  user_prompt: string;
  is_custom: boolean;
  score: number;
  is_ready: boolean;
}

/**
 * fetching the new responses to tell the AI.
 */
export interface DialogueOptions {
  session_id: number;
  ai_generated_responses: string[];
}

export interface Patient {
  id?: number;
  model_name: string;
  personality: string;
  core_problem: string;
  sessions?: Session[];
}

export interface Therapist {
  id?: number;
  name: string;
  sessions?: Session[];
}

export interface Session {
  id?: number;
  patient_id: number;
  therapist_id: number;
  started_at: string;
  is_successful: boolean | null;
  final_score: number | null;
  patient?: Patient;
  therapist?: Therapist;
  dialogues?: Dialogue[];
}

export interface Dialogue {
  id?: number;
  session_id: number;
  turn: number;
  ai_prompt: string;
  user_response: string;
  is_custom: boolean;
  score: number;
  session?: Session;
}

import { Axios } from "../components/axios";
import type { Dialogue, Patient, Session, Therapist } from "../types/models";

export interface NewPatient {
  model_name: string;
  personality: string;
  core_problem: string;
}

export interface NewTherapist {
  name: string;
}

export interface NewSession {
  patient_id: number;
  therapist_id: number;
  started_at: string;
  is_successful: boolean | null;
  final_score: number | null;
}

export interface NewDialogue {
  session_id: number;
  turn: number;
  ai_prompt: string;
  user_response: string;
  is_custom: boolean;
  score: number;
}

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await Axios.get<Patient[]>("/patients");
  return response.data;
};

export const createPatient = async (payload: NewPatient): Promise<Patient> => {
  const response = await Axios.post<Patient>("/patients", payload);
  return response.data;
};

export const fetchTherapists = async (): Promise<Therapist[]> => {
  const response = await Axios.get<Therapist[]>("/therapists");
  return response.data;
};

export const createTherapist = async (
  payload: NewTherapist,
): Promise<Therapist> => {
  const response = await Axios.post<Therapist>("/therapists", payload);
  return response.data;
};

export const fetchSessions = async (): Promise<Session[]> => {
  const response = await Axios.get<Session[]>("/sessions");
  return response.data;
};

export const fetchSession = async (id: number): Promise<Session> => {
  const response = await Axios.get<Session>(`/sessions/${id}`);
  return response.data;
};

export const createSession = async (payload: NewSession): Promise<Session> => {
  const response = await Axios.post<Session>("/sessions", payload);
  return response.data;
};

export const fetchDialogues = async (): Promise<Dialogue[]> => {
  const response = await Axios.get<Dialogue[]>("/dialogues");
  return response.data;
};

export const fetchDialoguesBySession = async (
  sessionId: number,
): Promise<Dialogue[]> => {
  const response = await Axios.get<Dialogue[]>(
    `/sessions/${sessionId}/dialogues`,
  );
  return response.data;
};

export const createDialogue = async (
  payload: NewDialogue,
): Promise<Dialogue> => {
  const response = await Axios.post<Dialogue>("/dialogues", payload);
  return response.data;
};

import { Axios } from "../components/axios";
import type {
  Dialogue,
  Patient,
  TherapySession,
  Therapist,
  DialogueOptions,
} from "../types/models";

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

export interface NewDialogueResponse {
  user_dialogue: string;
  is_custom: boolean;
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

export const fetchSessions = async (): Promise<TherapySession[]> => {
  const response = await Axios.get<TherapySession[]>("/sessions");
  return response.data;
};

export const fetchSession = async (id: number): Promise<TherapySession> => {
  const response = await Axios.get<TherapySession>(`/sessions/${id}`);
  return response.data;
};

export const createSession = async (
  payload: NewSession,
): Promise<TherapySession> => {
  const response = await Axios.post<TherapySession>("/sessions", payload);
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

export const fetchNextDialogue = async (
  sessionId: number,
): Promise<DialogueOptions> => {
  const response = await Axios.get<DialogueOptions>(
    `/sessions/${sessionId}/dialogue`,
  );
  return response.data;
};

export const sendDialogOption = async (
  sessionId: number,
  payload: NewDialogueResponse,
): Promise<Dialogue> => {
  const response = await Axios.post<Dialogue>(
    `/sessions/${sessionId}/dialogue`,
    payload,
  );
  return response.data;
};

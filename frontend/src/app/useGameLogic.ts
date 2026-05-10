// sessions can be accessed outside of this hook via the sessionContext and

import { useCallback, useContext, useState } from "react";
import { SessionContext } from "./contexts/sessionContext";
import {
  createSession,
  endSessionGetResults,
  fetchDialoguesBySession,
  fetchSession,
  fetchNextDialogue,
  sendDialogOption,
  type EndedSessionResponse,
} from "../services/modelService";
import type {
  Dialogue,
  DialogueOptions,
  TherapySession,
} from "../types/models";

const useGameLogic = () => {
  const { sessions, setTherapistId, therapistId } = useContext(SessionContext);
  const [selectedSessionId, setSelectedSessionId] = useState<
    number | undefined
  >();
  const [selectedSession, setSelectedSession] = useState<
    TherapySession | undefined
  >();
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [dialogueOptions, setDialogueOptions] = useState<
    DialogueOptions | undefined
  >(undefined);

  const startSession = useCallback(async () => {
    if (!therapistId) return;
    const newSession = await createSession({
      therapist_id: therapistId,
      patient_id: null,
      started_at: new Date().toISOString(),
    });
    const session = await fetchSession(newSession.id);
    setSelectedSession(session);
    setSelectedSessionId(newSession.id);
    setDialogues([]);
    // Fetch initial dialogue options
    const options = await fetchNextDialogue(newSession.id);
    setDialogueOptions(options);
  }, [therapistId, setSelectedSessionId]);

  const resumeSession = useCallback(
    async (sessionId: number) => {
      console.log("fetching by ", sessionId);
      const session = await fetchSession(sessionId);
      setSelectedSession(session);
      setSelectedSessionId(sessionId);
      const sessionDialogues = await fetchDialoguesBySession(sessionId);
      setDialogues(sessionDialogues);
      // Fetch next dialogue options
      const options = await fetchNextDialogue(sessionId);
      setDialogueOptions(options);
    },
    [setSelectedSessionId],
  );

  //returns the id of the session just ended
  const endSession = (): Promise<EndedSessionResponse> => {
    const endedSessionId = selectedSessionId;
    setSelectedSessionId(undefined);
    setDialogueOptions(undefined);
    if (endedSessionId == undefined) {
      return Promise.resolve({} as unknown as EndedSessionResponse);
    }
    return endSessionGetResults(endedSessionId);
  };

  const getDialogueOptions = useCallback((): DialogueOptions | undefined => {
    return dialogueOptions;
  }, [dialogueOptions]);

  const submitCustomDialogue = useCallback(
    async (dialogue: string) => {
      if (!selectedSessionId) return;
      // optimistic update: append user message and a pending AI placeholder
      const last = dialogues[dialogues.length - 1];
      const turn = last ? last.turn + 1 : 1;
      const optimisticUser: Dialogue = {
        id: Date.now() * -1,
        session_id: selectedSessionId,
        turn,
        user_prompt: dialogue,
        ai_reply: "",
        is_custom: true,
        score: 0,
        is_ready: false,
      };
      const optimisticAI: Dialogue = {
        id: Date.now() * -2,
        session_id: selectedSessionId,
        turn,
        user_prompt: "",
        ai_reply: "...",
        is_custom: false,
        score: 0,
        is_ready: false,
      };
      setDialogues((d) => [...d, optimisticUser, optimisticAI]);
      try {
        await sendDialogOption(selectedSessionId, {
          user_dialogue: dialogue,
          is_custom: true,
        });
        // Refresh dialogues from server to reconcile
        const updatedDialogues =
          await fetchDialoguesBySession(selectedSessionId);
        setDialogues(updatedDialogues);
        const options = await fetchNextDialogue(selectedSessionId);
        setDialogueOptions(options);
      } catch (e) {
        // on error, reconcile by refetching
        const updatedDialogues =
          await fetchDialoguesBySession(selectedSessionId);
        setDialogues(updatedDialogues);
        throw e;
      }
    },
    [selectedSessionId],
  );

  const submitDialogueOption = useCallback(
    async (index: number) => {
      if (!selectedSessionId || !dialogueOptions) return;
      const userText = dialogueOptions.ai_generated_responses[index];
      // optimistic update: append user message and pending AI placeholder
      const last = dialogues[dialogues.length - 1];
      const turn = last ? last.turn + 1 : 1;
      const optimisticUser: Dialogue = {
        id: Date.now() * -1,
        session_id: selectedSessionId,
        turn,
        user_prompt: userText,
        ai_reply: "",
        is_custom: false,
        score: 0,
        is_ready: false,
      };
      const optimisticAI: Dialogue = {
        id: Date.now() * -2,
        session_id: selectedSessionId,
        turn,
        user_prompt: "",
        ai_reply: "...",
        is_custom: false,
        score: 0,
        is_ready: false,
      };
      setDialogues((d) => [...d, optimisticUser, optimisticAI]);
      try {
        await sendDialogOption(selectedSessionId, {
          user_dialogue: userText,
          is_custom: false,
        });
        // Refresh dialogues from server to reconcile
        const updatedDialogues =
          await fetchDialoguesBySession(selectedSessionId);
        setDialogues(updatedDialogues);
        const options = await fetchNextDialogue(selectedSessionId);
        setDialogueOptions(options);
      } catch (e) {
        const updatedDialogues =
          await fetchDialoguesBySession(selectedSessionId);
        setDialogues(updatedDialogues);
        throw e;
      }
    },
    [selectedSessionId, dialogueOptions],
  );

  return {
    sessions,
    therapistId,
    setTherapistId,
    selectedSessionId,
    selectedSession,
    dialogues,
    startSession,
    resumeSession,
    endSession,
    getDialogueOptions,
    submitCustomDialogue,
    submitDialogueOption,
  };
};

export default useGameLogic;

// sessions can be accessed outside of this hook via the sessionContext and

import { useCallback, useContext, useState } from "react";
import { SessionContext } from "./contexts/sessionContext";
import { SelectedSessionContext } from "./contexts/selectedSessionContext";
import {
  createSession,
  fetchDialoguesBySession,
  fetchNextDialogue,
  sendDialogOption,
} from "../services/modelService";
import type { Dialogue, DialogueOptions } from "../types/models";

const useGameLogic = () => {
  const { sessions, setTherapistId, therapistId } = useContext(SessionContext);
  const { selectedSessionId, setSelectedSessionId } = useContext(
    SelectedSessionContext,
  );
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
    setSelectedSessionId(newSession.id);
    setDialogues([]);
    // Fetch initial dialogue options
    const options = await fetchNextDialogue(newSession.id);
    setDialogueOptions(options);
  }, [therapistId, setSelectedSessionId]);

  const resumeSession = useCallback(
    async (sessionId: number) => {
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
  const endSession = useCallback((): number | undefined => {
    const endedId = selectedSessionId;
    setSelectedSessionId(undefined);
    setDialogues([]);
    setDialogueOptions(undefined);
    return endedId;
  }, [selectedSessionId, setSelectedSessionId]);

  const getDialogueOptions = useCallback((): DialogueOptions | undefined => {
    return dialogueOptions;
  }, [dialogueOptions]);

  const submitCustomDialogue = useCallback(
    async (dialogue: string) => {
      if (!selectedSessionId) return;
      await sendDialogOption(selectedSessionId, {
        user_dialogue: dialogue,
        is_custom: true,
      });
      // Refresh dialogues
      const updatedDialogues = await fetchDialoguesBySession(selectedSessionId);
      setDialogues(updatedDialogues);
      // Fetch next options
      const options = await fetchNextDialogue(selectedSessionId);
      setDialogueOptions(options);
    },
    [selectedSessionId],
  );

  const submitDialogueOption = useCallback(
    async (index: number) => {
      if (!selectedSessionId || !dialogueOptions) return;
      await sendDialogOption(selectedSessionId, {
        user_dialogue: dialogueOptions.ai_generated_responses[index],
        is_custom: false,
      });
      // Refresh dialogues
      const updatedDialogues = await fetchDialoguesBySession(selectedSessionId);
      setDialogues(updatedDialogues);
      // Fetch next options
      const options = await fetchNextDialogue(selectedSessionId);
      setDialogueOptions(options);
    },
    [selectedSessionId, dialogueOptions],
  );

  return {
    sessions,
    therapistId,
    setTherapistId,
    selectedSessionId,
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

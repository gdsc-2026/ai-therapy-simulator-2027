// sessions can be accessed outside of this hook via the sessionContext and

import { useContext } from "react";
import { SessionContext } from "./contexts/sessionContext";
import { SelectedSessionContext } from "./contexts/selectedSessionContext";
import { createTherapist } from "../services/modelService";
import type { DialogueOptions } from "../types/models";

const useGameLogic = () => {
  const { sessions, setTherapistId, therapistId } = useContext(SessionContext);
  const { selectedSessionId } = useContext(SelectedSessionContext);
  const startSession = () => {};

  const resumeSession = (sessionId: number) => {};
  //returns the id of the session just eneded
  const endSession = (): number => {};

  const getDialogueOptions = (): DialogueOptions => {};
  const submitCustomDialogue = (dialogue: string) => {};
  const submitDialogueOption = (index: number) => {};

  return (
    sessions,
    therapistId,
    setTherapistId,
    selectedSessionId,
    startSession,
    resumeSession,
    endSession,
    getDialogueOptions,
    submitCustomDialogue,
    submitDialogueOption
  );
};

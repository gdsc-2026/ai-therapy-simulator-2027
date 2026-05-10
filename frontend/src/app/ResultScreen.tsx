import { useEffect, useState } from "react";
import type { Dialogue, TherapySession } from "../types/models";
import Chats from "./Chats";
import { Box, Typography } from "@mui/material";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
export interface ResultScreenProps {
  currentSessionId: TherapySession;
  dialogue: Dialogue[];
  endSession: () => Promise<void>;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  currentSessionId,
  dialogue,
  endSession,
}) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(score + dialogue[dialogueIndex].score);
  }, [dialogueIndex]);

  const iterateIndex = () => {
    if (dialogueIndex + 1 >= dialogue.length) {
      setDialogueIndex(dialogueIndex + 1);
      setTimeout(iterateIndex, 1000);
    }
  };

  useEffect(() => {
    setTimeout(iterateIndex, 1000);
  });

  return (
    <Box>
      <Chats chatHistory={[dialogue[dialogueIndex]]} />
      <NumberFlowGroup>
        Score: <NumberFlow value={score} />
      </NumberFlowGroup>
    </Box>
  );
};

export default ResultScreen;

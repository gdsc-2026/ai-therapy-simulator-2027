import { useEffect, useState } from "react";
import type { Dialogue, TherapySession } from "../types/models";
import Chats from "./Chats";
import { Box, Button, Typography } from "@mui/material";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { type EndedSessionResponse } from "../services/modelService";
import ScreenButton from "../components/ScreenButton";
export interface ResultScreenProps {
  currentSessionId: TherapySession;
  dialogue: Dialogue[];
  endSession: () => Promise<EndedSessionResponse>;
  onClose: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  currentSessionId,
  dialogue,
  endSession,
  onClose,
}) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [results, setResults] = useState<EndedSessionResponse | undefined>(
    undefined,
  );

  useEffect(() => {
    setScore(score + dialogue[dialogueIndex].score);
  }, [dialogueIndex]);

  const iterateIndex = () => {
    if (dialogueIndex + 1 < dialogue.length) {
      setDialogueIndex(dialogueIndex + 1);
      setTimeout(iterateIndex, 1000);
    } else {
      endSession().then((r) => {
        setResults(r);
        setShowFinal(true);
      });
    }
  };

  useEffect(() => {
    setTimeout(iterateIndex, 1000);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!showFinal ? (
        <>
          <Chats chatHistory={[dialogue[dialogueIndex]]} />
          <NumberFlowGroup>
            Score: <NumberFlow value={score} />
          </NumberFlowGroup>
        </>
      ) : (
        <>
          <Box
            sx={{
              color: "#00e676",
              fontFamily: "monospace",
              fontSize: 18,
              opacity: 0.7,
            }}
          >
            <Typography>{results?.message}</Typography>
            <Typography>Final Score {results?.final_score}</Typography>
            <ScreenButton onClick={() => onClose()}>New Session</ScreenButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResultScreen;

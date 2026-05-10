import { useEffect, useState, useRef } from "react";
import type { Dialogue } from "../types/models";
import Chats from "./Chats";
import { Box, Typography } from "@mui/material";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { type EndedSessionResponse } from "../services/modelService";
import ScreenButton from "../components/ScreenButton";
export interface ResultScreenProps {
  currentSessionId: number | undefined;
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
  const timerRef = useRef<number | undefined>(undefined);
  const finishedRef = useRef(false);

  // Advance through dialogues at fixed intervals and accumulate score.
  const iterateIndex = () => {
    if (dialogue.length === 0) return;

    setDialogueIndex((prev) => {
      const next = prev + 1;
      if (next < dialogue.length) {
        setScore((s) => s + (dialogue[next]?.score ?? 0));
        timerRef.current = window.setTimeout(iterateIndex, 1000);
        return next;
      }

      // finished playback
      if (!finishedRef.current) {
        finishedRef.current = true;
        endSession().then((r) => {
          setResults(r);
          setShowFinal(true);
        });
      }
      return prev;
    });
  };

  useEffect(() => {
    if (dialogue.length === 0) return;
    // initialize with first dialogue's score
    setScore(dialogue[0]?.score ?? 0);
    timerRef.current = window.setTimeout(iterateIndex, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <ScreenButton
              onClick={() => {
                onClose();
              }}
              text='New Session'
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResultScreen;

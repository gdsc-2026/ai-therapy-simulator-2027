import { Box, Divider, Typography, Stack } from "@mui/material";
import Chats from "./Chats";
import ScreenButton from "../components/ScreenButton";
import type { Dialogue, TherapySession } from "../types/models";
import type { Screen } from "./Game";
export interface GameScreenProps {
  dialogues: Dialogue[];
  sessions: TherapySession[];
  selectedSession: TherapySession | undefined;
  selectedSessionId: number | undefined;
  startSession: () => void;
  resumeSession: (id: number) => void;
  setScreen: (value: React.SetStateAction<Screen>) => void;
  therapistId: number | undefined;
}

const GameScreen: React.FC<GameScreenProps> = ({
  dialogues,
  sessions,
  selectedSession,
  selectedSessionId,
  startSession,
  resumeSession,
  setScreen,
  therapistId,
}) => {
  const noActiveSessions = sessions.filter((s) => !s.final_score).length == 0;
  console.log(selectedSessionId, noActiveSessions);
  if (selectedSessionId == undefined) {
    return (
      <Box
        sx={{
          color: "#00e676",
          fontFamily: "monospace",
          fontSize: 18,
          opacity: 0.7,
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#00e676",
            fontFamily: "monospace",
            fontSize: 16,
          }}
        >
          Incoming Therapy Request
        </Typography>
        <Divider sx={{ borderColor: "#00e676", my: 1 }} />

        <Stack
          direction='row'
          spacing={10}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          {noActiveSessions ? (
            <ScreenButton
              text='Accept'
              onClick={() => {
                if (therapistId) startSession();
                else setScreen("create");
              }}
            />
          ) : (
            sessions
              .filter((s) => !s.final_score)
              .map((s) => (
                <ScreenButton
                  text='Resume Me!'
                  onClick={() => resumeSession(s.id)}
                />
              ))
          )}
        </Stack>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        color: "#00e676",
        fontFamily: "monospace",
        fontSize: 18,
        opacity: 0.7,
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#00e676",
          fontFamily: "monospace",
          fontSize: 16,
          mt: 0.5,
        }}
      >
        AI THERAPY SIMULATOR 2027
      </Typography>
      <Divider sx={{ borderColor: "#00e676", my: 1 }} />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Chats chatHistory={dialogues} session={selectedSession} />
      </Box>
    </Box>
  );
};

export default GameScreen;

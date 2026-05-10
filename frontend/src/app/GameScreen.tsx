import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ScreenButton from "../components/ScreenButton";
import Chats from "./Chats";
import useGameLogic from "./useGameLogic";

const GameScreen: React.FC = () => {
  const {
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
  } = useGameLogic();

  const [customResponse, setCustomResponse] = useState("");
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
          Start Session? :
        </Typography>
        <Divider sx={{ borderColor: "#00e676", my: 1 }} />

        <Stack direction="row" spacing={10} sx={{ mt: 2 }}>
          {noActiveSessions ? (
            <ScreenButton text="Yes" onClick={() => startSession()} />
          ) : (
            sessions
              .filter((s) => !s.final_score)
              .map((s) => (
                <ScreenButton
                  text="Resume Me!"
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
        color: "#00e676",
        fontFamily: "monospace",
        fontSize: 18,
        opacity: 0.7,
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
        GROK
      </Typography>
      <Divider sx={{ borderColor: "#00e676", my: "1rem" }} />
      <Chats chatHistory={dialogues} />
      <Divider sx={{ borderColor: "#00e676", my: 1 }} />
      {}
      <Stack direction="row" spacing={10} sx={{ mt: 2 }}>
        <ScreenButton text="Option 1" onClick={() => submitDialogueOption(0)} />
        <ScreenButton text="Option 2" onClick={() => submitDialogueOption(1)} />
        <ScreenButton text="Option 3" onClick={() => submitDialogueOption(2)} />
      </Stack>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Enter a custom response"
        sx={{
          "padding-top": "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#00e676",
            },
            "&:hover fieldset": {
              borderColor: "#00e676",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00e676",
            },
            input: {
              color: "#00e676",
              fontFamily: "monospace",
            },
          },
        }}
        value={customResponse}
        onChange={(e) => setCustomResponse(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitCustomDialogue(customResponse);
            setCustomResponse("");
          }
        }}
      />
    </Box>
  );
};

export default GameScreen;

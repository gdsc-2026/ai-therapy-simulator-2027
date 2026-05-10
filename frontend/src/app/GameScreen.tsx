import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ScreenButton from "../components/ScreenButton";
import Chats from "./Chats";

const GameScreen: React.FC = () => {
  const [chatHistory] = useState<string[]>([
    "Hello! I'm here to listen. How are you feeling today?",
    "I'm feeling okay, thanks. How are you feeling?",
    "I feel like a lol?",
    "Huhhhhhh?",
    "You are a bot.",
    "HUHHHHHH??"
  ]);

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(2px)",
          zIndex: 20,
          borderRadius: "4px",
          animation: "fadeIn 0.15s ease",
          "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
        }}
      />

      {/* Dialog box */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 21,
          width: 420,
          animation: "popIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
          "@keyframes popIn": {
            from: {
              opacity: 0,
              transform: "translate(-50%, -52%) scale(0.95)",
            },
            to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          },
        }}
      >
        {/* Dialog panel — flat screen surface, no bezel */}
        <Box
          sx={{
            borderRadius: "6px",
            background: "#0d1117",
            border: "1px solid rgba(0,230,118,0.15)",
            boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8)",
            overflow: "hidden",
            padding: "24px 28px 20px",
          }}
        >
          {/* Title bar */}
          <Box
    <Box sx={{ color: "#00e676", fontFamily: "monospace", fontSize: 18, opacity: 0.7 }}>
        <Typography sx={{ fontWeight: 'bold', color: "#00e676", fontFamily: "monospace", fontSize: 16 }}>
            GROK
        </Typography>
        <Divider sx={{ borderColor: "#00e676", my: 1 }} />
        <Chats chatHistory={chatHistory} />
        <Divider sx={{ borderColor: "#00e676", my: 1 }} />
        <Stack direction="row" spacing={10} sx={{ mt: 2 }}>
            <ScreenButton text="Option 1" />
            <ScreenButton text="Option 2" />
            <ScreenButton text="Option 3" />
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
        />
    </Box>
  );
}

export default GameScreen;
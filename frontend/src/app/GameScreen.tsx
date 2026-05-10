import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import Chats from "./Chats";

const GameScreen: React.FC = () => {
  const [chatHistory] = useState<string[]>([
    "Hello! I'm here to listen. How are you feeling today?",
    "I'm feeling okay, thanks. How are you feeling?",
    "I feel like a lol?",
    "Huhhhhhh?",
    "You are a bot.",
    "HUHHHHHH??",
  ]);

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
        }}
      >
        GROK
      </Typography>
      <Divider sx={{ borderColor: "#00e676", my: 1 }} />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Chats chatHistory={chatHistory} />
      </Box>
    </Box>
  );
};

export default GameScreen;

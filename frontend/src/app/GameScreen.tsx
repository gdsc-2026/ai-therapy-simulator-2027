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
import { Box, Typography, Divider } from "@mui/material";
import type { Dialogue } from "../types/models";

interface ChatsProps {
  chatHistory: Dialogue[];
}

const Chats: React.FC<ChatsProps> = ({ chatHistory }) => {
  return (
    <Box sx={{ height: "100%", overflowY: "auto", color: "#00e676", pr: 1 }}>
      {chatHistory.map((chat, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: "flex",
              justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                textAlign: index % 2 === 0 ? "right" : "left",
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
                {index % 2 === 0 ? "ME" : "GROK"}
              </Typography>
              <Typography
                sx={{ color: "#00e676", fontFamily: "monospace", fontSize: 14 }}
              >
                {chat}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderColor: "#007e41" }} />
        </Box>
      ))}
    </Box>
  );
};

export default Chats;

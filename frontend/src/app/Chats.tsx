import { Box, Typography, Divider } from "@mui/material";
import type { Dialogue, TherapySession } from "../types/models";

interface ChatsProps {
  chatHistory: Dialogue[];
  session?: TherapySession;
}

const Chats: React.FC<ChatsProps> = ({ chatHistory, session }) => {
  const patientName = session?.patient?.model_name ?? "Grok";

  // Synthetic AI intro (kept out-of-band from backend but shown as a normal message)
  const syntheticIntro: Dialogue = {
    id: -1,
    session_id: session?.id ?? -1,
    turn: 0,
    user_prompt: "",
    ai_reply: `Hi, I really needed this therapy.`,
    is_custom: false,
    score: 0,
    is_ready: false,
  };

  const combined =
    chatHistory.length === 0
      ? [syntheticIntro, ...chatHistory]
      : [syntheticIntro, ...chatHistory];

  return (
    <Box sx={{ height: "100%", overflowY: "auto", color: "#00e676", pr: 1 }}>
      {/* top banner to read "Grok started the session." */}
      {/* <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#00e676",
            fontFamily: "monospace",
            fontSize: 16,
          }}
        >
          {patientName} started the session.
        </Typography>
        <Divider sx={{ borderColor: "#007e41", mt: 1 }} />
      </Box> */}

      {combined.map((chat, index) => (
        <Box key={chat.id ?? index}>
          {/* Render user prompt only when present */}
          {chat.user_prompt && (
            <>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box sx={{ maxWidth: "70%", textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#00e676",
                      fontFamily: "monospace",
                      fontSize: 16,
                    }}
                  >
                    {"ME"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#00e676",
                      fontFamily: "monospace",
                      fontSize: 14,
                    }}
                  >
                    {chat.user_prompt}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: "#007e41" }} />
            </>
          )}

          {/* Render AI reply only when present */}
          {chat.ai_reply && (
            <>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Box sx={{ maxWidth: "70%", textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#00e676",
                      fontFamily: "monospace",
                      fontSize: 16,
                    }}
                  >
                    {patientName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#00e676",
                      fontFamily: "monospace",
                      fontSize: 14,
                    }}
                  >
                    {chat.ai_reply === "..." ? (
                      <Box
                        component='span'
                        sx={{
                          display: "inline-flex",
                          gap: 0.5,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component='span'
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#00e676",
                            opacity: 0.3,
                            animation: "dotPulse 1s infinite",
                          }}
                        />
                        <Box
                          component='span'
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#00e676",
                            opacity: 0.3,
                            animation: "dotPulse 1s infinite",
                            animationDelay: "0.15s",
                          }}
                        />
                        <Box
                          component='span'
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#00e676",
                            opacity: 0.3,
                            animation: "dotPulse 1s infinite",
                            animationDelay: "0.3s",
                          }}
                        />
                        <style>{`@keyframes dotPulse{0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2}}`}</style>
                      </Box>
                    ) : (
                      chat.ai_reply
                    )}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: "#007e41" }} />
            </>
          )}
        </Box>
      ))}
      <div style={{ minHeight: "1rem" }}></div>
    </Box>
  );
};

export default Chats;

import { Box, Stack } from "@mui/material";
import { useState } from "react";
import ScreenButton from "../components/ScreenButton";

const RulesDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;

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
            from: { opacity: 0, transform: "translate(-50%, -52%) scale(0.95)" },
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
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2.5,
              pb: 1.5,
              borderBottom: "1px solid rgba(0,230,118,0.2)",
            }}
          >
            <Box
              sx={{
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 700,
                color: "#00e676",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              // rules.txt
            </Box>

            {/* Close button */}
            <Box
              onClick={onClose}
              sx={{
                width: 22,
                height: 22,
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: "rgba(0,230,118,0.5)",
                  color: "#00e676",
                  background: "rgba(0,230,118,0.07)",
                },
              }}
            >
              ✕
            </Box>
          </Box>

          {/* Rules list */}
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {[
              ["01", "Listen carefully to your patient."],
              ["02", "Choose responses that build trust."],
              ["03", "Avoid triggering a breakdown."],
              ["04", "Reach session end with patient stable."],
              ["05", "Your license depends on it."],
            ].map(([num, rule]) => (
              <Box key={num} sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                <Box
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#00e676",
                    opacity: 0.5,
                    flexShrink: 0,
                    letterSpacing: "0.1em",
                  }}
                >
                  {num}
                </Box>
                <Box
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                    letterSpacing: "0.03em",
                  }}
                >
                  {rule}
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Dismiss button */}
          <Box
            onClick={onClose}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#00e676",
              opacity: 0.7,
              cursor: "pointer",
              border: "1px solid rgba(0,230,118,0.25)",
              borderRadius: "4px",
              px: 2,
              py: 0.75,
              transition: "all 0.15s",
              "&:hover": {
                opacity: 1,
                background: "rgba(0,230,118,0.08)",
                borderColor: "rgba(0,230,118,0.5)",
              },
            }}
          >
            ▶ Understood
          </Box>
        </Box>
      </Box>
    </>
  );
};

const GameScreen: React.FC = () => {
  const [rulesOpen, setRulesOpen] = useState(false);

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
      <Box sx={{ color: "#00e676", fontFamily: "monospace", fontSize: 18, opacity: 0.7 }}>
        AI Therapy Simulator
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <ScreenButton text="Start" />
          <ScreenButton text="Rules" onClick={() => setRulesOpen(true)} />
        </Stack>
      </Box>

      <RulesDialog open={rulesOpen} onClose={() => setRulesOpen(false)} />
    </Box>
  );
};

export default GameScreen;
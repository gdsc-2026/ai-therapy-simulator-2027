import { Box, TextField } from "@mui/material";
import grokIcon from "../assets/grokIcon.png";
import StartScreen from "./StartScreen";
import { useState } from "react";
import GameScreen from "./GameScreen";
import ScreenButton from "../components/ScreenButton";
type Screen = "home" | "start";

const Monitor: React.FC<{
  children?: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ children, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      {/* Outer bezel */}
      <Box
        sx={{
          position: "relative",
          width: 720,
          height: 460,
          borderRadius: "14px",
          background:
            "linear-gradient(160deg, #2e2e2e 0%, #1a1a1a 60%, #111 100%)",
          boxShadow: `
            0 0 0 1px #0a0a0a,
            0 2px 0 1px #3a3a3a inset,
            0 -1px 0 1px #0d0d0d inset,
            6px 0 0 0 #222 inset,
            -6px 0 0 0 #222 inset,
            0 30px 80px rgba(0,0,0,0.7),
            0 8px 24px rgba(0,0,0,0.5)
          `,
          // Top/sides: 18px — bottom: taller to hold the icon bar
          padding: "8px 8px 0px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top brand strip */}
        <Box
          sx={{
            position: "absolute",
            top: 7,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #333, #555, #333)",
          }}
        />

        {/* Screen surround (inner bezel lip) */}
        <Box
          sx={{
            flex: 1,
            borderRadius: "6px",
            background: "#0a0a0a",
            boxShadow: `
              0 0 0 1px #000,
              2px 2px 6px rgba(0,0,0,0.8) inset,
              -1px -1px 3px rgba(255,255,255,0.03) inset
            `,
            padding: "3px",
            boxSizing: "border-box",
          }}
        >
          {/* Screen glass */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "4px",
              background: "#0d1117",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* Screen glare overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "4px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />

            {/* Scanline texture */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "4px",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                zIndex: 9,
                pointerEvents: "none",
              }}
            />

            {/* ── Render screen content here ── */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "100%",
                display: "flex",
                paddingLeft: "auto",
                paddingRight: "auto",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>

        {/* ── Bottom icon bar ── */}
        <Box
          sx={{
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          {/* ── Place your icon here ── */}
          {icon ?? (
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                border: "1.5px dashed rgba(43, 0, 151, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.25)",
                fontSize: 10,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              icon
            </Box>
          )}
        </Box>

        {/* Power LED */}
        <Box
          sx={{
            position: "absolute",
            bottom: 14,
            right: 16,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#00e676",
            boxShadow: "0 0 6px 2px rgba(0,230,118,0.5)",
            animation: "ledPulse 3s ease-in-out infinite",
            "@keyframes ledPulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.4 },
            },
          }}
        />
      </Box>

      {/* Neck */}
      <Box
        sx={{
          width: 36,
          height: 40,
          background: "linear-gradient(180deg, #1e1e1e 0%, #252525 100%)",
          clipPath: "polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%)",
          boxShadow: "2px 0 4px rgba(0,0,0,0.4)",
        }}
      />

      {/* Base */}
      <Box
        sx={{
          position: "relative",
          width: 180,
          height: 14,
          borderRadius: "0 0 50px 50px",
          background: "linear-gradient(180deg, #252525 0%, #1a1a1a 100%)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 1px 0 #333 inset",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "10%",
            width: "80%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          },
        }}
      />
    </Box>
  );
};

const Game: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d0d 70%)",
        overscrollBehavior: "none",
        overflow: "hidden",
      }}
    >
      <Monitor
        icon={
          <img
            src={grokIcon}
            alt="icon"
            style={{ width: 0, height: 0, borderRadius: 6 }}
          />
        }
      >
        {screen === "home" && <GameScreen />}
        {screen === "start" && (
          <StartScreen onStart={() => setScreen("home")} />
        )}
      </Monitor>

      {screen === "home" && (
        <Box
          sx={{
            width: 720,
            maxWidth: "95vw",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "space-between",
            }}
          >
            <ScreenButton text="Option 1" />
            <ScreenButton text="Option 2" />
            <ScreenButton text="Option 3" />
          </Box>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter a custom response"
            sx={{
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
      )}
    </Box>
  );
};

export default Game;

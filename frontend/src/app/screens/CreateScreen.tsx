import { useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import ScreenButton from "../../components/ScreenButton";
import { createTherapist } from "../../services/modelService";
import { useCookies } from "react-cookie";

const CreateScreen: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [_, setCookie] = useCookies(["therapy"]);
  const [name, setName] = useState("");

  const setTherapist = () => {
    createTherapist({ name: name }).then((therapist) => {
      setCookie("therapy", JSON.stringify({ therapist_id: therapist.id }), {
        path: "/",
      });
      onSubmit();
      return therapist;
    });
  };

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
      <Box
        sx={{
          color: "#00e676",
          fontFamily: "monospace",
          fontSize: 18,
          opacity: 0.7,
        }}
      >
        Welcome new Therapist! What is your name?
        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
          <TextField
            variant='outlined'
            fullWidth
            placeholder='Enter a custom response'
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
            value={name}
            onChange={(e) => {
              if (e.target.value.length <= 30) setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") setTherapist();
            }}
          />
          <ScreenButton text='Submit' onClick={() => setTherapist()} />
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateScreen;

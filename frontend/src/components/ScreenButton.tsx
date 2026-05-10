import { Box, Button, Tooltip } from "@mui/material";

interface ScreenButtonProps {
  text: string;
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}

const ScreenButton: React.FC<ScreenButtonProps> = ({
  text,
  onClick,
  label,
  disabled,
}) => {
  return (
    <Tooltip title={label}>
      <Button
        disabled={disabled}
        variant="outlined"
        sx={{ color: "#00e676", borderColor: "#00e676" }}
        onClick={onClick}
      >
        <Box sx={{ fontFamily: "monospace", fontSize: 18 }}>{text}</Box>
      </Button>
    </Tooltip>
  );
};

export default ScreenButton;

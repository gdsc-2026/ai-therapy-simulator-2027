import { Box, Button } from "@mui/material";

interface ScreenButtonProps {
    text: string;
    onClick?: () => void;
}

const ScreenButton: React.FC<ScreenButtonProps> = ({ text, onClick }) => {
    return <Box>
        <Button variant="outlined" sx={{ color: "#00e676", borderColor: "#00e676" }} onClick={onClick}>
            <Box sx={{ fontFamily: "monospace", fontSize: 18 }}>
                {text}
            </Box>
        </Button>
    </Box>
}

export default ScreenButton;
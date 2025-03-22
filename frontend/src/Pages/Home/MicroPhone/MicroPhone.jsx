import {
  Box,
  Typography,
  IconButton,
  Tooltip,  
  Fade,
} from "@mui/material";
import { 
  Mic, 
  Stop, 
} from "@mui/icons-material";


const Microphone = ({startRecording,stopRecording,recording}) => {
    return ( 
        <>
            {/* Microphone Button */}
            <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  <Tooltip 
                    title={recording ? "Stop Recording" : "Start Recording"} 
                    placement="top"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <IconButton
                      onClick={recording ? stopRecording : startRecording}
                      sx={{
                        bgcolor: recording ? "rgba(244, 67, 54, 0.8)" : "rgba(76, 175, 80, 0.8)",
                        color: "white",
                        "&:hover": {
                          bgcolor: recording ? "#f44336" : "#4CAF50",
                          transform: "scale(1.05)",
                        },
                        width: 100,
                        height: 100,
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                      }}
                    >
                      {recording ? <Stop sx={{ fontSize: 40 }} /> : <Mic sx={{ fontSize: 40 }} />}
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body1" sx={{ color: "#E0E0E0", textAlign: "center" }}>
                    {recording ? "Recording in progress..." : "Click to start recording"}
                  </Typography>
                </Box>
        </>
    );
}
 
export default Microphone;
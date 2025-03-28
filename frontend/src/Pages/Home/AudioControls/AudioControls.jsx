import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Download, PlayArrow, Stop } from "@mui/icons-material";

const AudioControls = ({ audioBlob, uploadedFile, audioUrl }) => {
    
    useEffect(() => {   
        setAudio(null);
        setIsPlaying(false);
        setCurrentTime(0);
    }, [audioUrl]);

    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); 

    const downloadAudio = () => {
        const blob = audioBlob || uploadedFile;
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = audioBlob ? "accent_recording.mp3" : uploadedFile.name;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const playAudio = () => {
        let newAudio = audio;

        if (!newAudio) {
            newAudio = new Audio(audioUrl);
            setAudio(newAudio);
        }

        newAudio.currentTime = currentTime; 
        newAudio.play();
        setIsPlaying(true);

        newAudio.onended = () => {
            setIsPlaying(false);
            setCurrentTime(0); 
        };
    };

    const pauseAudio = () => {
        if (audio) {
            setCurrentTime(audio.currentTime); 
            audio.pause();
            setIsPlaying(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 3,
                mb: 2,
            }}
        >
            {isPlaying ? (
                <Button
                    variant="outlined"
                    startIcon={<Stop />}
                    onClick={pauseAudio} 
                    sx={{
                        borderRadius: 4,
                        borderColor: "#E0E0E0",
                        color: "#E0E0E0",
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,0.05)",
                            borderColor: "#fff",
                        },
                    }}
                >
                    Pause
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    startIcon={<PlayArrow />}
                    onClick={playAudio} 
                    sx={{
                        borderRadius: 4,
                        borderColor: "#E0E0E0",
                        color: "#E0E0E0",
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,0.05)",
                            borderColor: "#fff",
                        },
                    }}
                >
                    {currentTime > 0 ? "Resume" : "Play Recording"}
                </Button>
            )}

            <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={downloadAudio}
                sx={{
                    borderRadius: 4,
                    borderColor: "#E0E0E0",
                    color: "#E0E0E0",
                    "&:hover": {
                        bgcolor: "rgba(255,255,255,0.05)",
                        borderColor: "#fff",
                    },
                }}
            >
                Download
            </Button>
        </Box>
    );
};

export default AudioControls;

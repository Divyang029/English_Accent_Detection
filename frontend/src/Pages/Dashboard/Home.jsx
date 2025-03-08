import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Fade,
  useTheme,
} from "@mui/material";
import { 
  Mic, 
  Stop, 
  Upload, 
  Download, 
  PlayArrow,
  Language as LanguageIcon,
  ArrowForward as ArrowForwardIcon 
} from "@mui/icons-material";
import WorldMap from '../../Components/WorldMap.jsx';


const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [accentResult, setAccentResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const sampleText =
    "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood?";

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        analyzeAccent();
      };

      recorder.start();
      setRecording(true);
      setAccentResult(null);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access denied. Please allow microphone access to record.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setAudioBlob(null);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAccentResult(null);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const analyzeAccent = () => {
    setProcessing(true);
    setTimeout(() => {
      const accents = [
        "British English",
        "American English",
        "Australian English",
        "Indian English",
        "Scottish English",
      ];
      const randomAccent = accents[Math.floor(Math.random() * accents.length)];
      setAccentResult(randomAccent);
      setProcessing(false);
    }, 3000);
  };

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


  return (
 
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      flex: 1, // Take up remaining space
      overflowY: "auto", // Allow scrolling if content overflows
      bgcolor: "#1A1A1A", // Dark background
    }}>
   
      
   <Container maxWidth="lg">
        <Box
          sx={{
            
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 6,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2, 
                color: "#fff", 
                fontWeight: 700,
                textShadow: "0px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              Discover Your Accent
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                color: "#9E9E9E", 
                fontWeight: 400,
                maxWidth: "700px",
                mx: "auto"
              }}
            >
              Record your voice or upload an audio file to analyze your accent with our AI technology.
            </Typography>
          </Box>

          {/* Sample Reading Text */}
          <Card
            elevation={8}
            sx={{
              p: 0,
              mb: 5,
              bgcolor: "#212121",
              borderRadius: 2,
              textAlign: "center",
              maxWidth: "800px",
              width: "100%",
              borderLeft: "4px solid #4CAF50",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  color: "#4CAF50", 
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1
                }}
              >
                <LanguageIcon /> Sample Reading Text
              </Typography>
              <Divider sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "#E0E0E0", 
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  letterSpacing: 0.3
                }}
              >
                {sampleText}
              </Typography>
            </CardContent>
          </Card>

          {/* Recording and Upload Section */}
          <Card
            elevation={8}
            sx={{
              mb: 4,
              bgcolor: "#212121",
              borderRadius: 2,
              maxWidth: "800px",
              width: "100%",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: 4,
                  mb: 3,
                }}
              >
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

                <Typography variant="h6" sx={{ color: "#9E9E9E", display: { xs: "none", sm: "block" } }}>
                  OR
                </Typography>
                <Divider orientation="horizontal" sx={{ width: "100%", my: 2, display: { xs: "block", sm: "none" }, bgcolor: "rgba(255,255,255,0.1)" }} />

                {/* Upload File Button */}
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  alignItems: "center", 
                  gap: 2,
                  flex: 1
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />} // Add the upload icon
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 3,
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    fontWeight: 600, // Bold text
                    textTransform: "uppercase", // Uppercase text
                    letterSpacing: "0.05em", // Slightly spaced letters
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    "&:hover": {
                      bgcolor: "rgba(76, 175, 80, 0.1)",
                      borderColor: "#4CAF50",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Upload Audio
                  <input   type="file" style={{ display: "none" }}   accept="audio/*"  onChange={handleFileUpload} />
                </Button>
                {uploadedFile && (
                  <Typography variant="body2" sx={{ color: "#9E9E9E", textAlign: "center" }}>
                    {uploadedFile.name}
                  </Typography>
                )}
              </Box>
              </Box>

              {/* Audio Controls */}
              {audioUrl && (
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: 2, 
                    mt: 3,
                    mb: 2
                  }}
                >
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
                    Play Recording
                  </Button>
                  
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
              )}

              {/* Process Button */}
              {uploadedFile && !processing && !accentResult && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={analyzeAccent}
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: 8,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "#3d8b40",
                      },
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Analyze My Accent
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Processing and Results */}
          {processing && (
            <Card 
              elevation={8}
              sx={{ 
                width: "100%", 
                maxWidth: "800px", 
                bgcolor: "#212121",
                p: 4,
                borderRadius: 2
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress 
                  size={60} 
                  thickness={4} 
                  sx={{ color: "#4CAF50", mb: 3 }} 
                />
                <Typography variant="h6" sx={{ color: "#E0E0E0", mb: 1 }}>
                  Analyzing your accent...
                </Typography>
                <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
                  Our AI is processing your speech patterns
                </Typography>
                <LinearProgress 
                  sx={{ 
                    mt: 3, 
                    bgcolor: "rgba(255,255,255,0.1)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#4CAF50"
                    }
                  }} 
                />
              </Box>
            </Card>
          )}
          
          {accentResult && (
            <Card 
              elevation={16}
              sx={{ 
                p: 0, 
                mt: 3, 
                bgcolor: "#212121", 
                textAlign: "center", 
                maxWidth: "800px", 
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                animation: "fadeIn 0.6s ease-in-out",
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(20px)"
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)"
                  }
                }
              }}
            >
              <Box sx={{ 
                bgcolor: "rgba(76, 175, 80, 0.1)", 
                py: 2,
                borderBottom: "1px solid rgba(76, 175, 80, 0.3)"
              }}>
                <Typography variant="h6" sx={{ color: "#E0E0E0" }}>
                  Analysis Results 
                </Typography>
              </Box>
              
              <CardContent sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ mb: 3, color: "#9E9E9E" }}>
                  Based on your speech patterns, your accent is:
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: "#4CAF50", 
                    fontWeight: 700,
                    mb: 4,
                    textShadow: "0px 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  {accentResult}
                </Typography>
                
                <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
                
                <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#4CAF50",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#3d8b40",
                  },
                  borderRadius: 8,
                  px: 4,
                  py: 1.5,
                }}
                onClick={() => setAccentResult(null)} 
              >
                Try Another Recording
              </Button>
              </CardContent>
            </Card>
          )}
        </Box>
        {accentResult && (<WorldMap accentName="gujarati"/>)}

      </Container>

      
    </Box>
  );
};

export default Home;
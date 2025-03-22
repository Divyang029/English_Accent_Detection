import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { 
  ArrowForward as ArrowForwardIcon 
} from "@mui/icons-material";
import WorldMap from './ProcessingResult/WorldMap.jsx';
import HeaderText from "./HeaderText/HeaderText.jsx";
import SampleText from "./SampleText/SampleText.jsx";
import Microphone from "./MicroPhone/MicroPhone.jsx";
import UploadFile from "./UploadFile/UploadFile.jsx";
import AudioControls from "./AudioControls/AudioControls.jsx";
import Processing from "./ProcessingResult/Processing.jsx";
import Result from "./ProcessingResult/Result.jsx";

 
const Home = () => {

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [accentResult, setAccentResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

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

      // Automatically stop after 10 seconds
      setTimeout(() => {
        recorder.stop();
        setRecording(false);
    }, 10000); // 10,000ms = 10 seconds

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
      const url = URL.createObjectURL(file);
      const audio = new Audio();
      audio.src = url;

      audio.onloadedmetadata = () => {
        const duration = audio.duration; // Audio duration in seconds
        console.log("Audio Duration:", duration);
  
        if (duration > 10000) { // Example: Limit audio length to 60 seconds
          alert("Please upload an audio file less than 60 seconds.");
          return;
        }
  
        setUploadedFile(file);
        setAudioBlob(null);
        setAudioUrl(url);
        setAccentResult(null);
      };
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const analyzeAccent = () => {
    setProcessing(true);
    setTimeout(() => {
      const accents = [
        "Ghanaian English",  //1
        "Indian English",  //18
        "Philippine English",  //34
        "Gulf English", //35
        "French English", //47
      ];
      const randomAccent = accents[Math.floor(Math.random() * accents.length)];
      setAccentResult(randomAccent);
      setProcessing(false);
    }, 3000);
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

          {/* Header Text */}
          <HeaderText/>

          {/* Sample Reading Text */}
          <SampleText/>

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
                <Microphone startRecording={startRecording} stopRecording={stopRecording} recording={recording}/>

                <Typography variant="h6" sx={{ color: "#9E9E9E", display: { xs: "none", sm: "block" } }}>
                  OR
                </Typography>
                <Divider orientation="horizontal" sx={{ width: "100%", my: 2, display: { xs: "block", sm: "none" }, bgcolor: "rgba(255,255,255,0.1)" }} />

                {/* Upload File Button */}
                <UploadFile handleFileUpload={handleFileUpload} uploadedFile={uploadedFile} />

              </Box>

              {/* Audio Controls */}
              {audioUrl && (<AudioControls audioBlob={audioBlob} uploadedFile={uploadedFile} audioUrl={audioUrl}/>)}

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
          {processing && (<Processing/>)}
 
          {accentResult && (<Result setAccentResult={setAccentResult} accentResult={accentResult}/>)}
        </Box>

        {accentResult && (<WorldMap accentName={accentResult}/>)}
      </Container>
    </Box>
  );
};

export default Home;
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import WorldMap from './ProcessingResult/WorldMap.jsx';
import HeaderText from "./HeaderText/HeaderText.jsx";
import SampleText from "./SampleText/SampleText.jsx";
import Microphone from "./MicroPhone/MicroPhone.jsx";
import UploadFile from "./UploadFile/UploadFile.jsx";
import AudioControls from "./AudioControls/AudioControls.jsx";
import Processing from "./ProcessingResult/Processing.jsx";
import Result from "./ProcessingResult/Result.jsx";
import AccentAnalysisComponent from "./AccentAnalysis/AccentAnalysisMain.jsx";
import AccentSelector from "./AccentSelector/AccentSelector.jsx";

const Home = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [accentResult, setAccentResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [selectedList, setSelectedList] = useState(0);
  const [userSelectedAccent, setUserSelectedAccent] = useState(null);
  const [accentLists, setAccentLists] = useState([]);

    const analyzeAccent = async (blobfile = null) => {
    setProcessing(true);

    let currentList, topAccent;
    setSelectedList(0);
    
    let voiceFile;
    const modelformData = new FormData();

    try {
      if (blobfile) {
        voiceFile = blobfile;
        modelformData.append('file', voiceFile, "recording.mp3");
      } else if (uploadedFile) {
        voiceFile = uploadedFile;
        modelformData.append('file', voiceFile);
      } else {
        throw new Error("No voice file available. Please record or upload an audio file.");
      }
    } catch (error) {
      console.error('Error while getting voicefiles:', error);
      setProcessing(false);
      alert("Error processing audio file: " + error.message);
      return;
    }

    try {
      const MODEL_API_URL = import.meta.env.VITE_MODEL_API_BASE_URL;
      if (!MODEL_API_URL) {
        throw new Error("Model API URL is not configured");
      }
      
      const modelurl = `${MODEL_API_URL}/v1/predict`;
      const options = {
        method: 'POST',
        headers: {},
        body: modelformData
      };

      const response = await fetch(modelurl, options);
      
      if (!response.ok) {
        let errorMessage = `Model API request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          console.error("Error details:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Error response couldn't be parsed:", response.statusText);
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      
      if (!result.accent_scores || !Array.isArray(result.accent_scores) || result.accent_scores.length === 0) {
        throw new Error("Invalid response format: missing accent scores");
      }
      
      currentList = [...result.accent_scores]; 
      currentList.sort((a, b) => b.confidence - a.confidence);
      
      setAccentLists([currentList]);
      
      if (!result.predicted_accent) {
        throw new Error("No predicted accent in response");
      }
      
      topAccent = currentList.find(accent => accent.name === result.predicted_accent);
      if (!topAccent) {
        topAccent = currentList[0];
      }

      let predictionAccentName;
      let predictionAccentScore;

      predictionAccentName = topAccent.name;
      predictionAccentScore = topAccent.confidence;

      if (userSelectedAccent) {
        predictionAccentName = userSelectedAccent;
        const accent = currentList.find(accent => accent.name === userSelectedAccent);
        if (!accent) {
          console.warn(`User selected accent "${userSelectedAccent}" not found in results`);
          predictionAccentName = topAccent.name;
          predictionAccentScore = topAccent.confidence;
        } else {
          predictionAccentScore = accent.confidence;
        }
      }

      try {
        const formData = new FormData();
        
        if (!predictionAccentName || predictionAccentScore === undefined || predictionAccentScore === null) {
          throw new Error("Invalid accent prediction data");
        }
        
        const integerScore = Math.round(predictionAccentScore);
        
        formData.append('accentName', predictionAccentName);
        formData.append('score', integerScore.toString()); 
        formData.append('voice', voiceFile);
      
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        if (!API_BASE_URL) {
          throw new Error("API URL is not configured");
        }
        
        const url = `${API_BASE_URL}/api/prediction/add`;
        
        const token = localStorage.getItem("accessToken");
        const options = {
          method: 'POST',
          headers: {},
          body: formData
        };
        
        if (token) {
          options.headers["Authorization"] = `Bearer ${token}`;
        }
              
        const response = await fetch(url, options);
        
        if (!response.ok) {
          let errorMessage = `API request failed with status ${response.status}`;
          try {
            const errorData = await response.json();
            console.error("API Error details:", errorData);
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            console.error("Error response couldn't be parsed:", response.statusText);
          }
          console.error(errorMessage);
        } else {
          const result = await response.json();
        }
      } catch (apiError) {
        console.error("API Error:", apiError);
      }

      // Finally set the accent result
      setAccentResult(topAccent.name);
    } catch (error) {
      console.error("Model API Error:", error);
      setProcessing(false);
      alert("Error analyzing accent: " + error.message);
      return;
    } finally {
      setProcessing(false);
    }
  };

  const resetAnalysis = () => {
    setAccentResult(null);
    setUploadedFile(null);
    setAudioBlob(null);
    setAudioUrl(null);
    setUserSelectedAccent(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true});

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
        setUploadedFile(null);
        if (chunks.length > 0) {
          analyzeAccent(blob);
        }
      };

      recorder.start();
      setRecording(true);
      setAccentResult(null);

      // Automatically stop after 120 seconds
      setTimeout(() => {
        recorder.stop();
        setRecording(false);
      }, 120000);

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
    setAccentResult(null);
    const file = event.target.files[0];
    if (file) {
      // Create an Audio Context for precise duration measurement
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
      // Create a FileReader to read the file
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
  
        // Decode the audio file to get accurate duration
        audioContext.decodeAudioData(
          arrayBuffer,
          (audioBuffer) => {
            const duration = audioBuffer.duration;
            // Validate file size and duration
            const maxDuration = 120; // 120 seconds
            const maxFileSize = 10 * 1024 * 1024; // 10 MB
  
            if (duration > maxDuration) {
              alert(`Audio file should be less than ${maxDuration} seconds.`);
              return;
            }
  
            if (file.size > maxFileSize) {
              alert(`File size should be less than ${maxFileSize / 1024 / 1024} MB.`);
              return;
            }
  
            // If validation passes, proceed with file upload
            const url = URL.createObjectURL(file);
            setUploadedFile(file);
            setAudioBlob(null);
            setAudioUrl(url);
            setAccentResult(null);
  
            // Close the audio context when done
            audioContext.close();
          },
          (error) => {
            console.error("Error decoding audio file:", error);
            alert("Unable to process the audio file. Please try a different file.");
          }
        );
      };
  
      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleAccentConfirmed = (accent) => {
    setUserSelectedAccent(accent);
  };
  
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      flex: 1,
      overflowY: "auto",
      bgcolor: "#1A1A1A",
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}>
          <HeaderText/>
          <SampleText/>

          <AccentSelector onAccentConfirmed={handleAccentConfirmed}/>

          {/* Recording and Upload Section */}
          <Card elevation={8} sx={{
            mb: 4,
            bgcolor: "#212121",
            borderRadius: 2,
            maxWidth: "800px",
            width: "100%",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
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

                <UploadFile handleFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
              </Box>

              {audioUrl && <AudioControls audioBlob={audioBlob} uploadedFile={uploadedFile} audioUrl={audioUrl}/>}

              {uploadedFile && !processing && !accentResult && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => analyzeAccent()}
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
  
          {processing && <Processing/>}

          {/* Show Try Another button in the Home component when a user accent is selected */}
          {userSelectedAccent && accentResult && (
            <Card 
              elevation={16}
              sx={{ 
                p: 0, 
                mt: 3, 
                mb: 3,
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
              <CardContent sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ mb: 3, color: "#9E9E9E" }}>
                  Using your selected accent:
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
                  {userSelectedAccent}
                </Typography>
                
                <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
                
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4CAF50",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#3d8b40",
                    },
                    borderRadius: 8,
                    px: 4,
                    py: 1.5,
                  }}
                  onClick={resetAnalysis}
                >
                  Try Another Recording
                </Button>
              </CardContent>
            </Card>
          )}
   
          {!userSelectedAccent && accentResult && (
            <Result 
              setAccentResult={setAccentResult} 
              accentResult={accentResult}
              accentList={accentLists[selectedList]}
              setAudioBlob={setAudioBlob}
              setUploadedFile={setUploadedFile}
            />
          )}
          
          {accentResult && (
            <AccentAnalysisComponent 
              accentList={accentLists[selectedList]} 
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              accentLists={accentLists}
              userSelectedAccent={userSelectedAccent}
            />
          )}
        </Box>

        {accentResult && <WorldMap accentName={userSelectedAccent || accentResult}/>}
      </Container>
    </Box>
  );
};

export default Home;



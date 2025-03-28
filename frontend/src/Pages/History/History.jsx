// import React, { useState, useRef, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Paper,
//   IconButton,
//   Tooltip,
//   Grid,
//   Fade,
// } from "@mui/material";
// import { 
//   PlayArrow, 
//   Pause, 
//   Refresh,
//   VolumeUp,
//   Download
// } from "@mui/icons-material";
// import WaveSurfer from "wavesurfer.js";

// // // Import local audio files
// import audio1 from './sample.mp3';
// // import audio2 from './demofile/accent_recording (2).mp3';
// // import audio3 from './demofile/accent_recording.mp3';

// const HistoryPage = () => {
//   const [audioStates, setAudioStates] = useState({});
//   const [activeRow, setActiveRow] = useState(null);
//   const [playTimes, setPlayTimes] = useState({});
//   const waveformRefs = useRef({});
//   const containerRefs = useRef({});

//   const historyData = [
//     { 
//       id: 1, 
//       audioUrl: audio1, 
//     // audioUrl: "",
//       detectedAccent: "American English", 
//       confidenceScore: 90,
//       recordedDate: "March 10, 2025",
//       duration: "0:32"
//     },
//     { 
//       id: 2, 
//     //   audioUrl: audio2, 
//       audioUrl: "",
//       detectedAccent: "British English", 
//       confidenceScore: 78,
//       recordedDate: "March 8, 2025",
//       duration: "0:45"
//     },
//     { 
//       id: 3, 
//     //   audioUrl: audio3, 
//       audioUrl: "",
//       detectedAccent: "Australian English", 
//       confidenceScore: 92,
//       recordedDate: "March 5, 2025",
//       duration: "0:28"
//     },
//      { 
//       id: 4, 
//       audioUrl: audio1,
//     // audioUrl: "", 
//       detectedAccent: "American English", 
//       confidenceScore: 85,
//       recordedDate: "March 10, 2025",
//       duration: "0:32"
//     },
//     { 
//       id: 5, 
//     //   audioUrl: audio2, 
//     audioUrl: "",
//       detectedAccent: "British English", 
//       confidenceScore: 78,
//       recordedDate: "March 8, 2025",
//       duration: "0:45"
//     }
   
//   ];

//   useEffect(() => {
//     // Clean up wavesurfer instances when component unmounts
//     return () => {
//       Object.values(waveformRefs.current).forEach(wavesurfer => {
//         if (wavesurfer) wavesurfer.destroy();
//       });
//     };
//   }, []);

//   const formatTime = (seconds) => {
//     seconds = Math.floor(seconds);
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' + secs : secs}`;
//   };

//   const initializeWavesurfer = (id, audioUrl) => {
//     // Destroy previous instance if it exists
//     if (waveformRefs.current[id]) {
//       waveformRefs.current[id].destroy();
//     }

//     // Create new instance
//     waveformRefs.current[id] = WaveSurfer.create({
//       container: containerRefs.current[id],
//       waveColor: "#666666",  
//       progressColor: "#4CAF50",
//       cursorColor: "#4CAF50",
//       barWidth: 2,
//       barGap: 3,
//       barRadius: 4,
//       responsive: true,
//       height: 40,
//       barHeight: 0.8,
//       normalize: true,
//       partialRender: true,
//     });

//     waveformRefs.current[id].load(audioUrl);

//     waveformRefs.current[id].on("ready", () => {
//       console.log(`Wavesurfer ${id} is ready`);
//     });

//     waveformRefs.current[id].on("audioprocess", () => {
//       const currentTime = waveformRefs.current[id].getCurrentTime();
//       const duration = waveformRefs.current[id].getDuration();
//       setPlayTimes(prev => ({ 
//         ...prev, 
//         [id]: {
//           current: formatTime(currentTime),
//           duration: formatTime(duration),
//           percentage: (currentTime / duration) * 100
//         }
//       }));
//     });

//     waveformRefs.current[id].on("finish", () => {
//       setAudioStates(prev => ({ ...prev, [id]: false }));
//     });

//     return waveformRefs.current[id];
//   };

//   const handlePlay = (id, audioUrl) => {
//     setActiveRow(id);
    
//     if (!waveformRefs.current[id]) {
//       const wavesurfer = initializeWavesurfer(id, audioUrl);
//       wavesurfer.on("ready", () => {
//         wavesurfer.play();
//         setAudioStates(prev => ({ ...prev, [id]: true }));
//       });
//     } else {
//       waveformRefs.current[id].play();
//       setAudioStates(prev => ({ ...prev, [id]: true }));
//     }
//   };

//   const handlePause = (id) => {
//     if (waveformRefs.current[id]) {
//       waveformRefs.current[id].pause();
//       setAudioStates(prev => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleRestart = (id) => {
//     if (waveformRefs.current[id]) {
//       waveformRefs.current[id].seekTo(0);
//       waveformRefs.current[id].play();
//       setAudioStates(prev => ({ ...prev, [id]: true }));
//     }
//   };

//   const handleDownload = (audioUrl, accentType) => {
//     const link = document.createElement('a');
//     link.href = audioUrl;
//     link.download = `${accentType.replace(/\s+/g, '_').toLowerCase()}_recording.mp3`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const getConfidenceColor = (score) => {
//     if (score >= 90) return "#4CAF50"; // Green
//     if (score >= 75) return "#FFC107"; // Yellow
//     return "#F44336"; // Red
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#1A1A1A", color: "#E0E0E0" }}>
//       <Box sx={{ flex: 1, p: 3, maxWidth: "1200px", mx: "auto", width: "100%" }}>
//         <Typography variant="h4" sx={{ 
//           mb: 3, 
//           color: "#4CAF50", 
//           fontWeight: 700,
//           borderBottom: "2px solid #333",
//           pb: 2,
//           display: "flex",
//           alignItems: "center"
//         }}>
//           <VolumeUp sx={{ mr: 2 }} /> Accent Recording History
//         </Typography>

//         <Box sx={{ overflowX: "auto" }}>
//           {historyData.map((row) => (
//             <Fade in timeout={300} key={row.id}>
//               <Paper 
//                 sx={{ 
//                   bgcolor: activeRow === row.id ? "#292929" : "#212121", 
//                   mb: 2, 
//                   p: 2, 
//                   borderRadius: 2,
//                   border: activeRow === row.id ? "1px solid #4CAF50" : "1px solid #333",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
//                     transform: "translateY(-2px)"
//                   }
//                 }}
//               >
//                 <Grid container spacing={2}>
//                   {/* COLUMN 1: AUDIO FILE */}
//                   <Grid item xs={12} md={5}>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>
//                         Audio Recording
//                       </Typography>
                      
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
//                           {audioStates[row.id] ? (
//                             <IconButton 
//                               onClick={() => handlePause(row.id)} 
//                               size="small"
//                               sx={{ 
//                                 color: "#fff",
//                                 bgcolor: "#4CAF50",
//                                 width: 32,
//                                 height: 32,
//                                 mr: 1,
//                                 "&:hover": { bgcolor: "#3d8b40" }
//                               }}
//                             >
//                               <Pause fontSize="small" />
//                             </IconButton>
//                           ) : (
//                             <IconButton 
//                               onClick={() => handlePlay(row.id, row.audioUrl)} 
//                               size="small"
//                               sx={{ 
//                                 color: "#fff",
//                                 bgcolor: "#4CAF50",
//                                 width: 32,
//                                 height: 32,
//                                 mr: 1,
//                                 "&:hover": { bgcolor: "#3d8b40" }
//                               }}
//                             >
//                               <PlayArrow fontSize="small" />
//                             </IconButton>
//                           )}
                          
//                           <Tooltip title="Restart">
//                             <IconButton 
//                               onClick={() => handleRestart(row.id)} 
//                               size="small"
//                               sx={{ 
//                                 color: "#E0E0E0",
//                                 width: 32,
//                                 height: 32,
//                                 mr: 1
//                               }}
//                             >
//                               <Refresh fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
                          
//                           <Tooltip title="Download">
//                             <IconButton 
//                               onClick={() => handleDownload(row.audioUrl, row.detectedAccent)} 
//                               size="small"
//                               sx={{ 
//                                 color: "#E0E0E0",
//                                 width: 32,
//                                 height: 32
//                               }}
//                             >
//                               <Download fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </Box>
                      
//                       <Paper 
//                         sx={{ 
//                           p: 1.5, 
//                           mt: 1,
//                           bgcolor: "#191919", 
//                           borderRadius: 1,
//                           border: "1px solid #333"
//                         }}
//                       >
//                         <Box 
//                           ref={el => containerRefs.current[row.id] = el} 
//                           sx={{ width: "100%", height: 40 }}
//                         />
//                         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
//                           <Typography variant="caption" sx={{ color: "#999" }}>
//                             {playTimes[row.id]?.current || "0:00"} / {playTimes[row.id]?.duration || row.duration}
//                           </Typography>
//                           <Typography variant="caption" sx={{ color: "#999" }}>
//                             Recorded: {row.recordedDate}
//                           </Typography>
//                         </Box>
//                       </Paper>
//                     </Box>
//                   </Grid>
                  
//                   {/* COLUMN 2: DETECTED ACCENT */}
//                   <Grid item xs={12} md={4}>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>
//                         Detected Accent
//                       </Typography>
//                       <Box sx={{ 
//                         bgcolor: "#191919", 
//                         p: 2, 
//                         borderRadius: 1, 
//                         border: "1px solid #333",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         height: "82px"
//                       }}>
//                         <Typography variant="h5" sx={{ color: "#E0E0E0", fontWeight: "bold" }}>
//                           {row.detectedAccent}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Grid>
                  
//                   {/* COLUMN 3: CONFIDENCE SCORE */}
//                   <Grid item xs={12} md={3}>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>
//                         Confidence Score
//                       </Typography>
//                       <Box sx={{ 
//                         bgcolor: "#191919", 
//                         p: 2, 
//                         borderRadius: 1, 
//                         border: "1px solid #333",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         height: "82px"
//                       }}>
//                         {/* Simplified confidence score display */}
//                         <Box sx={{ 
//                           display: "flex", 
//                           alignItems: "center",
//                           justifyContent: "center",
//                           flexDirection: "column"
//                         }}>
//                           <Box sx={{ 
//                             width: "100%", 
//                             height: "8px", 
//                             bgcolor: "#333", 
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             mb: 1
//                           }}>
//                             <Box sx={{ 
//                               width: `${row.confidenceScore}%`, 
//                               height: "100%", 
//                               bgcolor: getConfidenceColor(row.confidenceScore),
//                               borderRadius: "4px"
//                             }} />
//                           </Box>
//                           <Typography variant="h6" sx={{ 
//                             color: getConfidenceColor(row.confidenceScore),
//                             fontWeight: "bold"
//                           }}>
//                             {row.confidenceScore}%
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Fade>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HistoryPage;




// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Box, 
//   IconButton, 
//   Slider, 
//   Typography, 
//   Paper 
// } from '@mui/material';
// import { 
//   PlayArrow as PlayArrowIcon, 
//   Pause as PauseIcon 
// } from '@mui/icons-material';

// const HistoryPage = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const audioRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const audioUrl = "https://accentai.blob.core.windows.net/voicefiles/1_78f37baa-2999-4c1c-8212-f8fd41cec370";
//   // Format time in MM:SS
//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   // Fetch duration using Web Audio API
//   const fetchAudioDuration = async (url) => {
//     try {
//       // Create audio context if not exists
//       if (!audioContextRef.current) {
//         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//       }

//       // Fetch the audio file
//       const response = await fetch(url);
//       const arrayBuffer = await response.arrayBuffer();
      
//       // Decode audio data
//       const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
//       // Set duration
//       setDuration(audioBuffer.duration);
//       console.log(audioBuffer.duration);
//     } catch (error) {
//       console.error('Error fetching audio duration:', error);
//     }
//   };

//   // Handle play/pause toggle
//   const togglePlayback = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   // Update current time as audio plays
//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   // Reset play state when audio ends
//   const handleEnded = () => {
//     setIsPlaying(false);
//     setCurrentTime(0);
//   };

//   // Handle slider change
//   const handleSliderChange = (event, newValue) => {
//     audioRef.current.currentTime = newValue;
//     setCurrentTime(newValue);
//   };

//   // Fetch duration on component mount or when URL changes
//   useEffect(() => {
//     if (audioUrl) {
//       fetchAudioDuration(audioUrl);
//     }

//     // Cleanup audio context
//     return () => {
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }
//     };
//   }, [audioUrl]);

//   return (
//     <Paper 
//       elevation={3} 
//       sx={{ 
//         display: 'flex', 
//         alignItems: 'center', 
//         padding: 2, 
//         maxWidth: 400, 
//         margin: 'auto' 
//       }}
//     >
//       <audio
//         ref={audioRef}
//         src={audioUrl}
//         onTimeUpdate={handleTimeUpdate}
//         onEnded={handleEnded}
//       />
      
//       <IconButton 
//         onClick={togglePlayback} 
//         color="primary"
//       >
//         {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
//       </IconButton>
      
//       <Box sx={{ width: '100%', ml: 2, mr: 2 }}>
//         <Slider
//           value={currentTime}
//           max={duration}
//           onChange={handleSliderChange}
//           step={1}
//           valueLabelDisplay="auto"
//           valueLabelFormat={(value) => formatTime(value)}
//         />
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           mt: 1 
//         }}>
//           <Typography variant="caption">
//             {formatTime(currentTime)}
//           </Typography>
//           <Typography variant="caption">
//             {formatTime(duration)}
//           </Typography>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default HistoryPage;


import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Tooltip,
  Grid,
  Fade,
  CircularProgress
} from "@mui/material";
import { 
  PlayArrow, 
  Pause, 
  Refresh,
  VolumeUp,
  Download
} from "@mui/icons-material";
import WaveSurfer from "wavesurfer.js";
import apiRequest from "../../Services/apiService";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [audioStates, setAudioStates] = useState({});
  const [activeRow, setActiveRow] = useState(null);
  const [playTimes, setPlayTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const waveformRefs = useRef({});
  const containerRefs = useRef({});
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Clean up wavesurfer instances when component unmounts
    return () => {
      Object.values(waveformRefs.current).forEach(wavesurfer => {
        if (wavesurfer) wavesurfer.destroy();
      });
    };
  }, []);

  // Fetch duration using Web Audio API
  const fetchAudioDuration = async (url, id) => {
    try {
      // Create audio context if not exists
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      // Fetch the audio file
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      
      // Decode audio data
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      return Math.floor(audioBuffer.duration);
    } catch (error) {
      console.error(`Error fetching duration for ${id}:`, error);
      return null;
    }
  };

  // Fetch history data from API
  const fetchHistoryData = async () => {
      setLoading(true);

      const response = await apiRequest("GET", "/api/prediction/user/all", null, true);
            
      if (!response.success) {
        console.error(`Error (${response.status}):`, response.error || response.data.message);
        setLoading(false);
        return;
      }
  
      const dataWithDurations = await Promise.all(
        response.data.predictions.map(async (prediction) => {
          const duration = await fetchAudioDuration(prediction.voicePath, prediction.id);
          return {
            ...prediction,
            id: prediction.id,
            voiceUrl: prediction.voicePath,
            recordedDate: prediction.predictionDate,
            detectedAccent: prediction.accentName,
            confidenceScore: prediction.confidenceScore,
            duration: duration ? formatTime(duration) : '0:00'
          };
        })
      );
      
      setHistoryData(dataWithDurations);
      setLoading(false);
  };

  // Fetch history data on component mount
  useEffect(() => {
    fetchHistoryData();
  }, []);

  const formatTime = (seconds) => {
    seconds = Math.floor(seconds);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const initializeWavesurfer = (id, audioUrl) => {
    // Destroy previous instance if it exists
    if (waveformRefs.current[id]) {
      waveformRefs.current[id].destroy();
    }

    // Create new instance
    waveformRefs.current[id] = WaveSurfer.create({
      container: containerRefs.current[id],
      waveColor: "#666666",  
      progressColor: "#4CAF50",
      cursorColor: "#4CAF50",
      barWidth: 2,
      barGap: 3,
      barRadius: 4,
      responsive: true,
      height: 40,
      barHeight: 0.8,
      normalize: true,
      partialRender: true,
    });

    waveformRefs.current[id].load(audioUrl);

    waveformRefs.current[id].on("ready", () => {
      console.log(`Wavesurfer ${id} is ready`);
    });

    waveformRefs.current[id].on("audioprocess", () => {
      const currentTime = waveformRefs.current[id].getCurrentTime();
      const duration = waveformRefs.current[id].getDuration();
      setPlayTimes(prev => ({ 
        ...prev, 
        [id]: {
          current: formatTime(currentTime),
          duration: formatTime(duration),
          percentage: (currentTime / duration) * 100
        }
      }));
    });

    waveformRefs.current[id].on("finish", () => {
      setAudioStates(prev => ({ ...prev, [id]: false }));
    });

    return waveformRefs.current[id];
  };

  const handlePlay = (id, audioUrl) => {
    setActiveRow(id);
    
    if (!waveformRefs.current[id]) {
      const wavesurfer = initializeWavesurfer(id, audioUrl);
      wavesurfer.on("ready", () => {
        wavesurfer.play();
        setAudioStates(prev => ({ ...prev, [id]: true }));
      });
    } else {
      waveformRefs.current[id].play();
      setAudioStates(prev => ({ ...prev, [id]: true }));
    }
  };

  const handlePause = (id) => {
    if (waveformRefs.current[id]) {
      waveformRefs.current[id].pause();
      setAudioStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleRestart = (id) => {
    if (waveformRefs.current[id]) {
      waveformRefs.current[id].seekTo(0);
      waveformRefs.current[id].play();
      setAudioStates(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleDownload = (audioUrl, accentType) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${accentType.replace(/\s+/g, '_').toLowerCase()}_recording.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return "#4CAF50"; // Green
    if (score >= 75) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: "#1A1A1A" 
        }}
      >
        <CircularProgress 
          color="primary" 
          sx={{ 
            color: "#4CAF50", // Matching the green accent color
            width: 80,  // Larger size
            height: 80  // Larger size
          }} 
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#1A1A1A", color: "#E0E0E0" }}>
      <Box sx={{ flex: 1, p: 3, maxWidth: "1200px", mx: "auto", width: "100%" }}>
        <Typography variant="h4" sx={{ 
          mb: 3, 
          color: "#4CAF50", 
          fontWeight: 700,
          borderBottom: "2px solid #333",
          pb: 2,
          display: "flex",
          alignItems: "center"
        }}>
          <VolumeUp sx={{ mr: 2 }} /> Accent Recording History
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          {historyData.map((row) => (
            <Fade in timeout={300} key={row.id}>
              <Paper 
                sx={{ 
                  bgcolor: activeRow === row.id ? "#292929" : "#212121", 
                  mb: 2, 
                  p: 2, 
                  borderRadius: 2,
                  border: activeRow === row.id ? "1px solid #4CAF50" : "1px solid #333",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <Grid container spacing={2}>
                  {/* COLUMN 1: AUDIO FILE */}
                  <Grid item xs={12} md={5}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>
                        Audio Recording
                      </Typography>
                      
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          {audioStates[row.id] ? (
                            <IconButton 
                              onClick={() => handlePause(row.id)} 
                              size="small"
                              sx={{ 
                                color: "#fff",
                                bgcolor: "#4CAF50",
                                width: 32,
                                height: 32,
                                mr: 1,
                                "&:hover": { bgcolor: "#3d8b40" }
                              }}
                            >
                              <Pause fontSize="small" />
                            </IconButton>
                          ) : (
                            <IconButton 
                              onClick={() => handlePlay(row.id, row.voiceUrl)} 
                              size="small"
                              sx={{ 
                                color: "#fff",
                                bgcolor: "#4CAF50",
                                width: 32,
                                height: 32,
                                mr: 1,
                                "&:hover": { bgcolor: "#3d8b40" }
                              }}
                            >
                              <PlayArrow fontSize="small" />
                            </IconButton>
                          )}
                          
                          <Tooltip title="Restart">
                            <IconButton 
                              onClick={() => handleRestart(row.id)} 
                              size="small"
                              sx={{ 
                                color: "#E0E0E0",
                                width: 32,
                                height: 32,
                                mr: 1
                              }}
                            >
                              <Refresh fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Download">
                            <IconButton 
                              onClick={() => handleDownload(row.voiceUrl, row.detectedAccent)} 
                              size="small"
                              sx={{ 
                                color: "#E0E0E0",
                                width: 32,
                                height: 32
                              }}
                            >
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      
                      <Paper 
                        sx={{ 
                          p: 1.5, 
                          mt: 1,
                          bgcolor: "#191919", 
                          borderRadius: 1,
                          border: "1px solid #333"
                        }}
                      >
                        <Box 
                          ref={el => containerRefs.current[row.id] = el} 
                          sx={{ width: "100%", height: 40 }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            {playTimes[row.id]?.current || "0:00"} / {playTimes[row.id]?.duration || row.duration}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            Recorded: {row.recordedDate}
                          </Typography>
                        </Box>
                      </Paper>
                    </Box>
                  </Grid>
                  
                  {/* COLUMN 2: DETECTED ACCENT */}
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>
                        Detected Accent
                      </Typography>
                      <Box sx={{ 
                        bgcolor: "#191919", 
                        p: 2, 
                        borderRadius: 1, 
                        border: "1px solid #333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "82px"
                      }}>
                        <Typography variant="h5" sx={{ color: "#E0E0E0", fontWeight: "bold" }}>
                          {row.detectedAccent}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  {/* COLUMN 3: CONFIDENCE SCORE */}
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>
                        Confidence Score
                      </Typography>
                      <Box sx={{ 
                        bgcolor: "#191919", 
                        p: 2, 
                        borderRadius: 1, 
                        border: "1px solid #333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "82px"
                      }}>
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column"
                        }}>
                          <Box sx={{ 
                            width: "100%", 
                            height: "8px", 
                            bgcolor: "#333", 
                            borderRadius: "4px",
                            overflow: "hidden",
                            mb: 1
                          }}>
                            <Box sx={{ 
                              width: `${row.confidenceScore}%`, 
                              height: "100%", 
                              bgcolor: getConfidenceColor(row.confidenceScore),
                              borderRadius: "4px"
                            }} />
                          </Box>
                          <Typography variant="h6" sx={{ 
                            color: getConfidenceColor(row.confidenceScore),
                            fontWeight: "bold"
                          }}>
                            {row.confidenceScore}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Fade>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryPage;
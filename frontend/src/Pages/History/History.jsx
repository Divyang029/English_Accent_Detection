// import React, { useState, useRef, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Paper,
//   IconButton,
//   Tooltip,
//   Grid,
//   Fade,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button
// } from "@mui/material";
// import { 
//   PlayArrow, 
//   Pause, 
//   Refresh,
//   VolumeUp,
//   Download,
//   LibraryMusic,
//   Delete,
//   DeleteSweep,
//   AccessTime
// } from "@mui/icons-material";
// import WaveSurfer from "wavesurfer.js";
// // import apiRequest from "../../Services/apiService";
// import { useNavigate } from "react-router-dom";

// // Dummy data generator function
// const generateDummyHistoryData = () => {
//   const accents = [
//     "American English",
//     "British English",
//     "Australian English",
//     "Indian English",
//     "Irish English",
//     "Canadian English",
//     "South African English"
//   ];
  
//   const dummyData = [];
//   const now = new Date();
  
//   for (let i = 0; i < 5; i++) {
//     const randomAccent = accents[Math.floor(Math.random() * accents.length)];
//     const randomScore = Math.floor(Math.random() * 40) + 60; // 60-99
//     const randomDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
    
//     dummyData.push({
//       id: `dummy-${i}`,
//       voiceUrl: "/sample.mp3", // Directly reference from public folder
//       recordedDate: randomDate.toISOString().split('T')[0],
//       detectedAccent: randomAccent,
//       confidenceScore: randomScore,
//       duration: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
//     });
//   }
  
//   return dummyData;
// };

// const HistoryPage = () => {
//   const [historyData, setHistoryData] = useState([]);
//   const [audioStates, setAudioStates] = useState({});
//   const [activeRow, setActiveRow] = useState(null);
//   const [playTimes, setPlayTimes] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [deleteAllConfirmationOpen, setDeleteAllConfirmationOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const waveformRefs = useRef({});
//   const containerRefs = useRef({});
//   const audioContextRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Clean up wavesurfer instances when component unmounts
//     return () => {
//       Object.values(waveformRefs.current).forEach(wavesurfer => {
//         if (wavesurfer) wavesurfer.destroy();
//       });
//     };
//   }, []);

//   // Fetch duration using Web Audio API
//   const fetchAudioDuration = async (url, id) => {
//     try {
//       // Create audio context if not exists
//       if (!audioContextRef.current) {
//         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//       }

//       // For dummy data, return a random duration
//       return Math.floor(Math.random() * 180) + 30; // 30-210 seconds
//     } catch (error) {
//       console.error(`Error fetching duration for ${id}:`, error);
//       return null;
//     }
//   };

//   // Load dummy data instead of API call
//   const loadDummyData = async () => {
//     setLoading(true);
//     try {
//       const dummyData = generateDummyHistoryData();
      
//       const dataWithDurations = await Promise.all(
//         dummyData.map(async (item) => {
//           const duration = await fetchAudioDuration(item.voiceUrl, item.id);
//           return {
//             ...item,
//             duration: duration ? formatTime(duration) : '0:00'
//           };
//         })
//       );
      
//       setHistoryData(dataWithDurations);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error loading dummy data:", err);
//       setHistoryData([]);
//       setLoading(false);
//     }
//   };

//   // Load dummy data on component mount
//   useEffect(() => {
//     loadDummyData();
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

//     // For dummy data, we'll use a placeholder audio file
//     const placeholderAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
//     waveformRefs.current[id].load(placeholderAudio);

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
//     // For dummy data, we'll use a placeholder audio file
//     const placeholderAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
//     const link = document.createElement('a');
//     link.href = placeholderAudio;
//     link.download = `${accentType.replace(/\s+/g, '_').toLowerCase()}_recording.mp3`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Method to handle deletion of a single history item
//   const handleDeleteHistoryItem = async (id) => {
//     setIsDeleting(true);
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Filter out the item with the given id
//     const updatedHistoryData = historyData.filter(item => item.id !== id);
    
//     // Destroy the corresponding wavesurfer instance if it exists
//     if (waveformRefs.current[id]) {
//       waveformRefs.current[id].destroy();
//       delete waveformRefs.current[id];
//     }

//     // Update the history data state
//     setHistoryData(updatedHistoryData);

//     // Reset audio states
//     const newAudioStates = { ...audioStates };
//     delete newAudioStates[id];
//     setAudioStates(newAudioStates);

//     // Reset play times
//     const newPlayTimes = { ...playTimes };
//     delete newPlayTimes[id];
//     setPlayTimes(newPlayTimes);

//     setIsDeleting(false);
//     setDeleteConfirmationOpen(false);
//   };

//   // Method to handle deletion of all history items
//   const handleDeleteAllHistory = async () => {
//     setIsDeleting(true);
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Destroy all wavesurfer instances
//     Object.values(waveformRefs.current).forEach(wavesurfer => {
//       if (wavesurfer) wavesurfer.destroy();
//     });

//     // Clear all references and states
//     waveformRefs.current = {};
//     setHistoryData([]);
//     setAudioStates({});
//     setPlayTimes({});
    
//     setIsDeleting(false);
//     setDeleteAllConfirmationOpen(false);
//   };

//   const getConfidenceColor = (score) => {
//     if (score >= 90) return "#4CAF50"; // Green
//     if (score >= 75) return "#FFC107"; // Yellow
//     return "#F44336"; // Red
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '100vh',
//           bgcolor: "#1A1A1A" 
//         }}
//       >
//         <CircularProgress 
//           color="primary" 
//           sx={{ 
//             color: "#4CAF50", 
//             width: 80,  
//             height: 80  
//           }} 
//         />
//       </Box>
//     );
//   }

//   // Render empty state
//   if (historyData.length === 0) {
//     return (
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: "column", 
//         minHeight: "100vh", 
//         bgcolor: "#1A1A1A", 
//         color: "#E0E0E0",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         p: 3
//       }}>
//         <LibraryMusic 
//           sx={{ 
//             fontSize: 100, 
//             color: "#4CAF50", 
//             mb: 3 
//           }} 
//         />
//         <Typography variant="h4" sx={{ color: "#4CAF50", mb: 2 }}>
//           No Accent Recordings Yet
//         </Typography>
//         <Typography variant="body1" sx={{ color: "#999", maxWidth: 500, mb: 3 }}>
//           It looks like you haven't made any accent recordings yet. Start by recording your first accent to see your history here.
//         </Typography>
//         <Box sx={{ 
//           bgcolor: "#4CAF50", 
//           color: "#000", 
//           px: 3, 
//           py: 2, 
//           borderRadius: 2,
//           cursor: "pointer",
//           "&:hover": {
//             bgcolor: "#3d8b40"
//           }
//         }}
//         onClick={() => {
//           navigate('/dashboard/home');
//         }}
//         >
//           Start Recording
//         </Box>
//       </Box>
//     );
//   }

//   // Render history data
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#1A1A1A", color: "#E0E0E0" }}>
//       <Box sx={{ flex: 1, p: 3, maxWidth: "1200px", mx: "auto", width: "100%" }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//             borderBottom: "2px solid #333",
//             pb: 2,
//           }}
//         >
//           {/* Title - Ensured it stays in one line */}
//           <Typography
//             variant="h5"
//             sx={{
//               color: "#4CAF50",
//               fontWeight: 700,
//               display: "flex",
//               alignItems: "center",
//               whiteSpace: "nowrap", // Prevents wrapping
//               overflow: "hidden", // Hides overflow text
//               textOverflow: "ellipsis", // Adds '...' if text is too long
//             }}
//           >
//             <VolumeUp sx={{ mr: 1, flexShrink: 0 }} />
//             Accent Recording History
//           </Typography>

//           {/* Delete All button with spacing */}
//           <Tooltip title="Delete All History">
//             <Button
//               startIcon={<DeleteSweep />}
//               sx={{
//                 color: "#F44336",
//                 padding: "5px 10px",
//                 borderRadius: "5px",
//                 minWidth: "120px",
//                 maxWidth: "120px",
//                 marginLeft: "auto", // This pushes it to the right
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" }
//               }}
//               onClick={() => setDeleteAllConfirmationOpen(true)}
//             >
//               <Typography sx={{
//                 color: "#F44336",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 whiteSpace: "nowrap",  // Prevents text wrapping
//                 display: "inline-block"  // Keeps the text together
//               }}>
//                 Delete All
//               </Typography>
//             </Button>
//           </Tooltip>
//         </Box>

//         <Box sx={{ overflowX: "auto" }}>
//           {historyData.map((row) => (
//             <Fade in timeout={300} key={row.id}>
//               <Paper 
//                 sx={{ 
//                   position: "relative",
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
//                               onClick={() => handlePlay(row.id, row.voiceUrl)} 
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
//                               onClick={() => handleDownload(row.voiceUrl, row.detectedAccent)} 
//                               size="small"
//                               sx={{ 
//                                 color: "#E0E0E0",
//                                 width: 32,
//                                 height: 32,
//                                 mr: 1
//                               }}
//                             >
//                               <Download fontSize="small" />
//                             </IconButton>
//                           </Tooltip>

//                           {/* Delete button - same size as other buttons */}
//                           <Tooltip title="Delete">
//                             <IconButton 
//                               onClick={() => {
//                                 setItemToDelete(row.id);
//                                 setDeleteConfirmationOpen(true);
//                               }}
//                               size="small"
//                               sx={{ 
//                                 color: "#F44336",
//                                 width: 32,
//                                 height: 32,
//                                 "&:hover": { 
//                                   bgcolor: "rgba(244, 67, 54, 0.1)",
//                                 }
//                               }}
//                             >
//                               <Delete fontSize="small" />
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
//                           <Typography variant="caption" sx={{ color: "#999", display: "flex", alignItems: "center" }}>
//                             <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
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

//       {/* Delete Single Item Confirmation Dialog */}
//       <Dialog
//         open={deleteConfirmationOpen}
//         onClose={() => !isDeleting && setDeleteConfirmationOpen(false)}
//         aria-labelledby="delete-item-dialog-title"
//         aria-describedby="delete-item-dialog-description"
//         PaperProps={{
//           sx: {
//             bgcolor: "#212121",
//             color: "#E0E0E0"
//           }
//         }}
//       >
//         <DialogTitle id="delete-item-dialog-title" sx={{ color: "#F44336" }}>
//           Delete Recording
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="delete-item-dialog-description" sx={{ color: "#999" }}>
//             Are you sure you want to delete this accent recording? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => setDeleteConfirmationOpen(false)} 
//             disabled={isDeleting}
//             sx={{ color: "#4CAF50" }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={() => handleDeleteHistoryItem(itemToDelete)} 
//             color="error"
//             variant="contained"
//             disabled={isDeleting}
//             sx={{
//               bgcolor: "#F44336",
//               "&:hover": { bgcolor: "#D32F2F" },
//               minWidth: 100
//             }}
//           >
//             {isDeleting ? (
//               <CircularProgress size={24} sx={{ color: "#fff" }} />
//             ) : (
//               "Delete"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete All Confirmation Dialog */}
//       <Dialog
//         open={deleteAllConfirmationOpen}
//         onClose={() => !isDeleting && setDeleteAllConfirmationOpen(false)}
//         aria-labelledby="delete-all-dialog-title"
//         aria-describedby="delete-all-dialog-description"
//         PaperProps={{
//           sx: {
//             bgcolor: "#212121",
//             color: "#E0E0E0"
//           }
//         }}
//       >
//         <DialogTitle id="delete-all-dialog-title" sx={{ color: "#F44336" }}>
//           Delete All Recordings
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="delete-all-dialog-description" sx={{ color: "#999" }}>
//             Are you sure you want to delete all accent recordings? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => setDeleteAllConfirmationOpen(false)} 
//             disabled={isDeleting}
//             sx={{ color: "#4CAF50" }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleDeleteAllHistory} 
//             color="error"
//             variant="contained"
//             disabled={isDeleting}
//             sx={{
//               bgcolor: "#F44336",
//               "&:hover": { bgcolor: "#D32F2F" },
//               minWidth: 100
//             }}
//           >
//             {isDeleting ? (
//               <CircularProgress size={24} sx={{ color: "#fff" }} />
//             ) : (
//               "Delete All"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import { 
  PlayArrow, 
  Pause, 
  Refresh,
  VolumeUp,
  Download,
  LibraryMusic,
  Delete,
  DeleteOutline
} from "@mui/icons-material";
import WaveSurfer from "wavesurfer.js";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../Services/apiService";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [audioStates, setAudioStates] = useState({});
  const [activeRow, setActiveRow] = useState(null);
  const [playTimes, setPlayTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteAllConfirmationOpen, setDeleteAllConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const waveformRefs = useRef({});
  const containerRefs = useRef({});
  const audioContextRef = useRef(null);
  const navigate = useNavigate();

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
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      return audioBuffer.duration;
    } catch (error) {
      console.error(`Error fetching duration for ${id}:`, error);
      return null;
    }
  };

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
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
    } catch (err) {
      console.error("Unexpected error:", err);
      setHistoryData([]);
      setLoading(false);
    }
  };

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
    if (waveformRefs.current[id]) {
      waveformRefs.current[id].destroy();
    }

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

  const handleDeleteHistoryItem = async (id) => {
    setIsDeleting(true);
    try {
      const response = await apiRequest("DELETE", `/api/prediction/${id}`, null, true);
      
      if (response.success) {
        const updatedHistoryData = historyData.filter(item => item.id !== id);
        
        if (waveformRefs.current[id]) {
          waveformRefs.current[id].destroy();
          delete waveformRefs.current[id];
        }

        setHistoryData(updatedHistoryData);

        const newAudioStates = { ...audioStates };
        delete newAudioStates[id];
        setAudioStates(newAudioStates);

        const newPlayTimes = { ...playTimes };
        delete newPlayTimes[id];
        setPlayTimes(newPlayTimes);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleDeleteAllHistory = async () => {
    setIsDeleting(true);
    try {
      const response = await apiRequest("DELETE", "/api/prediction/user/all", null, true);
      
      if (response.success) {
        Object.values(waveformRefs.current).forEach(wavesurfer => {
          if (wavesurfer) wavesurfer.destroy();
        });

        waveformRefs.current = {};
        setHistoryData([]);
        setAudioStates({});
        setPlayTimes({});
      }
    } catch (error) {
      console.error("Error deleting all history:", error);
    } finally {
      setIsDeleting(false);
      setDeleteAllConfirmationOpen(false);
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return "#4CAF50";
    if (score >= 75) return "#FFC107";
    return "#F44336";
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: "#1A1A1A" 
      }}>
        <CircularProgress 
          color="primary" 
          sx={{ 
            color: "#4CAF50", 
            width: 80,  
            height: 80  
          }} 
        />
      </Box>
    );
  }

  if (historyData.length === 0) {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#1A1A1A",
        color: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3
      }}>
        <LibraryMusic
          sx={{
            fontSize: 100,
            color: "#4CAF50",
            mb: 3
          }}
        />
        <Typography variant="h4" sx={{ color: "#4CAF50", mb: 2 }}>
          No Accent Recordings Yet
        </Typography>
        <Typography variant="body1" sx={{ color: "#999", maxWidth: 500, mb: 3 }}>
          It looks like you haven't made any accent recordings yet. Start by recording your first accent to see your history here.
        </Typography>
        <Box sx={{
          bgcolor: "#4CAF50",
          color: "#000",
          px: 3,
          py: 2,
          borderRadius: 2,
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#3d8b40"
          }
        }}
          onClick={() => {
            navigate('/dashboard/home');
          }}
        >
          Start Recording
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#1A1A1A", color: "#E0E0E0" }}>
      <Box sx={{ flex: 1, p: 3, maxWidth: "1200px", mx: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, borderBottom: "2px solid #333", pb: 2 }}>
          <Typography variant="h5" sx={{ color: "#4CAF50", fontWeight: 700, display: "flex", alignItems: "center" }}>
            <VolumeUp sx={{ mr: 1 }} />
            Accent Recording History
          </Typography>
          <Tooltip title="Delete All History">
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                cursor: "pointer",
                "&:hover": { opacity: 0.8 }
              }} 
              onClick={() => setDeleteAllConfirmationOpen(true)}
            >
              <DeleteOutline sx={{ color: "#F44336", mr: 1 }} />
              <Typography variant="button" sx={{ color: "#F44336", fontWeight: 500 }}>
                Delete All
              </Typography>
            </Box>
          </Tooltip>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          {historyData.map((row) => (
            <Fade in timeout={300} key={row.id}>
              <Paper sx={{ 
                position: "relative",
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
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>Audio Recording</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          {audioStates[row.id] ? (
                            <IconButton onClick={() => handlePause(row.id)} size="small" sx={{ color: "#fff", bgcolor: "#4CAF50", width: 32, height: 32, mr: 1, "&:hover": { bgcolor: "#3d8b40" } }}>
                              <Pause fontSize="small" />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => handlePlay(row.id, row.voiceUrl)} size="small" sx={{ color: "#fff", bgcolor: "#4CAF50", width: 32, height: 32, mr: 1, "&:hover": { bgcolor: "#3d8b40" } }}>
                              <PlayArrow fontSize="small" />
                            </IconButton>
                          )}
                          <Tooltip title="Restart">
                            <IconButton onClick={() => handleRestart(row.id)} size="small" sx={{ color: "#E0E0E0", width: 32, height: 32, mr: 1 }}>
                              <Refresh fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton onClick={() => handleDownload(row.voiceUrl, row.detectedAccent)} size="small" sx={{ color: "#E0E0E0", width: 32, height: 32, mr: 1 }}>
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => { setItemToDelete(row.id); setDeleteConfirmationOpen(true); }} size="small" sx={{ color: "#F44336", width: 32, height: 32, "&:hover": { bgcolor: "rgba(244, 67, 54, 0.1)" } }}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      <Paper sx={{ p: 1.5, mt: 1, bgcolor: "#191919", borderRadius: 1, border: "1px solid #333" }}>
                        <Box ref={el => containerRefs.current[row.id] = el} sx={{ width: "100%", height: 40 }} />
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
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>Detected Accent</Typography>
                      <Box sx={{ bgcolor: "#191919", p: 2, borderRadius: 1, border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", height: "82px" }}>
                        <Typography variant="h5" sx={{ color: "#E0E0E0", fontWeight: "bold" }}>{row.detectedAccent}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#999", mb: 1 }}>Confidence Score</Typography>
                      <Box sx={{ bgcolor: "#191919", p: 2, borderRadius: 1, border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", height: "82px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                          <Box sx={{ width: "100%", height: "8px", bgcolor: "#333", borderRadius: "4px", overflow: "hidden", mb: 1 }}>
                            <Box sx={{ width: `${row.confidenceScore}%`, height: "100%", bgcolor: getConfidenceColor(row.confidenceScore), borderRadius: "4px" }} />
                          </Box>
                          <Typography variant="h6" sx={{ color: getConfidenceColor(row.confidenceScore), fontWeight: "bold" }}>
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

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => !isDeleting && setDeleteConfirmationOpen(false)}
        aria-labelledby="delete-item-dialog-title"
        PaperProps={{ sx: { bgcolor: "#212121", color: "#E0E0E0" } }}
      >
        <DialogTitle id="delete-item-dialog-title" sx={{ color: "#F44336" }}>Delete Recording</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#999" }}>
            Are you sure you want to delete this accent recording? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)} disabled={isDeleting} sx={{ color: "#4CAF50" }}>Cancel</Button>
          <Button onClick={() => handleDeleteHistoryItem(itemToDelete)} color="error" variant="contained" disabled={isDeleting}
            sx={{ bgcolor: "#F44336", "&:hover": { bgcolor: "#D32F2F" }, minWidth: 100 }}>
            {isDeleting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteAllConfirmationOpen}
        onClose={() => !isDeleting && setDeleteAllConfirmationOpen(false)}
        aria-labelledby="delete-all-dialog-title"
        PaperProps={{ sx: { bgcolor: "#212121", color: "#E0E0E0" } }}
      >
        <DialogTitle id="delete-all-dialog-title" sx={{ color: "#F44336" }}>Delete All Recordings</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#999" }}>
            Are you sure you want to delete all accent recordings? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAllConfirmationOpen(false)} disabled={isDeleting} sx={{ color: "#4CAF50" }}>Cancel</Button>
          <Button onClick={handleDeleteAllHistory} color="error" variant="contained" disabled={isDeleting}
            sx={{ bgcolor: "#F44336", "&:hover": { bgcolor: "#D32F2F" }, minWidth: 100 }}>
            {isDeleting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Delete All"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HistoryPage;
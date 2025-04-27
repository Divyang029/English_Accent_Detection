// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Card,
//   CardContent,
//   Divider
// } from "@mui/material";
// import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
// import WorldMap from './ProcessingResult/WorldMap.jsx';
// import HeaderText from "./HeaderText/HeaderText.jsx";
// import SampleText from "./SampleText/SampleText.jsx";
// import Microphone from "./MicroPhone/MicroPhone.jsx";
// import UploadFile from "./UploadFile/UploadFile.jsx";
// import AudioControls from "./AudioControls/AudioControls.jsx";
// import Processing from "./ProcessingResult/Processing.jsx";
// import Result from "./ProcessingResult/Result.jsx";
// import AccentAnalysisComponent from "./AccentAnalysis/AccentAnalysisMain.jsx";
// import AccentSelector from "./AccentSelector/AccentSelector.jsx";
// import apiRequest from "../../Services/apiService.js";

// const Home = () => {
//   const [recording, setRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [accentResult, setAccentResult] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [selectedList, setSelectedList] = useState(0);
//   const [userSelectedAccent, setUserSelectedAccent] = useState(null);

//   // Predefined accent lists with varying confidence scores
//   const accentLists = [
//     // List 1
//     [
//       { name: "General American", confidence: 85 },
//       { name: "Southern American", confidence: 72 },
//       { name: "New York English", confidence: 68 },
//       { name: "Received Pronunciation (RP)", confidence: 90 },
//       { name: "Cockney", confidence: 45 },
//       { name: "Scouse (Liverpool)", confidence: 30 },
//       { name: "Canadian English", confidence: 82 },
//       { name: "Newfoundland English", confidence: 25 },
//       { name: "Maritimer English", confidence: 28 },
//       { name: "General Australian", confidence: 75 },
//       { name: "Broad Australian", confidence: 65 },
//       { name: "New Zealand English", confidence: 70 },
//       { name: "South African English", confidence: 55 },
//       { name: "Cape Flats English", confidence: 20 },
//       { name: "Zimbabwean English", confidence: 35 },
//       { name: "Botswana English", confidence: 30 },
//       { name: "Namibian English", confidence: 25 },
//       { name: "Indian English", confidence: 88 },
//       { name: "Hinglish", confidence: 60 },
//       { name: "Pakistani English", confidence: 65 },
//       { name: "Bengali English", confidence: 40 },
//       { name: "Nepali English", confidence: 30 },
//       { name: "Sri Lankan English", confidence: 45 },
//       { name: "Jamaican English", confidence: 50 },
//       { name: "Trinidadian English", confidence: 35 },
//       { name: "Bahamian English", confidence: 25 },
//       { name: "Guyanese English", confidence: 20 },
//       { name: "Dublin English", confidence: 65 },
//       { name: "Belfast English", confidence: 55 },
//       { name: "Scottish English", confidence: 70 },
//       { name: "Singlish", confidence: 40 },
//       { name: "Manglish", confidence: 30 },
//       { name: "Hong Kong English", confidence: 45 },
//       { name: "Philippine English", confidence: 60 },
//       { name: "Gulf English", confidence: 50 },
//       { name: "Expats English", confidence: 55 },
//       { name: "Saudi English", confidence: 40 },
//       { name: "Belizean English", confidence: 15 },
//       { name: "Haitian English", confidence: 20 },
//       { name: "Dominican English", confidence: 25 },
//       { name: "Nigerian English", confidence: 70 },
//       { name: "Ghanaian English", confidence: 65 },
//       { name: "Kenyan English", confidence: 60 },
//       { name: "Eastern European English", confidence: 50 },
//       { name: "Hungarian English", confidence: 35 },
//       { name: "Romanian English", confidence: 40 },
//       { name: "French English", confidence: 55 },
//       { name: "German English", confidence: 60 },
//       { name: "Spanish English", confidence: 45 },
//       { name: "Swiss English", confidence: 50 },
//       { name: "Austrian English", confidence: 35 },
//       { name: "Dutch English", confidence: 65 },
//       { name: "Belgian English", confidence: 45 },
//       { name: "Swedish English", confidence: 70 },
//       { name: "Norwegian English", confidence: 60 },
//       { name: "Danish English", confidence: 55 },
//       { name: "Finnish English", confidence: 50 },
//       { name: "Russian English", confidence: 40 },
//       { name: "Ukrainian English", confidence: 30 },
//       { name: "Belarusian English", confidence: 25 },
//       { name: "Kazakh English", confidence: 20 },
//       { name: "Turkish English", confidence: 45 },
//       { name: "Persian English", confidence: 35 },
//       { name: "Armenian English", confidence: 30 },
//       { name: "Azerbaijani English", confidence: 25 },
//       { name: "Chilean English", confidence: 40 },
//       { name: "Argentinian English", confidence: 45 },
//       { name: "Brazilian English", confidence: 50 },
//       { name: "Mexican English", confidence: 55 },
//       { name: "Emirati English", confidence: 60 },
//       { name: "Omani English", confidence: 40 },
//       { name: "Bahraini English", confidence: 35 },
//       { name: "Qatari English", confidence: 45 },
//       { name: "Kuwaiti English", confidence: 40 },
//       { name: "Egyptian English", confidence: 50 },
//       { name: "Moroccan English", confidence: 45 },
//       { name: "Algerian English", confidence: 35 },
//       { name: "Tunisian English", confidence: 30 },
//       { name: "Libyan English", confidence: 25 }
//     ],
    
//     // List 2
//     [
//       { name: "General American", confidence: 100 },
//       { name: "Southern American", confidence: 85 },
//       { name: "New York English", confidence: 80 },
//       { name: "Received Pronunciation (RP)", confidence: 75 },
//       { name: "Cockney", confidence: 60 },
//       { name: "Scouse (Liverpool)", confidence: 50 },
//       { name: "Canadian English", confidence: 90 },
//       { name: "Newfoundland English", confidence: 40 },
//       { name: "Maritimer English", confidence: 45 },
//       { name: "General Australian", confidence: 65 },
//       { name: "Broad Australian", confidence: 55 },
//       { name: "New Zealand English", confidence: 60 },
//       { name: "South African English", confidence: 70 },
//       { name: "Cape Flats English", confidence: 35 },
//       { name: "Zimbabwean English", confidence: 50 },
//       { name: "Botswana English", confidence: 45 },
//       { name: "Namibian English", confidence: 40 },
//       { name: "Indian English", confidence: 75 },
//       { name: "Hinglish", confidence: 70 },
//       { name: "Pakistani English", confidence: 65 },
//       { name: "Bengali English", confidence: 50 },
//       { name: "Nepali English", confidence: 45 },
//       { name: "Sri Lankan English", confidence: 55 },
//       { name: "Jamaican English", confidence: 65 },
//       { name: "Trinidadian English", confidence: 50 },
//       { name: "Bahamian English", confidence: 40 },
//       { name: "Guyanese English", confidence: 35 },
//       { name: "Dublin English", confidence: 70 },
//       { name: "Belfast English", confidence: 65 },
//       { name: "Scottish English", confidence: 60 },
//       { name: "Singlish", confidence: 55 },
//       { name: "Manglish", confidence: 45 },
//       { name: "Hong Kong English", confidence: 60 },
//       { name: "Philippine English", confidence: 70 },
//       { name: "Gulf English", confidence: 65 },
//       { name: "Expats English", confidence: 60 },
//       { name: "Saudi English", confidence: 55 },
//       { name: "Belizean English", confidence: 30 },
//       { name: "Haitian English", confidence: 35 },
//       { name: "Dominican English", confidence: 40 },
//       { name: "Nigerian English", confidence: 60 },
//       { name: "Ghanaian English", confidence: 55 },
//       { name: "Kenyan English", confidence: 50 },
//       { name: "Eastern European English", confidence: 65 },
//       { name: "Hungarian English", confidence: 50 },
//       { name: "Romanian English", confidence: 55 },
//       { name: "French English", confidence: 70 },
//       { name: "German English", confidence: 75 },
//       { name: "Spanish English", confidence: 60 },
//       { name: "Swiss English", confidence: 65 },
//       { name: "Austrian English", confidence: 50 },
//       { name: "Dutch English", confidence: 75 },
//       { name: "Belgian English", confidence: 60 },
//       { name: "Swedish English", confidence: 80 },
//       { name: "Norwegian English", confidence: 70 },
//       { name: "Danish English", confidence: 65 },
//       { name: "Finnish English", confidence: 60 },
//       { name: "Russian English", confidence: 55 },
//       { name: "Ukrainian English", confidence: 45 },
//       { name: "Belarusian English", confidence: 40 },
//       { name: "Kazakh English", confidence: 35 },
//       { name: "Turkish English", confidence: 55 },
//       { name: "Persian English", confidence: 50 },
//       { name: "Armenian English", confidence: 45 },
//       { name: "Azerbaijani English", confidence: 40 },
//       { name: "Chilean English", confidence: 55 },
//       { name: "Argentinian English", confidence: 60 },
//       { name: "Brazilian English", confidence: 65 },
//       { name: "Mexican English", confidence: 70 },
//       { name: "Emirati English", confidence: 75 },
//       { name: "Omani English", confidence: 55 },
//       { name: "Bahraini English", confidence: 50 },
//       { name: "Qatari English", confidence: 60 },
//       { name: "Kuwaiti English", confidence: 55 },
//       { name: "Egyptian English", confidence: 65 },
//       { name: "Moroccan English", confidence: 60 },
//       { name: "Algerian English", confidence: 50 },
//       { name: "Tunisian English", confidence: 45 },
//       { name: "Libyan English", confidence: 40 }
//     ],
    
//     // List 3
//     [
//       { name: "General American", confidence: 70 },
//       { name: "Southern American", confidence: 60 },
//       { name: "New York English", confidence: 55 },
//       { name: "Received Pronunciation (RP)", confidence: 85 },
//       { name: "Cockney", confidence: 75 },
//       { name: "Scouse (Liverpool)", confidence: 65 },
//       { name: "Canadian English", confidence: 65 },
//       { name: "Newfoundland English", confidence: 55 },
//       { name: "Maritimer English", confidence: 60 },
//       { name: "General Australian", confidence: 90 },
//       { name: "Broad Australian", confidence: 80 },
//       { name: "New Zealand English", confidence: 100 },
//       { name: "South African English", confidence: 60 },
//       { name: "Cape Flats English", confidence: 50 },
//       { name: "Zimbabwean English", confidence: 60 },
//       { name: "Botswana English", confidence: 55 },
//       { name: "Namibian English", confidence: 50 },
//       { name: "Indian English", confidence: 65 },
//       { name: "Hinglish", confidence: 55 },
//       { name: "Pakistani English", confidence: 50 },
//       { name: "Bengali English", confidence: 60 },
//       { name: "Nepali English", confidence: 55 },
//       { name: "Sri Lankan English", confidence: 60 },
//       { name: "Jamaican English", confidence: 55 },
//       { name: "Trinidadian English", confidence: 60 },
//       { name: "Bahamian English", confidence: 55 },
//       { name: "Guyanese English", confidence: 50 },
//       { name: "Dublin English", confidence: 75 },
//       { name: "Belfast English", confidence: 70 },
//       { name: "Scottish English", confidence: 80 },
//       { name: "Singlish", confidence: 65 },
//       { name: "Manglish", confidence: 60 },
//       { name: "Hong Kong English", confidence: 55 },
//       { name: "Philippine English", confidence: 50 },
//       { name: "Gulf English", confidence: 55 },
//       { name: "Expats English", confidence: 65 },
//       { name: "Saudi English", confidence: 60 },
//       { name: "Belizean English", confidence: 45 },
//       { name: "Haitian English", confidence: 50 },
//       { name: "Dominican English", confidence: 55 },
//       { name: "Nigerian English", confidence: 50 },
//       { name: "Ghanaian English", confidence: 75 },
//       { name: "Kenyan English", confidence: 65 },
//       { name: "Eastern European English", confidence: 60 },
//       { name: "Hungarian English", confidence: 65 },
//       { name: "Romanian English", confidence: 70 },
//       { name: "French English", confidence: 50 },
//       { name: "German English", confidence: 55 },
//       { name: "Spanish English", confidence: 65 },
//       { name: "Swiss English", confidence: 60 },
//       { name: "Austrian English", confidence: 65 },
//       { name: "Dutch English", confidence: 50 },
//       { name: "Belgian English", confidence: 55 },
//       { name: "Swedish English", confidence: 60 },
//       { name: "Norwegian English", confidence: 65 },
//       { name: "Danish English", confidence: 70 },
//       { name: "Finnish English", confidence: 65 },
//       { name: "Russian English", confidence: 60 },
//       { name: "Ukrainian English", confidence: 65 },
//       { name: "Belarusian English", confidence: 60 },
//       { name: "Kazakh English", confidence: 55 },
//       { name: "Turkish English", confidence: 60 },
//       { name: "Persian English", confidence: 65 },
//       { name: "Armenian English", confidence: 60 },
//       { name: "Azerbaijani English", confidence: 55 },
//       { name: "Chilean English", confidence: 60 },
//       { name: "Argentinian English", confidence: 65 },
//       { name: "Brazilian English", confidence: 55 },
//       { name: "Mexican English", confidence: 60 },
//       { name: "Emirati English", confidence: 55 },
//       { name: "Omani English", confidence: 65 },
//       { name: "Bahraini English", confidence: 60 },
//       { name: "Qatari English", confidence: 55 },
//       { name: "Kuwaiti English", confidence: 65 },
//       { name: "Egyptian English", confidence: 60 },
//       { name: "Moroccan English", confidence: 65 },
//       { name: "Algerian English", confidence: 70 },
//       { name: "Tunisian English", confidence: 65 },
//       { name: "Libyan English", confidence: 60 }
//     ],
    
//     // List 4
//     [
//       { name: "General American", confidence: 60 },
//       { name: "Southern American", confidence: 65 },
//       { name: "New York English", confidence: 70 },
//       { name: "Received Pronunciation (RP)", confidence: 65 },
//       { name: "Cockney", confidence: 90 },
//       { name: "Scouse (Liverpool)", confidence: 85 },
//       { name: "Canadian English", confidence: 55 },
//       { name: "Newfoundland English", confidence: 70 },
//       { name: "Maritimer English", confidence: 65 },
//       { name: "General Australian", confidence: 60 },
//       { name: "Broad Australian", confidence: 70 },
//       { name: "New Zealand English", confidence: 65 },
//       { name: "South African English", confidence: 55 },
//       { name: "Cape Flats English", confidence: 65 },
//       { name: "Zimbabwean English", confidence: 70 },
//       { name: "Botswana English", confidence: 65 },
//       { name: "Namibian English", confidence: 60 },
//       { name: "Indian English", confidence: 55 },
//       { name: "Hinglish", confidence: 65 },
//       { name: "Pakistani English", confidence: 70 },
//       { name: "Bengali English", confidence: 65 },
//       { name: "Nepali English", confidence: 60 },
//       { name: "Sri Lankan English", confidence: 55 },
//       { name: "Jamaican English", confidence: 70 },
//       { name: "Trinidadian English", confidence: 75 },
//       { name: "Bahamian English", confidence: 70 },
//       { name: "Guyanese English", confidence: 65 },
//       { name: "Dublin English", confidence: 55 },
//       { name: "Belfast English", confidence: 60 },
//       { name: "Scottish English", confidence: 65 },
//       { name: "Singlish", confidence: 70 },
//       { name: "Manglish", confidence: 75 },
//       { name: "Hong Kong English", confidence: 70 },
//       { name: "Philippine English", confidence: 65 },
//       { name: "Gulf English", confidence: 60 },
//       { name: "Expats English", confidence: 55 },
//       { name: "Saudi English", confidence: 65 },
//       { name: "Belizean English", confidence: 70 },
//       { name: "Haitian English", confidence: 65 },
//       { name: "Dominican English", confidence: 60 },
//       { name: "Nigerian English", confidence: 65 },
//       { name: "Ghanaian English", confidence: 60 },
//       { name: "Kenyan English", confidence: 70 },
//       { name: "Eastern European English", confidence: 55 },
//       { name: "Hungarian English", confidence: 60 },
//       { name: "Romanian English", confidence: 65 },
//       { name: "French English", confidence: 100 },
//       { name: "German English", confidence: 65 },
//       { name: "Spanish English", confidence: 70 },
//       { name: "Swiss English", confidence: 75 },
//       { name: "Austrian English", confidence: 70 },
//       { name: "Dutch English", confidence: 65 },
//       { name: "Belgian English", confidence: 70 },
//       { name: "Swedish English", confidence: 65 },
//       { name: "Norwegian English", confidence: 60 },
//       { name: "Danish English", confidence: 55 },
//       { name: "Finnish English", confidence: 70 },
//       { name: "Russian English", confidence: 75 },
//       { name: "Ukrainian English", confidence: 70 },
//       { name: "Belarusian English", confidence: 65 },
//       { name: "Kazakh English", confidence: 70 },
//       { name: "Turkish English", confidence: 65 },
//       { name: "Persian English", confidence: 70 },
//       { name: "Armenian English", confidence: 75 },
//       { name: "Azerbaijani English", confidence: 70 },
//       { name: "Chilean English", confidence: 65 },
//       { name: "Argentinian English", confidence: 70 },
//       { name: "Brazilian English", confidence: 75 },
//       { name: "Mexican English", confidence: 70 },
//       { name: "Emirati English", confidence: 65 },
//       { name: "Omani English", confidence: 70 },
//       { name: "Bahraini English", confidence: 75 },
//       { name: "Qatari English", confidence: 70 },
//       { name: "Kuwaiti English", confidence: 65 },
//       { name: "Egyptian English", confidence: 70 },
//       { name: "Moroccan English", confidence: 75 },
//       { name: "Algerian English", confidence: 70 },
//       { name: "Tunisian English", confidence: 65 },
//       { name: "Libyan English", confidence: 70 }
//     ],
    
//     // List 5
//     [
//       { name: "General American", confidence: 75 },
//       { name: "Southern American", confidence: 80 },
//       { name: "New York English", confidence: 85 },
//       { name: "Received Pronunciation (RP)", confidence: 70 },
//       { name: "Cockney", confidence: 65 },
//       { name: "Scouse (Liverpool)", confidence: 70 },
//       { name: "Canadian English", confidence: 75 },
//       { name: "Newfoundland English", confidence: 60 },
//       { name: "Maritimer English", confidence: 55 },
//       { name: "General Australian", confidence: 70 },
//       { name: "Broad Australian", confidence: 75 },
//       { name: "New Zealand English", confidence: 70 },
//       { name: "South African English", confidence: 100 },
//       { name: "Cape Flats English", confidence: 85 },
//       { name: "Zimbabwean English", confidence: 80 },
//       { name: "Botswana English", confidence: 75 },
//       { name: "Namibian English", confidence: 70 },
//       { name: "Indian English", confidence: 60 },
//       { name: "Hinglish", confidence: 55 },
//       { name: "Pakistani English", confidence: 60 },
//       { name: "Bengali English", confidence: 55 },
//       { name: "Nepali English", confidence: 50 },
//       { name: "Sri Lankan English", confidence: 65 },
//       { name: "Jamaican English", confidence: 60 },
//       { name: "Trinidadian English", confidence: 55 },
//       { name: "Bahamian English", confidence: 60 },
//       { name: "Guyanese English", confidence: 55 },
//       { name: "Dublin English", confidence: 60 },
//       { name: "Belfast English", confidence: 65 },
//       { name: "Scottish English", confidence: 55 },
//       { name: "Singlish", confidence: 60 },
//       { name: "Manglish", confidence: 65 },
//       { name: "Hong Kong English", confidence: 60 },
//       { name: "Philippine English", confidence: 55 },
//       { name: "Gulf English", confidence: 70 },
//       { name: "Expats English", confidence: 75 },
//       { name: "Saudi English", confidence: 70 },
//       { name: "Belizean English", confidence: 55 },
//       { name: "Haitian English", confidence: 60 },
//       { name: "Dominican English", confidence: 65 },
//       { name: "Nigerian English", confidence: 75 },
//       { name: "Ghanaian English", confidence: 90 },
//       { name: "Kenyan English", confidence: 80 },
//       { name: "Eastern European English", confidence: 70 },
//       { name: "Hungarian English", confidence: 55 },
//       { name: "Romanian English", confidence: 60 },
//       { name: "French English", confidence: 65 },
//       { name: "German English", confidence: 70 },
//       { name: "Spanish English", confidence: 75 },
//       { name: "Swiss English", confidence: 70 },
//       { name: "Austrian English", confidence: 55 },
//       { name: "Dutch English", confidence: 60 },
//       { name: "Belgian English", confidence: 65 },
//       { name: "Swedish English", confidence: 70 },
//       { name: "Norwegian English", confidence: 75 },
//       { name: "Danish English", confidence: 60 },
//       { name: "Finnish English", confidence: 55 },
//       { name: "Russian English", confidence: 65 },
//       { name: "Ukrainian English", confidence: 60 },
//       { name: "Belarusian English", confidence: 55 },
//       { name: "Kazakh English", confidence: 60 },
//       { name: "Turkish English", confidence: 75 },
//       { name: "Persian English", confidence: 80 },
//       { name: "Armenian English", confidence: 65 },
//       { name: "Azerbaijani English", confidence: 60 },
//       { name: "Chilean English", confidence: 75 },
//       { name: "Argentinian English", confidence: 80 },
//       { name: "Brazilian English", confidence: 70 },
//       { name: "Mexican English", confidence: 65 },
//       { name: "Emirati English", confidence: 80 },
//       { name: "Omani English", confidence: 75 },
//       { name: "Bahraini English", confidence: 70 },
//       { name: "Qatari English", confidence: 75 },
//       { name: "Kuwaiti English", confidence: 80 },
//       { name: "Egyptian English", confidence: 75 },
//       { name: "Moroccan English", confidence: 70 },
//       { name: "Algerian English", confidence: 65 },
//       { name: "Tunisian English", confidence: 70 },
//       { name: "Libyan English", confidence: 75 }
//     ]
//   ].map(list => [...list].sort((a, b) => b.confidence - a.confidence));


//   const analyzeAccent = async (blobfile = null) => {
//     setProcessing(true);

//     var voiceFile;
//     const modelformData = new FormData();

//     try {
//       if (blobfile) {
//         voiceFile = blobfile;
//         modelformData.append('file', voiceFile , "recording.mp3");
//       } else if (uploadedFile) {
//         voiceFile = uploadedFile;
//         modelformData.append('file', voiceFile);
//       } else {
//         throw new Error("No voice file available. Please record or upload an audio file.");
//       }
//     } catch (error) {
//       console.error('Error while getting voicefiles');
//       throw error;
//     }

//     try{
//       const MODEL_API_URL = import.meta.env.VITE_MODEL_API_BASE_URL;
//       const modelurl = `${MODEL_API_URL}/v1/predict`;
//       const options = {
//         method: 'POST',
//         headers: {},
//         body: modelformData
//       };

//       const response = await fetch(modelurl, options);
      
//       if (!response.ok) {
//         let errorData;
//         try {
//           errorData = await response.json();
//           console.log("Error details:", errorData);
//         } catch (parseError) {
//           console.log("Error response couldn't be parsed:", response.statusText);
//         }
//         throw new Error(`Request failed with status ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log("Success on model api:", result);
//     }
//     catch(error){
//       console.error("Model API Error:", error);
//     }


//     let listIndex;
//     listIndex = Math.floor(Math.random() * accentLists.length);
//     setSelectedList(listIndex);
//     // Set the top result from the selected list
//     const currentList = accentLists[listIndex];
//     const topAccent = currentList[0];
//     // Simulate processing delay
//     await new Promise(resolve => setTimeout(resolve, 3000));
  
  
//     let predictionAccentName;
//     let predictionAccentScore;

//     predictionAccentName = topAccent.name;
//     predictionAccentScore = topAccent.confidence;

//     if(userSelectedAccent){
//       predictionAccentName= userSelectedAccent;
//       const accent = accentLists[listIndex].find(accent => accent.name === userSelectedAccent);
//       predictionAccentScore = accent.confidence;
//     }

//     // const formData = new FormData();
//     // formData.append('accentName', predictionAccentName);
//     // formData.append('score', predictionAccentScore.toString());
//     // formData.append('voice', voiceFile);
  
//     // try {
//     //   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//     //   const url = `${API_BASE_URL}/api/prediction/add`;
      
//     //   const token = localStorage.getItem("accessToken");
//     //   const options = {
//     //     method: 'POST',
//     //     headers: {},
//     //     body: formData
//     //   };
      
//     //   if (token) {
//     //     options.headers["Authorization"] = `Bearer ${token}`;
//     //   }
      
//     //   const response = await fetch(url, options);
      
//     //   if (!response.ok) {
//     //     let errorData;
//     //     try {
//     //       errorData = await response.json();
//     //       console.log("Error details:", errorData);
//     //     } catch (parseError) {
//     //       console.log("Error response couldn't be parsed:", response.statusText);
//     //     }
//     //     throw new Error(`Request failed with status ${response.status}`);
//     //   }
      
//     //   const result = await response.json();
//     //   console.log("Success:", result);
//     // } catch (error) {
//     //   console.error("API Error:", error);
//     // }
    
//     setProcessing(false);
//     setAccentResult(topAccent.name);
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true});

//       const recorder = new MediaRecorder(stream);

//       setMediaRecorder(recorder);

//       const chunks = [];
//       recorder.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "audio/mp3" });
//         setAudioBlob(blob);
//         const url = URL.createObjectURL(blob);
//         setAudioUrl(url);
//         stream.getTracks().forEach((track) => track.stop());
//         setUploadedFile(null);
//         if (chunks.length > 0) {
//           analyzeAccent(blob);
//         }
//       };

//       recorder.start();
//       setRecording(true);
//       setAccentResult(null);

//       // Automatically stop after 10 seconds
//       setTimeout(() => {
//         recorder.stop();
//         setRecording(false);
//       }, 10000);

//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//       alert("Microphone access denied. Please allow microphone access to record.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const handleFileUpload = (event) => {
//     setAccentResult(null);
//     const file = event.target.files[0];
//     if (file) {
//       // Create an Audio Context for precise duration measurement
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
//       // Create a FileReader to read the file
//       const reader = new FileReader();
  
//       reader.onload = (e) => {
//         const arrayBuffer = e.target.result;
  
//         // Decode the audio file to get accurate duration
//         audioContext.decodeAudioData(
//           arrayBuffer,
//           (audioBuffer) => {
//             const duration = audioBuffer.duration;
//             // Validate file size and duration
//             const maxDuration = 10; // 60 seconds
//             const maxFileSize = 10 * 1024 * 1024; // 10 MB
  
//             if (duration > maxDuration) {
//               alert(`Audio file should be less than ${maxDuration} seconds.`);
//               return;
//             }
  
//             if (file.size > maxFileSize) {
//               alert(`File size should be less than ${maxFileSize / 1024 / 1024} MB.`);
//               return;
//             }
  
//             // If validation passes, proceed with file upload
//             const url = URL.createObjectURL(file);
//             setUploadedFile(file);
//             setAudioBlob(null);
//             setAudioUrl(url);
//             setAccentResult(null);
  
//             // Close the audio context when done
//             audioContext.close();
//           },
//           (error) => {
//             console.error("Error decoding audio file:", error);
//             alert("Unable to process the audio file. Please try a different file.");
//           }
//         );
//       };
  
//       // Read the file as an ArrayBuffer
//       reader.readAsArrayBuffer(file);
//     } else {
//       alert("Please upload a valid audio file.");
//     }
//   };

//   const handleAccentConfirmed = (accent) => {
//     setUserSelectedAccent(accent);
//   };
  
//   return (
//     <Box sx={{ 
//       display: "flex", 
//       flexDirection: "column", 
//       flex: 1,
//       overflowY: "auto",
//       bgcolor: "#1A1A1A",
//     }}>
//       <Container maxWidth="lg">
//         <Box sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           py: 6,
//         }}>
//           <HeaderText/>
//           <SampleText/>

//           <AccentSelector onAccentConfirmed={handleAccentConfirmed}/>

//           {/* Recording and Upload Section */}
//           <Card elevation={8} sx={{
//             mb: 4,
//             bgcolor: "#212121",
//             borderRadius: 2,
//             maxWidth: "800px",
//             width: "100%",
//             overflow: "hidden",
//             border: "1px solid rgba(255,255,255,0.05)",
//           }}>
//             <CardContent sx={{ p: 4 }}>             
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   alignItems: "center",
//                   gap: 4,
//                   mb: 3,
//                 }}
//               >
//                 <Microphone startRecording={startRecording} stopRecording={stopRecording} recording={recording}/>

//                 <Typography variant="h6" sx={{ color: "#9E9E9E", display: { xs: "none", sm: "block" } }}>
//                   OR
//                 </Typography>
//                 <Divider orientation="horizontal" sx={{ width: "100%", my: 2, display: { xs: "block", sm: "none" }, bgcolor: "rgba(255,255,255,0.1)" }} />

//                 <UploadFile handleFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
//               </Box>

//               {audioUrl && <AudioControls audioBlob={audioBlob} uploadedFile={uploadedFile} audioUrl={audioUrl}/>}

//               {uploadedFile && !processing && !accentResult && (
//                 <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                   <Button
//                     variant="contained"
//                     onClick={() => analyzeAccent()}
//                     sx={{
//                       bgcolor: "#4CAF50",
//                       color: "white",
//                       px: 4,
//                       py: 1.5,
//                       borderRadius: 8,
//                       fontWeight: 600,
//                       "&:hover": {
//                         bgcolor: "#3d8b40",
//                       },
//                     }}
//                     endIcon={<ArrowForwardIcon />}
//                   >
//                     Analyze My Accent
//                   </Button>
//                 </Box>
//               )}
//             </CardContent>
//           </Card>
  
//           {processing && <Processing/>}
   
//           {/* Show Result component only if no accent was pre-selected */}
//           {!userSelectedAccent && accentResult && (
//             <Result 
//               setAccentResult={setAccentResult} 
//               accentResult={accentResult}
//               accentList={accentLists[selectedList]}
//             />
//           )}
          
//           {/* Always show Analysis component after processing */}
//           {accentResult && (
//             <AccentAnalysisComponent 
//               accentList={accentLists[selectedList]} 
//               selectedList={selectedList}
//               setSelectedList={setSelectedList}
//               accentLists={accentLists}
//               userSelectedAccent={userSelectedAccent}
//             />
//           )}
  
         
//         </Box>


//         {accentResult && <WorldMap accentName={userSelectedAccent || accentResult}/>}
//         {/* {accentResult && <WorldMap accentName={accentResult}/>}  */}
//       </Container>
//     </Box>
//   );
// };

// export default Home;



import React, { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";

const recorder = new MicRecorder({ bitRate: 128 });

function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobFile, setBlobFile] = useState(null);
  const [blobURL, setBlobURL] = useState(null); // 👈 for download
  const [uploadFile, setUploadFile] = useState(null);

  const startRecording = () => {
    recorder
      .start()
      .then(() => setIsRecording(true))
      .catch((e) => console.error("Recording error:", e));
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "recording.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        setBlobFile(file);
        setBlobURL(URL.createObjectURL(blob)); // 👈 generate download link
        setIsRecording(false);
      })
      .catch((e) => {
        console.error("Failed to stop recording:", e);
        setIsRecording(false);
      });
  };

  const handleUploadChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const sendToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/v1/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      alert("Prediction: " + JSON.stringify(res.data));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to send file.");
    }

    // try{
    //   const MODEL_API_URL = 
    //   const modelurl = `${MODEL_API_URL}/v1/predict`;
    //   const options = {
    //     method: 'POST',
    //     headers: {},
    //     body: modelformData
    //   };

    //   const response = await fetch(modelurl, options);
      
    //   if (!response.ok) {
    //     let errorData;
    //     try {
    //       errorData = await response.json();
    //       console.log("Error details:", errorData);
    //     } catch (parseError) {
    //       console.log("Error response couldn't be parsed:", response.statusText);
    //     }
    //     throw new Error(`Request failed with status ${response.status}`);
    //   }
      
    //   const result = await response.json();
    //   console.log("Success on model api:", result);
    // }
    // catch(error){
    //   console.error("Model API Error:", error);
    // }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>🎤 Accent Detection App</h2>

      {/* Recording Section */}
      <div style={{ marginBottom: 20 }}>
        <h3>Record Audio (MP3)</h3>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        <button onClick={() => sendToBackend(blobFile)} disabled={!blobFile}>
          Send Recording
        </button>
        {blobURL && (
          <div style={{ marginTop: 10 }}>
            <a href={blobURL} download="recording.mp3">
              <button>⬇️ Download Recording</button>
            </a>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div>
        <h3>Upload MP3 File</h3>
        <input type="file" accept="audio/mp3" onChange={handleUploadChange} />
        <br />
        <button onClick={() => sendToBackend(uploadFile)} disabled={!uploadFile}>
          Send Uploaded File
        </button>
      </div>
    </div>
  );
}

export default Home;




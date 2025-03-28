// AccentAnalysisMain.jsx
import React from 'react';
import { Box, Card, CardContent, Divider, Typography, Paper } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ConfidenceGraph from './Graphs/ConfidenceGraph';
import AccentBarChart from './Graphs/AccentBarChart';



const AccentAnalysis = () => {

  // Sample data - in a real app, this would come from props
  const confidenceScore = 75;
  const accentMatches = [
    { accent: "British", score: 75 },
    { accent: "American", score: 48 },
    { accent: "Australian", score: 62 },
    { accent: "Indian", score: 25 },
    { accent: "Scottish", score: 35 },
    { accent: "Canadian", score: 42 },
    { accent: "Irish", score: 18 },
  ];
  
  // Sort accents for summary
  const sortedAccents = [...accentMatches].sort((a, b) => b.score - a.score);

  return (
    <Card
      elevation={8}
      sx={{
        mt: 3,
        bgcolor: "#212121",
        maxWidth: "900px",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }
      }}
    >
      <Box sx={{
        bgcolor: "rgba(76, 175, 80, 0.1)",
        py: 2,
        borderBottom: "1px solid rgba(76, 175, 80, 0.3)"
      }}>
        <Typography
          variant="h6"
          sx={{
            color: "#E0E0E0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <AssessmentIcon /> Accent Analysis Results
        </Typography>
      </Box>
      
      <CardContent sx={{ p: 4 }}>
        {/* Main content with improved layout */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          alignItems: "stretch"
        }}>
          {/* Left column with confidence score - increased size */}
          <Box sx={{ 
            flex: { xs: '1', lg: '1' },
            minWidth: { xs: '100%', lg: '300px' },
            minHeight: '350px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <ConfidenceGraph initialScore={confidenceScore} />
          </Box>
          
          {/* Divider between sections */}
          <Divider orientation="vertical" flexItem sx={{ 
            display: { xs: "none", lg: "block" }, 
            bgcolor: "rgba(255,255,255,0.1)" 
          }} />
          
          {/* Horizontal divider for mobile */}
          <Divider orientation="horizontal" sx={{ 
            width: "100%", 
            display: { xs: "block", lg: "none" }, 
            bgcolor: "rgba(255,255,255,0.1)" 
          }} />
          
          {/* Right column with bar chart - fixed sizing */}
          <Box sx={{ 
            flex: { xs: '1', lg: '2' },
            display: "flex",
            flexDirection: "column",
            width: "90%"
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: "#E0E0E0", 
                textAlign: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                pb: 1
              }}
            >
              
            </Typography>
            
            {/* Fixed height container to ensure chart visibility */}
            <Box sx={{ 
              width: "100%",
              height: "350px",
              position: "relative",
              overflowX: "auto",
              overflowY: "hidden",
              pb: 2,
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.5)',
                }
              },
            }}>
              {/* Ensure chart has proper dimensions */}
              <Box sx={{ 
                minWidth: { xs: '550px', md: '100%' }, 
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <AccentBarChart sortedAccents={sortedAccents} />
              </Box>
            </Box>
          </Box>
        </Box>
        
        {/* Results Summary */}
        <Paper elevation={3} sx={{
          mt: 4,
          p: 3,
          bgcolor: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          border: "1px solid rgba(76, 175, 80, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative icon */}
          <VolumeUpIcon sx={{ 
            position: "absolute", 
            right: -10, 
            top: -10, 
            fontSize: 60, 
            color: "rgba(76, 175, 80, 0.05)",
            transform: "rotate(15deg)" 
          }} />
          
          <Typography variant="body1" sx={{ 
            color: "#E0E0E0", 
            textAlign: "center", 
            lineHeight: 1.6,
            position: "relative",
            zIndex: 2,
            fontSize: "1.1rem"
          }}>
            Your speech patterns have the strongest match with 
            <span style={{ color: "#4CAF50", fontWeight: 600 }}> {sortedAccents[0].accent} English</span>,
            with secondary influences from 
            <span style={{ color: "#FFC107" }}> {sortedAccents[1].accent}</span> and
            <span style={{ color: "#FFC107" }}> {sortedAccents[2].accent}</span>.
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default AccentAnalysis;
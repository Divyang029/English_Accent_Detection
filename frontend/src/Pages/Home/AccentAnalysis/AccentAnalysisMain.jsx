import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Divider, 
  Typography, 
  Paper, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ConfidenceGraph from './ConfidenceGraph';
import AccentBarChart from './AccentBarChart';

const AccentAnalysisMain = ({ 
  accentList, 
  selectedList, 
  setSelectedList, 
  accentLists,
  userSelectedAccent 
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Get top accents for the bar chart, prioritizing the user selected accent
  const getTopAccents = () => {
    // If user selected an accent, make sure it's included in the top 5
    if (userSelectedAccent) {
      const selectedAccentData = accentList.find(item => item.name === userSelectedAccent);
      const otherAccents = accentList
        .filter(item => item.name !== userSelectedAccent)
        .slice(0, 4); // Get top 4 others
      
      return [selectedAccentData, ...otherAccents].sort((a, b) => b.confidence - a.confidence);
    }
    
    // Otherwise just return top 5
    return accentList.slice(0, 5);
  };

  const topAccents = getTopAccents();

  return (
    <Card 
      elevation={8} 
      sx={{
        mt: 3,
        bgcolor: "#212121",
        maxWidth: "1100px",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }
      }}
    >
      {/* Header */}
      <Box 
        sx={{
          bgcolor: "rgba(76, 175, 80, 0.1)",
          py: 2,
          borderBottom: "1px solid rgba(76, 175, 80, 0.3)"
        }}
      >
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

      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Box 
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 2, md: 4 },
            alignItems: "stretch"
          }}
        >
          {/* Confidence Graph */}
          <Box 
            sx={{
              flex: { xs: '1', lg: '0.8' },
              minWidth: { xs: '100%', lg: '250px' },
              maxWidth: { xs: '100%', lg: '300px' },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <ConfidenceGraph 
              accentList={accentList} 
              compact={!isLargeScreen} 
              userSelectedAccent={userSelectedAccent}
            />
          </Box>

          {/* Vertical/Horizontal Divider */}
          <Divider 
            orientation={isLargeScreen ? "vertical" : "horizontal"} 
            flexItem 
            sx={{
              display: { xs: isLargeScreen ? "none" : "block", lg: "block" },
              bgcolor: "rgba(255,255,255,0.1)"
            }} 
          />

          {/* Bar Chart */}
          <Box 
            sx={{
              flex: { xs: '1', lg: '1.2' },
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "600px"
            }}
          >
            <AccentBarChart 
              accentMatches={topAccents} 
              compact={!isLargeScreen} 
            />
          </Box>
        </Box>

        {/* Results Summary */}
        <Paper 
          elevation={3} 
          sx={{
            mt: { xs: 2, md: 4 },
            p: { xs: 2, md: 3 },
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            border: "1px solid rgba(76, 175, 80, 0.2)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <VolumeUpIcon 
            sx={{
              position: "absolute",
              right: -10,
              top: -10,
              fontSize: { xs: 40, md: 60 },
              color: "rgba(76, 175, 80, 0.05)",
              transform: "rotate(15deg)"
            }} 
          />

          <Typography 
            variant="body1" 
            sx={{
              color: "#E0E0E0",
              textAlign: "center",
              lineHeight: 1.6,
              position: "relative",
              zIndex: 2,
              fontSize: { xs: "0.9rem", md: "1.1rem" }
            }}
          >
            Your speech patterns have the strongest match with{" "}
            <span style={{ color: "#4CAF50", fontWeight: 600 }}>
              {accentList[0].name}
            </span>
            , with secondary influences from{" "}
            <span style={{ color: "#FFC107" }}>
              {accentList[1].name}
            </span>{" "}
            and{" "}
            <span style={{ color: "#FFC107" }}>
              {accentList[2].name}
            </span>.
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default AccentAnalysisMain;
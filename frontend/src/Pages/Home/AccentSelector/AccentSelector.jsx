import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Divider, Chip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AccentSelector = () => {
  const [selectedAccent, setSelectedAccent] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Initial accent options
  const initialAccents = [
    "British English",
    "American English",
    "Australian English",
    "Indian English",
    "Scottish English"
  ];
  
  // Additional accent options
  const additionalAccents = [
    "Canadian English",
    "Irish English",
    "South African English",
    "New Zealand English",
    "Welsh English",
    "Singaporean English",
    "Philippine English",
    "Nigerian English",
    "Jamaican English",
    "Malaysian English"
  ];
  
  // Get displayed accents based on showAll state
  const displayedAccents = showAll 
    ? [...initialAccents, ...additionalAccents] 
    : initialAccents;

  return (
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
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            color: "#4CAF50", 
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <LanguageIcon /> Select Accent
        </Typography>
        <Divider sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
        
        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 1.5, 
          justifyContent: "center"
        }}>
          {displayedAccents.map((accent) => (
            <Chip
              key={accent}
              label={accent}
              onClick={() => setSelectedAccent(accent)}
              sx={{
                px: 1,
                py: 2.5,
                bgcolor: selectedAccent === accent ? "rgba(76, 175, 80, 0.8)" : "rgba(48, 48, 48, 0.8)",
                color: selectedAccent === accent ? "#FFFFFF" : "#E0E0E0",
                borderRadius: 2,
                fontWeight: selectedAccent === accent ? 600 : 400,
                border: selectedAccent === accent ? "1px solid #4CAF50" : "1px solid rgba(255,255,255,0.1)",
                '&:hover': {
                  bgcolor: selectedAccent === accent ? "rgba(76, 175, 80, 0.9)" : "rgba(76, 175, 80, 0.2)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                },
                transition: "all 0.3s ease",
                boxShadow: selectedAccent === accent ? "0 4px 8px rgba(0,0,0,0.3)" : "none",
                fontSize: "14px"
              }}
            />
          ))}
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {!showAll ? (
            <Chip
              icon={<KeyboardArrowDownIcon />}
              label="Show More Accents"
              onClick={() => setShowAll(true)}
              sx={{
                px: 2,
                bgcolor: "transparent",
                color: "#4CAF50",
                border: "1px solid #4CAF50",
                '&:hover': {
                  bgcolor: "rgba(76, 175, 80, 0.1)",
                  transform: "translateY(-2px)"
                },
                transition: "all 0.3s ease"
              }}
            />
          ) : (
            <Chip
              icon={<KeyboardArrowUpIcon />}
              label="Show Less"
              onClick={() => setShowAll(false)}
              sx={{
                px: 2,
                bgcolor: "transparent",
                color: "#9E9E9E",
                border: "1px solid #9E9E9E",
                '&:hover': {
                  bgcolor: "rgba(255,255,255,0.05)",
                  transform: "translateY(-2px)"
                },
                transition: "all 0.3s ease"
              }}
            />
          )}
        </Box>
        
        {selectedAccent && (
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            textAlign: "center", 
            borderRadius: 2,
            bgcolor: "rgba(76, 175, 80, 0.1)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
            animation: "fadeIn 0.5s ease-in-out",
            "@keyframes fadeIn": {
              "0%": {
                opacity: 0,
                transform: "translateY(10px)"
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)"
              }
            }
          }}>
            <Typography variant="body1" sx={{ color: "#E0E0E0" }}>
              Selected Accent: <span style={{ color: "#4CAF50", fontWeight: 600 }}>{selectedAccent}</span>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AccentSelector;
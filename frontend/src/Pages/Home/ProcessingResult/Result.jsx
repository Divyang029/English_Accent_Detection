import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Divider,
  } from "@mui/material";
import { useState, useEffect } from 'react';

import "../../../Styles/Typewriter.css";
import AccentAnalysis from "./AccentAnalysis";

const Result = ({accentResult,setAccentResult}) => {
    const [isTyped, setIsTyped] = useState(false);

    useEffect(() => {
      setIsTyped(false); // Reset animation on new text
      const timer = setTimeout(() => setIsTyped(true), 1500); // Wait for typing to complete
      return () => clearTimeout(timer);
    }, [accentResult]);

    return ( 
        <>
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
                  className={`typewriter ${isTyped ? "typed" : ""}`}
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

            <AccentAnalysis/>
        </>
    );
}
 
export default Result;
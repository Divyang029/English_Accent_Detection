import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, Select, MenuItem, FormControl } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FlagIcon from '@mui/icons-material/Flag';

const ConfidenceGraph = ({ accentList, compact = false, userSelectedAccent }) => {
  // Initialize with the user selected accent if available, otherwise first in list
  const [selectedAccent, setSelectedAccent] = useState(
    userSelectedAccent || accentList[0]?.name || ''
  );
  
  // Find the confidence score for the selected accent
  const selectedAccentData = accentList.find(item => item.name === selectedAccent) || accentList[0];
  const [confidenceScore, setConfidenceScore] = useState(selectedAccentData?.confidence || 0);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Format data for dropdown
  const accentConfidenceScores = accentList.reduce((acc, item) => {
    acc[item.name] = { score: item.confidence };
    return acc;
  }, {});

  // Handle accent selection
  const handleAccentChange = (event) => {
    const selected = event.target.value;
    setSelectedAccent(selected);
    setAnimatedScore(0); // Reset for animation
    setConfidenceScore(accentConfidenceScores[selected].score);
  };

  // Determine color based on confidence level
  const getConfidenceColor = (score) => {
    if (score >= 70) return '#4CAF50';
    if (score >= 50) return '#FFC107';
    return '#F44336';
  };

  // Get confidence level text
  const getConfidenceText = (score) => {
    if (score >= 70) return 'High confidence';
    if (score >= 50) return 'Medium confidence';
    return 'Low confidence';
  };

  const confidenceColor = getConfidenceColor(confidenceScore);
  
  // Animate the confidence score counter
  useEffect(() => {
    if (animatedScore < confidenceScore) {
      const timer = setTimeout(() => {
        setAnimatedScore(prev => Math.min(prev + 1, confidenceScore));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [animatedScore, confidenceScore]);

  // Circle calculations
  const circleSize = compact ? 150 : 180;
  const circleRadius = compact ? 60 : 70;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressOffset = circleCircumference - (animatedScore / 100) * circleCircumference;

  return (
    <Box sx={{ 
      textAlign: 'center', 
      p: compact ? 2 : 3, 
      bgcolor: '#1E1E1E', 
      borderRadius: 2, 
      maxWidth: 400, 
      mx: 'auto',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      border: `1px solid ${confidenceColor}30`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant={compact ? 'h6' : 'h5'} sx={{ 
        color: '#E0E0E0', 
        mb: 1,
        fontWeight: 'bold'
      }}>
        Accent Confidence
      </Typography>
      
      <Typography variant="body2" sx={{ 
        color: '#BDBDBD', 
        mb: compact ? 2 : 3,
        fontSize: compact ? '0.8rem' : '0.9rem'
      }}>
        How certain we are about your accent match
      </Typography>
      
      {/* Circular Progress Graph */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: compact ? 2 : 3,
        position: 'relative',
        flex: '1 0 auto'
      }}>
        <Box sx={{ 
          position: 'relative',
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}>
          {/* Background circle */}
          <Box
            component="svg"
            width={circleSize}
            height={circleSize}
            viewBox={`0 0 ${circleSize} ${circleSize}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={circleRadius}
              stroke={confidenceColor}
              strokeWidth="12"
              fill="transparent"
              strokeOpacity={0.2}
              filter="drop-shadow(0px 0px 3px rgba(0,0,0,0.3))"
            />
          </Box>

          {/* Progress circle */}
          <Box
            component="svg"
            width={circleSize}
            height={circleSize}
            viewBox={`0 0 ${circleSize} ${circleSize}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          >
            <defs>
              <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={confidenceColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={confidenceColor} stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={circleRadius}
              stroke="url(#gradientPath)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circleCircumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
            />
          </Box>

          {/* Inner decorative ring */}
          <Box
            component="svg"
            width={circleSize}
            height={circleSize}
            viewBox={`0 0 ${circleSize} ${circleSize}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={circleRadius - 20}
              stroke={confidenceColor}
              strokeWidth="1"
              fill="transparent"
              strokeOpacity={0.5}
            />
          </Box>

          {/* Confidence score text */}
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant={compact ? 'h4' : 'h3'} sx={{ 
              color: confidenceColor,
              fontWeight: 'bold',
              textShadow: `0px 2px 4px rgba(0,0,0,0.3)`
            }}>
              {animatedScore}%
            </Typography>
            <Typography variant="body2" sx={{ 
              color: confidenceColor,
              fontWeight: 'medium',
              mt: 0.5,
              fontSize: compact ? '0.8rem' : '0.9rem'
            }}>
              {getConfidenceText(confidenceScore)}
            </Typography>
          </Box>

          {/* Accent name displayed under the score */}
          <Box
            sx={{
              position: 'absolute',
              bottom: compact ? -30 : -40,
              left: 0,
              right: 0,
              textAlign: 'center'
            }}
          >
            <Typography variant={compact ? 'body2' : 'subtitle1'} sx={{ 
              color: confidenceColor,
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5
            }}>
              <FlagIcon sx={{ fontSize: compact ? '0.8rem' : '1rem' }} />
              {selectedAccent}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Dropdown for accent selection */}
      <Box sx={{ mt: compact ? 3 : 5 }}>
        <Typography variant={compact ? 'body2' : 'subtitle1'} sx={{ 
          color: '#E0E0E0', 
          mb: 1,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}>
          Compare with other accents
          <Tooltip title="Select an accent to see our confidence score for that accent" arrow>
            <InfoOutlinedIcon sx={{ color: '#9E9E9E', fontSize: compact ? '0.8rem' : '1rem' }} />
          </Tooltip>
        </Typography>
        
        <FormControl fullWidth variant="outlined" size={compact ? 'small' : 'medium'}>
          <Select
            value={selectedAccent}
            onChange={handleAccentChange}
            sx={{
              color: '#E0E0E0',
              bgcolor: 'rgba(255,255,255,0.05)',
              height: compact ? '40px' : '50px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 2
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: confidenceColor,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: confidenceColor,
                borderWidth: 2
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#212121',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  maxHeight: 300
                }
              }
            }}
          >
            {accentList.map((accent) => {
              const accentColor = getConfidenceColor(accent.confidence);
              return (
                <MenuItem key={accent.name} value={accent.name} sx={{ 
                  color: '#E0E0E0',
                  height: compact ? '40px' : '50px',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)'
                  },
                  '&.Mui-selected': {
                    bgcolor: `${accentColor}20`,
                    '&:hover': {
                      bgcolor: `${accentColor}30`
                    }
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1 
                    }}>
                      <FlagIcon sx={{ 
                        color: accentColor,
                        fontSize: compact ? '1rem' : '1.2rem'
                      }} />
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: compact ? '0.8rem' : '0.9rem' }}>
                        {accent.name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      bgcolor: accentColor, 
                      color: '#000', 
                      px: 1, 
                      py: 0.3, 
                      borderRadius: 5,
                      fontWeight: 'bold',
                      fontSize: compact ? '0.7rem' : '0.8rem',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {accent.confidence}%
                    </Box>
                  </Box>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ConfidenceGraph;
import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const AccentBarChart = ({ accentMatches, compact = false }) => {
  const [animated, setAnimated] = useState(false);
  
  // Validate and prepare accent data
  const validateAndPrepareAccents = (matches) => {
    return matches
      .map(match => ({
        ...match,
        confidence: Math.max(0, Math.min(100, match.confidence)) // Clamp between 0-100
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  };

  const topAccents = validateAndPrepareAccents(accentMatches);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Get bar color based on percentage (matching ConfidenceGraph's color logic)
  const getBarColor = (percentage) => {
    if (percentage >= 70) return "#4CAF50"; // Green for high confidence
    if (percentage >= 50) return "#FFC107"; // Yellow/Orange for medium confidence
    return "#F44336"; // Red for low confidence
  };

  const maxBarHeight = compact ? 180 : 220;

  return (
    <Box sx={{ 
      width: "100%",
      position: "relative",
      px: { xs: 1, sm: 2 },
      backgroundColor: '#1E1E1E', // Dark background
      borderRadius: 2,
      py: 2,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      border: `1px solid ${getBarColor(topAccents[0]?.confidence || 0)}30`
    }}>
      <Typography variant="h5" sx={{ 
        color: "#FFFFFF", 
        mb: 8, 
        textAlign: "center",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        fontWeight: 'bold',
        fontSize: { xs: '1.3rem', sm: '1.5rem' }
      }}>
        Top Accent Matches & Selected Accent
        <Tooltip title="Shows your top 5 closest accent matches" arrow>
          <ArrowUpwardIcon sx={{ 
            color: getBarColor(topAccents[0]?.confidence || 0), 
            fontSize: '1.5rem',
            transform: 'rotate(45deg)'
          }} />
        </Tooltip>
      </Typography>
      
      {/* Bar chart container with fixed height and 0-100% precision */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-end",
        height: maxBarHeight,
        position: 'relative',
        width: '100%',
      }}>
        {/* Precise percentage grid lines without labels */}
        {[0, 20, 40, 60, 80, 100].map((line) => (
          <Box
            key={line}
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: (line / 100) * maxBarHeight,
              height: '1px',
              bgcolor: 'rgba(255,255,255,0.2)',
              zIndex: 0,
              display: line > 0 ? 'block' : 'none'
            }}
          />
        ))}
        
        {/* Bars for top 5 accents with precise height */}
        {topAccents.map((item, index) => {
          const barHeight = animated ? (item.confidence / 100) * maxBarHeight : 0;
          const barColor = getBarColor(item.confidence);
          
          return (
            <Tooltip 
              key={item.name} 
              title={`${item.name}: ${item.confidence.toFixed(1)}%`} 
              placement="top"
              arrow
            >
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                zIndex: 5,
                width: '15%', 
                minWidth: '30px',
                mx: 0.5,
              }}>
                {/* Bar value */}
                <Typography
                  variant="body2"
                  sx={{
                    color: barColor,
                    fontWeight: 'bold',
                    mb: 0.5,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {item.confidence.toFixed(0)}%
                </Typography>
                
                {/* Precision bar with exact height */}
                <Box 
                  sx={{ 
                    width: { xs: 24, sm: 32, md: 36 },
                    height: `${barHeight}px`,
                    bgcolor: barColor,
                    borderRadius: "6px 6px 0 0",
                    position: "relative",
                    transition: "height 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${index * 0.1}s`,
                    "&:hover": {
                      transform: "translateY(-5px)"
                    }
                  }} 
                />
                
                {/* Accent label */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1, 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    fontWeight: index === 0 ? 700 : 500,
                    color: index === 0 ? barColor : "#FFFFFF",
                    whiteSpace: "nowrap",
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%'
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
      
      {/* Color Legend */}
      <Box sx={{ 
        mt: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        flexWrap: 'wrap'
      }}>
        {[
          { color: '#4CAF50', label: 'High (70%+)' },
          { color: '#FFC107', label: 'Medium (40-69%)' },
          { color: '#F44336', label: 'Low (0-39%)' }
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 16, 
              height: 16, 
              bgcolor: item.color, 
              borderRadius: '50%'
            }} />
            <Typography variant="body2" sx={{ 
              color: "#FFFFFF", 
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 500
            }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AccentBarChart;
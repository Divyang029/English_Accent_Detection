// AccentBarChart.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tooltip, Fade, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const AccentBarChart = ({ sortedAccents }) => {
  
  // Animation states
  const [animated, setAnimated] = useState(false);
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  
  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Check scroll position to show/hide scroll buttons
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftScroll(container.scrollLeft > 20);
    setShowRightScroll(container.scrollLeft < (container.scrollWidth - container.clientWidth - 20));
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      // Also check on window resize
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);
  
  // Handle scroll buttons
  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 150; // Pixels to scroll each time
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  
  // Get appropriate color based on percentage
  const getBarColor = (percentage) => {
    if (percentage >= 70) return "#4CAF50"; // Green for high confidence
    if (percentage >= 40) return "#FFC107"; // Yellow for medium confidence
    return "#9E9E9E"; // Grey for low confidence
  };

  // Calculate the maximum bar height (for scaling)
  const maxBarHeight = 200; // Maximum height in pixels

  return (
    <Box sx={{ 
      width: "100%",
      position: "relative"
    }}>
      <Typography variant="h6" sx={{ 
        color: "#E0E0E0", 
        mb: 3, 
        textAlign: "center",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}>
        Accent Match Analysis
        <Tooltip title="Shows how closely your speech matches different accents" arrow>
          <ArrowUpwardIcon sx={{ 
            color: getBarColor(sortedAccents[0].score), 
            fontSize: '1rem',
            transform: 'rotate(45deg)'
          }} />
        </Tooltip>
      </Typography>
      
      {/* Custom scroll buttons */}
      {showLeftScroll && (
        <IconButton
          onClick={() => handleScroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'rgba(33, 33, 33, 0.8)',
            color: '#E0E0E0',
            '&:hover': {
              bgcolor: 'rgba(76, 175, 80, 0.2)',
            },
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            width: 32,
            height: 32
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      )}
      
      {showRightScroll && (
        <IconButton
          onClick={() => handleScroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'rgba(33, 33, 33, 0.8)',
            color: '#E0E0E0',
            '&:hover': {
              bgcolor: 'rgba(76, 175, 80, 0.2)',
            },
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            width: 32,
            height: 32
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      )}
      
      {/* Scrollable container with custom scrollbar */}
      <Box
        ref={scrollContainerRef}
        sx={{ 
          width: "100%",
          overflowX: "auto",
          position: "relative",
          px: 1,
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            height: '6px',
            display: { xs: 'block', md: 'none' }, // Only show on mobile
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(76, 175, 80, 0.3)',
            borderRadius: '10px',
            border: '1px solid rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.5)',
            }
          },
          // Hide scrollbar but allow scrolling
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
          // Only hide on desktop where we use buttons instead
          '@media (min-width: 900px)': {
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }
        }}
      >
        {/* Bar chart container with fixed width to ensure proper spacing */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-end",
          height: maxBarHeight + 30, // Add space for labels
          gap: { xs: 1, sm: 2, md: 3 },
          px: { xs: 4, md: 2 }, // Extra padding on sides to account for scroll buttons
          position: 'relative',
          minWidth: { xs: '600px', md: '100%' }, // Set min width on mobile
          maxWidth: { md: '100%' } // Constrain width on desktop
        }}>
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((line) => (
            <Box
              key={line}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: (line / 100) * maxBarHeight,
                height: '1px',
                bgcolor: 'rgba(255,255,255,0.1)',
                zIndex: 0,
                display: line > 0 ? 'block' : 'none' // Don't show the 0% line
              }}
            />
          ))}
          
          {/* Percentage indicators */}
          {[25, 50, 75, 100].map((percent) => (
            <Typography
              key={percent}
              variant="caption"
              sx={{
                position: 'absolute',
                left: 0,
                bottom: (percent / 100) * maxBarHeight - 6,
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.6rem',
                zIndex: 1
              }}
            >
              {percent}%
            </Typography>
          ))}
          
          {/* Bars */}
          {sortedAccents.map((item, index) => {
            const barHeight = animated ? (item.score / 100) * maxBarHeight : 0;
            const barColor = getBarColor(item.score);
            
            return (
              <Tooltip 
                key={item.accent} 
                title={`${item.accent}: ${item.score}%`} 
                placement="top"
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  zIndex: 5,
                  flex: 1 // Make all bars take equal space
                }}>
                  {/* Bar value (for high scores) */}
                  {item.score >= 60 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: barColor,
                        fontWeight: 'bold',
                        mb: 0.5,
                        fontSize: '0.7rem'
                      }}
                    >
                      {item.score}%
                    </Typography>
                  )}
                  
                  {/* The bar itself */}
                  <Box 
                    sx={{ 
                      width: { xs: 24, sm: 28, md: 32 },
                      height: `${barHeight}px`,
                      bgcolor: barColor,
                      borderRadius: "4px 4px 0 0",
                      boxShadow: `0 2px 8px ${barColor}40`,
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        filter: "brightness(1.2)",
                      },
                      "&::after": {
                        content: "''",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        backgroundImage: `linear-gradient(to top, ${barColor}40, transparent)`,
                        borderRadius: "4px 4px 0 0"
                      },
                      transition: `all 0.3s ease, height 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                    }} 
                  />
                  
                  {/* Accent label */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      mt: 1, 
                      fontSize: { xs: 10, sm: 12 },
                      fontWeight: index === 0 ? 600 : 400,
                      color: index === 0 ? barColor : "#9E9E9E",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {item.accent}
                  </Typography>
                  
                  {/* Score percentage (for low scores) */}
                  {item.score < 60 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.6rem'
                      }}
                    >
                      {item.score}%
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
      
    
     
      
      {/* Legend */}
      <Box sx={{ 
        mt: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 3,
        flexWrap: 'wrap'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#4CAF50', borderRadius: '50%' }} />
          <Typography variant="caption" sx={{ color: "#9E9E9E" }}>
            High (70%+)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#FFC107', borderRadius: '50%' }} />
          <Typography variant="caption" sx={{ color: "#9E9E9E" }}>
            Medium (40-69%)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#9E9E9E', borderRadius: '50%' }} />
          <Typography variant="caption" sx={{ color: "#9E9E9E" }}>
            Low (0-39%)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AccentBarChart;
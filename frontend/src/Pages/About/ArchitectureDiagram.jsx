import React from "react";
import { Box, Card, CardContent, Typography,Tooltip } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";



export default function ArchitectureDiagram() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      sx={{ 
        backgroundColor: "#1A1A1A", 
        padding: 6, 
        color: "#ffffff", 
        minHeight: "100vh",
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(76, 175, 80, 0.03) 0%, rgba(26, 26, 26, 0) 80%)",
      }}
    >
      {/* Title with animation */}
      <Box
        sx={{
          textAlign: "center",
          mb: 3,
          animation: "fadeInDown 0.8s ease-out",
          "@keyframes fadeInDown": {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          }
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#ffffff" sx={{ 
          textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
          mb: 1
        }}>
          Website Architecture
        </Typography>
        <Typography variant="subtitle1" color="#9E9E9E">
          Interactive system overview showing component relationships
        </Typography>
      </Box>

      {/* Outer Box Wrapper with animation */}
      <Box
        sx={{
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 3,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          backgroundColor: "#212121",
          maxWidth: "1000px",
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          transition: "all 0.4s ease-in-out",
          position: "relative",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 40px rgba(76, 175, 80, 0.15)"
          },
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            borderRadius: "3px 3px 0 0"
          }
        }}
      >
        {/* Frontend - with tooltip */}
        <Tooltip title="User interface built with React and Material-UI components" placement="top" arrow>
          <Box 
            sx={{ 
              width: "340px", 
              textAlign: "center", 
              backgroundColor: "#2a2a2a", 
              borderRadius: 2,
              p: 3,
              borderLeft: "4px solid #4CAF50",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                backgroundColor: "#323232",
              },
              animation: "fadeInRight 0.6s ease-out",
              "@keyframes fadeInRight": {
                "0%": { opacity: 0, transform: "translateX(-20px)" },
                "100%": { opacity: 1, transform: "translateX(0)" }
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              {/* React icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="#4CAF50" />
                <path d="M12 22.5C11.3212 22.5 10.5 21.0507 10.5 18.8012C10.5 17.4461 10.3295 16.005 10.0114 14.5864C9.69912 13.1979 9.24316 11.8628 8.67969 10.6683C8.11621 9.47383 7.46549 8.41992 6.81476 7.60132C6.16404 6.78271 5.47266 6.19922 4.85986 6.05127C4.5498 5.97729 4.29639 6.02979 4.13135 6.13477C3.54541 6.47607 3.26025 7.38599 3.36523 8.61084C3.47021 9.82593 3.96533 11.2766 4.72827 12.7983C5.48535 14.3027 6.49609 15.8187 7.69775 17.262C9.09668 18.9106 10.4956 20.1675 11.6973 20.8183C11.8739 20.9049 12.126 20.9049 12.3027 20.8183C13.5044 20.1675 14.9033 18.9106 16.3022 17.262C17.5039 15.8187 18.5146 14.3027 19.2717 12.7983C20.0347 11.2766 20.5298 9.82593 20.6348 8.61084C20.7397 7.38599 20.4546 6.47607 19.8687 6.13477C19.7036 6.02979 19.4502 5.97729 19.1401 6.05127C18.5273 6.19922 17.836 6.78271 17.1852 7.60132C16.5345 8.41992 15.8838 9.47382 15.3203 10.6683C14.7568 11.8628 14.3009 13.1979 13.9886 14.5864C13.6705 16.005 13.5 17.4461 13.5 18.8012C13.5 21.0507 12.6788 22.5 12 22.5Z" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 1.5C12.6788 1.5 13.5 2.94928 13.5 5.19885C13.5 6.55396 13.6705 7.99499 13.9886 9.41357C14.3009 10.8021 14.7568 12.1372 15.3203 13.3317C15.8838 14.5262 16.5345 15.5801 17.1852 16.3987C17.836 17.2173 18.5273 17.8008 19.1401 17.9487C19.4502 18.0227 19.7036 17.9702 19.8687 17.8652C20.4546 17.5239 20.7397 16.614 20.6348 15.3892C20.5298 14.1741 20.0347 12.7234 19.2717 11.2017C18.5146 9.69726 17.5039 8.18127 16.3022 6.73804C14.9033 5.08936 13.5044 3.83252 12.3027 3.18169C12.126 3.0951 11.8739 3.0951 11.6973 3.18169C10.4956 3.83252 9.09668 5.08936 7.69775 6.73804C6.49609 8.18127 5.48535 9.69726 4.72827 11.2017C3.96533 12.7234 3.47021 14.1741 3.36523 15.3892C3.26025 16.614 3.54541 17.5239 4.13135 17.8652C4.29639 17.9702 4.5498 18.0227 4.85986 17.9487C5.47266 17.8008 6.16404 17.2173 6.81476 16.3987C7.46549 15.5801 8.11621 14.5262 8.67969 13.3317C9.24316 12.1372 9.69912 10.8021 10.0114 9.41357C10.3295 7.99499 10.5 6.55396 10.5 5.19885C10.5 2.94928 11.3212 1.5 12 1.5Z" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Typography variant="h6" color="#ffffff" fontWeight={600}>Frontend (React + MUI)</Typography>
            </Box>
            <Typography variant="body2" color="#b0b0b0" sx={{ mt: 1 }}>• Components & Dependencies</Typography>
          </Box>
        </Tooltip>

        {/* Arrow with animation */}
        <Box sx={{ 
          position: "relative", 
          height: "40px", 
          width: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Box sx={{ 
            position: "absolute", 
            width: "4px", 
            height: "20px", 
            backgroundColor: "#4CAF50",
            animation: "arrowPulse 1.5s infinite",
            "@keyframes arrowPulse": {
              "0%": { opacity: 0.6, height: "20px" },
              "50%": { opacity: 1, height: "30px" },
              "100%": { opacity: 0.6, height: "20px" }
            }
          }}/>
          <Box sx={{ 
            position: "absolute", 
            width: "12px", 
            height: "12px", 
            bottom: "5px", 
            borderRight: "4px solid #4CAF50",
            borderBottom: "4px solid #4CAF50",
            transform: "rotate(45deg)"
          }}/>
          <Box sx={{ 
            position: "absolute", 
            width: "12px", 
            height: "12px", 
            top: "5px", 
            borderRight: "4px solid #4CAF50",
            borderBottom: "4px solid #4CAF50",
            transform: "rotate(-135deg)"
          }}/>
        </Box>

        {/* Database, Backend & Cloud Row */}
        <Box 
          display="flex" 
          gap={{ xs: 2, md: 4 }} 
          alignItems="center" 
          flexWrap={{ xs: "wrap", md: "nowrap" }} 
          justifyContent="center"
          sx={{
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" }
            }
          }}
        >
          {/* MySQL Database - with tooltip */}
          <Tooltip title="MySQL database for persistent data storage" placement="top" arrow>
            <Box 
              sx={{ 
                width: { xs: "130px", md: "160px" }, 
                textAlign: "center", 
                backgroundColor: "rgba(42, 42, 42, 0.9)", 
                p: 2.5,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 16px rgba(76, 175, 80, 0.2)",
                  backgroundColor: "#323232"
                },
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "#4CAF50",
                  borderRadius: "0 0 2px 2px"
                }
              }}
            >
              <Box 
                sx={{ 
                  fontSize: "64px", 
                  color: "#b0b0b0",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Database icon with animation */}
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C16.4183 8 20 6.88071 20 5.5C20 4.11929 16.4183 3 12 3C7.58172 3 4 4.11929 4 5.5C4 6.88071 7.58172 8 12 8Z" stroke="#4CAF50" strokeWidth="1.5"/>
                  <path d="M4 5.5V11.5C4 12.8807 7.58172 14 12 14C16.4183 14 20 12.8807 20 11.5V5.5" stroke="#4CAF50" strokeWidth="1.5"/>
                  <path d="M4 11.5V17.5C4 18.8807 7.58172 20 12 20C16.4183 20 20 18.8807 20 17.5V11.5" stroke="#4CAF50" strokeWidth="1.5"/>
                </svg>
              </Box>
              <Typography variant="body1" color="#ffffff" fontWeight={600} sx={{ mb: 0.5 }}>MySQL DB</Typography>
              <Typography variant="caption" color="#9E9E9E">Data Storage</Typography>
            </Box>
          </Tooltip>

          {/* Animated connector */}
          <Box sx={{ 
            position: "relative", 
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Box sx={{ 
              position: "absolute", 
              height: "3px", 
              width: "20px", 
              backgroundColor: "#4CAF50",
              animation: "connectorPulse 1.5s infinite",
              "@keyframes connectorPulse": {
                "0%": { opacity: 0.6, width: "20px" },
                "50%": { opacity: 1, width: "30px" },
                "100%": { opacity: 0.6, width: "20px" }
              }
            }}/>
            <Box sx={{ 
              position: "absolute", 
              width: "8px", 
              height: "8px", 
              right: "5px", 
              borderTop: "3px solid #4CAF50",
              borderRight: "3px solid #4CAF50",
              transform: "rotate(45deg)"
            }}/>
            <Box sx={{ 
              position: "absolute", 
              width: "8px", 
              height: "8px", 
              left: "5px", 
              borderTop: "3px solid #4CAF50",
              borderLeft: "3px solid #4CAF50",
              transform: "rotate(-45deg)"
            }}/>
          </Box>

          {/* Spring Boot Backend - with tooltip */}
          <Tooltip title="Spring Boot backend handling business logic, authentication, and API requests" placement="top" arrow>
            <Box 
              sx={{ 
                width: "340px", 
                textAlign: "center", 
                backgroundColor: "#2a2a2a", 
                borderRadius: 2,
                p: 3,
                borderLeft: "4px solid #4CAF50",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  backgroundColor: "#323232"
                },
                position: "relative",
               
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                {/* Spring Boot icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C14.5 22 16.5 17.5228 16.5 12C16.5 6.47715 14.5 2 12 2C9.5 2 7.5 6.47715 7.5 12C7.5 17.5228 9.5 22 12 22Z" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Typography variant="h6" color="#ffffff" fontWeight={600}>Spring Boot Backend</Typography>
              </Box>
              <Typography variant="body2" color="#b0b0b0" sx={{ mt: 1 }}>• JWT Auth, Java Mailer, Rest API</Typography>
            </Box>
          </Tooltip>

          {/* Animated connector */}
          <Box sx={{ 
            position: "relative", 
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Box sx={{ 
              position: "absolute", 
              height: "3px", 
              width: "20px", 
              backgroundColor: "#4CAF50",
              animation: "connectorPulse 1.5s infinite",
              animationDelay: "0.2s",
              "@keyframes connectorPulse": {
                "0%": { opacity: 0.6, width: "20px" },
                "50%": { opacity: 1, width: "30px" },
                "100%": { opacity: 0.6, width: "20px" }
              }
            }}/>
            <Box sx={{ 
              position: "absolute", 
              width: "8px", 
              height: "8px", 
              right: "5px", 
              borderTop: "3px solid #4CAF50",
              borderRight: "3px solid #4CAF50",
              transform: "rotate(45deg)"
            }}/>
            <Box sx={{ 
              position: "absolute", 
              width: "8px", 
              height: "8px", 
              left: "5px", 
              borderTop: "3px solid #4CAF50",
              borderLeft: "3px solid #4CAF50",
              transform: "rotate(-45deg)"
            }}/>
          </Box>

          {/* Cloud Storage - with tooltip */}
          <Tooltip title="Cloud storage for application files and assets" placement="top" arrow>
            <Box 
              sx={{ 
                width: { xs: "130px", md: "160px" }, 
                textAlign: "center", 
                backgroundColor: "rgba(42, 42, 42, 0.9)", 
                p: 2.5,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 16px rgba(76, 175, 80, 0.2)",
                  backgroundColor: "#323232"
                },
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "#4CAF50",
                  borderRadius: "0 0 2px 2px"
                }
              }}
            >
              <Box 
                sx={{ 
                  fontSize: "64px", 
                  color: "#b0b0b0",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Cloud icon with animation */}
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 19C3.46243 19 1 16.5376 1 13.5C1 10.4624 3.46243 8 6.5 8C6.93035 8 7.34844 8.04932 7.75 8.14M16.5 19C19.5376 19 22 16.5376 22 13.5C22 10.4624 19.5376 8 16.5 8C16.0697 8 15.6516 8.04932 15.25 8.14M7.75 8.14C7.53333 7.47132 7.5 6.75514 7.5 6C7.5 3.23858 9.73858 1 12.5 1C15.2614 1 17.5 3.23858 17.5 6C17.5 6.76195 17.331 7.47288 17.25 8.14M7.75 8.14C7.94648 8.19453 8.1358 8.26165 8.31732 8.34085M15.25 8.14C15.0535 8.19453 14.8642 8.26165 14.6827 8.34085" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              <Typography variant="body1" color="#ffffff" fontWeight={600} sx={{ mb: 0.5 }}>Cloud Storage</Typography>
              <Typography variant="caption" color="#9E9E9E">Files & Assets</Typography>
            </Box>
          </Tooltip>
        </Box>

        {/* Arrow with animation */}
        <Box sx={{ 
          position: "relative", 
          height: "40px", 
          width: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Box sx={{ 
            position: "absolute", 
            width: "4px", 
            height: "20px", 
            backgroundColor: "#4CAF50",
            animation: "arrowPulse 1.5s infinite",
            animationDelay: "0.3s",
            "@keyframes arrowPulse": {
              "0%": { opacity: 0.6, height: "20px" },
              "50%": { opacity: 1, height: "30px" },
              "100%": { opacity: 0.6, height: "20px" }
            }
          }}/>
          <Box sx={{ 
            position: "absolute", 
            width: "12px", 
            height: "12px", 
            bottom: "5px", 
            borderRight: "4px solid #4CAF50",
            borderBottom: "4px solid #4CAF50",
            transform: "rotate(45deg)"
          }}/>
          <Box sx={{ 
            position: "absolute", 
            width: "12px", 
            height: "12px", 
            top: "5px", 
            borderRight: "4px solid #4CAF50",
            borderBottom: "4px solid #4CAF50",
            transform: "rotate(-135deg)"
          }}/>
        </Box>

        {/* Flask API & ML - with tooltip */}
        <Tooltip title="Flask API running machine learning models for accent analysis" placement="bottom" arrow>
          <Box 
            sx={{ 
              width: "340px", 
              textAlign: "center", 
              backgroundColor: "#2a2a2a", 
              borderRadius: 2,
              p: 3,
              borderLeft: "4px solid #4CAF50",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                backgroundColor: "#323232"
              },
              animation: "fadeInLeft 0.6s ease-out",
              "@keyframes fadeInLeft": {
                "0%": { opacity: 0, transform: "translateX(20px)" },
                "100%": { opacity: 1, transform: "translateX(0)" }
              },
              position: "relative",
              
              
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              {/* Flask/ML icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                <path d="M9 3H15M10 3V7.5L4 15.5V16.5C4 17.6046 4 18.1569 4.22836 18.5556C4.42914 18.9088 4.72721 19.2069 5.08042 19.4077C5.47725 19.6361 6.0295 19.6361 7.13397 19.6361H16.866C17.9705 19.6361 18.5228 19.6361 18.9196 19.4077C19.2728 19.2069 19.5709 18.9088 19.7716 18.5556C20 18.1569 20 17.6046 20 16.5V15.5L14 7.5V3" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 10L17 14" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Typography variant="h6" color="#ffffff" fontWeight={600}>Flask API</Typography>
            </Box>
            <Typography variant="body2" color="#b0b0b0" sx={{ mt: 1 }}>• Machine Learning for Accent Analysis</Typography>
          </Box>
        </Tooltip>
      </Box>

      {/* Legend/explanation */}
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          gap: 1,
          mt: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: "rgba(33, 33, 33, 0.5)",
          backdropFilter: "blur(10px)",
          animation: "fadeIn 1s ease-out",
          animationDelay: "0.5s",
          animationFillMode: "both"
        }}
      >
        <Typography variant="body2" color="#E0E0E0" fontWeight={500}>
          <span style={{ color: "#4CAF50", fontWeight: "bold" }}>HOW IT WORKS:</span> Our application uses a modern architecture with React frontend for the user interface, Spring Boot backend for business logic, and a Flask API for machine learning capabilities.
        </Typography>
        <Typography variant="caption" color="#9E9E9E" sx={{ textAlign: "center", mt: 1 }}>
          Hover over each component to learn more about its role in the system
        </Typography>
      </Box>
    </Box>
  );
}
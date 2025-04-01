

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ExitToApp as LogoutIcon,
  Mic as MicIcon,
} from "@mui/icons-material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate } from "react-router-dom";
import ProfilePopover from "../Pages/Profile/ProfilePopover";
import apiRequest from "../Services/apiService";


const Header = ({ handleLogout }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileChange, setProfileChange] = useState(false);


  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    async function fetchdata (){
      const response = await apiRequest("GET", "/api/user/profile", null, true);
      if (response.success) {
        setUserProfile(response.data); 
      }
      else{
        console.error(`Error (${response.status}):`, response.error);     
      } 
    }
        
    fetchdata();

    // Update userProfile when it changes in localStorage
    
    // const storedProfile = localStorage.getItem('userProfile');
    // return storedProfile ? JSON.parse(storedProfile) : {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   email: 'john.doe@example.com',
    //   avatar: '/api/placeholder/200/200'
    // };

    // window.addEventListener('storage', handleStorageChange);
    // return () => window.removeEventListener('storage', handleStorageChange);
  }, [profileChange]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, action: () => navigate('/dashboard/home') },
    { text: "History", icon: <ManageSearchIcon/>, action: () => navigate('/dashboard/history')},
    { text: "About", icon: <InfoIcon />, action: () => navigate('/dashboard/about') },
  ];

  // Add logout function that closes any open menus
  const handleLogoutClick = () => {
    setMenuOpen(false);
    setAnchorEl(null);
    handleLogout();
  };

  return (
    <header>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#121212",
          borderBottom: "1px solid rgba(81, 81, 81, 0.3)",
          width: "100%"
        }}
      >
        <Toolbar sx={{ py: 1, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar
              sx={{
                bgcolor: "#4CAF50",
                mr: 2,
                ml: 1,
                width: 40,
                height: 40,
              }}
            >
              <MicIcon />
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px",
              }}
            >
              AccentAI
            </Typography>
          </Box>

          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={handleProfileClick}
                sx={{
                  p: 0,
                  mr: 1,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
               
              </IconButton>
              
              <IconButton
                color="inherit"
                onClick={handleMenuToggle}
                sx={{
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={menuOpen}
                onClose={handleMenuToggle}
                PaperProps={{
                  sx: {
                    bgcolor: "#1E1E1E",
                    color: "#fff",
                    width: "80vw",
                    maxWidth: "300px",
                  },
                }}
              >
                <Box sx={{ py: 2, px: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                        <MicIcon />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        AccentAI
                      </Typography>
                    </Box>
                    
                    <IconButton 
                      onClick={handleMenuToggle}
                      sx={{ color: "#fff" }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />
                  
                  {/* User Profile Section at the top of drawer */}
                  <Box sx={{ py: 2, px: 2, display: "flex", alignItems: "center" }}>
                    <Avatar 
                      src={userProfile.avatar} 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mr: 2,
                        border: "2px solid #4CAF50" 
                      }}
                      onClick={handleProfileClick}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {`${userProfile.firstName} ${userProfile.lastName}`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {userProfile.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />
                  
                  <List>
                    {menuItems.map((item) => (
                      <ListItem
                        key={item.text}
                        button
                        onClick={() => {
                          item.action();
                          setMenuOpen(false);
                        }}
                        sx={{
                          borderRadius: 1,
                          my: 0.5,
                          "&:hover": { bgcolor: "rgba(76, 175, 80, 0.12)" },
                        }}
                      >
                        <ListItemIcon sx={{ color: "#4CAF50", minWidth: 40 }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                    
                    <Divider sx={{ my: 1, bgcolor: "rgba(255, 255, 255, 0.12)" }} />
                    
                    {/* Logout Button */}
                    <ListItem
                      button
                      onClick={handleLogoutClick}
                      sx={{
                        borderRadius: 1,
                        my: 0.5,
                        "&:hover": { bgcolor: "rgba(255, 0, 0, 0.08)" },
                      }}
                    >
                      <ListItemIcon sx={{ color: "#ff5252", minWidth: 40 }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
          ) : (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center",
              gap: "8px",
              mr: 1
            }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={item.action}
                  sx={{
                    px: 1.5,
                    color: "#E0E0E0",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      color: "#fff",
                    },
                    textTransform: "none",
                    fontWeight: 500,
                    minWidth: "auto",
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* Desktop Profile Avatar */}
              <IconButton
                onClick={handleProfileClick}
                sx={{
                  p: 0,
                  width: 40,
                  height: 40,
                  ml: 0.5,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <Avatar 
                  src={userProfile.avatar} 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    border: "2px solid #4CAF50",
                  }} 
                />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <ProfilePopover 
        anchorEl={anchorEl} 
        handleClose={handleProfileClose}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleLogout={handleLogoutClick}
        setprofileChange={setProfileChange}
      />
    </header>
  );
};

export default Header;
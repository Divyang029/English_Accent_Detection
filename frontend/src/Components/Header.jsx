import React, { useState } from "react";
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
  Container,
  Box,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Mic as MicIcon,
} from "@mui/icons-material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNavigate } from "react-router-dom";

const Header = ({ handleLogout }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, action: () => {navigate('/dashboard/home') } },
    { text: "History" ,icon: <ManageSearchIcon/>, action: () => { navigate('/dashboard/history')}},
    { text: "About", icon: <InfoIcon />, action: () => { navigate('/dashboard/about') } },
    { text: "Profile", icon: <PersonIcon />, action: () => { } },
    { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
  ];

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
        {/* <Container maxWidth="lg"> */}
        <Toolbar
          sx={{
            py: 1,
            justifyContent: "space-between", // Ensures content is evenly spaced
          }}
        >
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
            <Box sx={{ display: "flex" }}>
              <IconButton
                color="inherit"
                onClick={handleMenuToggle}
                sx={{
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
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
                    width: "80vw", // Responsive drawer width
                    maxWidth: "320px", // Prevents it from becoming too wide
                  },
                }}
              >
                <Box sx={{ py: 2, px: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                      <MicIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      AccentAI
                    </Typography>
                  </Box>
                  <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />
                  <List>
                    {menuItems.map((item, index) => (
                      <React.Fragment key={item.text}>
                        <ListItem
                          button
                          onClick={() => {
                            item.action();
                            setMenuOpen(false);
                          }}
                          sx={{
                            borderRadius: 1,
                            my: 0.5,
                            "&:hover": {
                              bgcolor: "rgba(76, 175, 80, 0.12)",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: "#4CAF50", minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItem>
                        {index === menuItems.length - 2 && (
                          <Divider sx={{ my: 1, bgcolor: "rgba(255, 255, 255, 0.12)" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {menuItems.slice(0, 3).map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={item.action}
                  sx={{
                    mx: 1,
                    color: "#E0E0E0",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      color: "#fff",
                    },
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </Button>
              ))}

              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  ml: 2,
                  mr: 4,
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  "&:hover": {
                    bgcolor: "rgba(76, 175, 80, 0.08)",
                    borderColor: "#4CAF50",
                  },
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: 1.5,
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>

        {/* </Container> */}
      </AppBar>
    </header>
  );
};

export default Header;





// const Header = ({ handleLogout }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleMenuToggle = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const menuItems = [
//     { text: "Home", icon: <HomeIcon />, action: () => {} },
//     { text: "About", icon: <InfoIcon />, action: () => {} },
//     { text: "Profile", icon: <PersonIcon />, action: () => {} },
//     { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
//   ];

//   return (
//     <header>
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{
//           bgcolor: "#121212",
//           borderBottom: "1px solid rgba(81, 81, 81, 0.3)",
//         }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar sx={{ py: 1 }}>
//             <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//               <Avatar
//                 sx={{
//                   bgcolor: "#4CAF50",
//                   mr: 2,
//                   width: 40,
//                   height: 40,
//                 }}
//               >
//                 <MicIcon />
//               </Avatar>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   letterSpacing: "0.5px",
//                 }}
//               >
//                 AccentAI
//               </Typography>
//             </Box>

//             {isMobile ? (
//               <>
//                 <IconButton
//                   color="inherit"
//                   onClick={handleMenuToggle}
//                   sx={{
//                     color: "#fff",
//                     "&:hover": {
//                       bgcolor: "rgba(255, 255, 255, 0.08)",
//                     },
//                   }}
//                 >
//                   <MenuIcon />
//                 </IconButton>

//                 <Drawer
//                   anchor="right"
//                   open={menuOpen}
//                   onClose={handleMenuToggle}
//                   PaperProps={{
//                     sx: {
//                       bgcolor: "#1E1E1E",
//                       color: "#fff",
//                       width: 280,
//                     },
//                   }}
//                 >
//                   <Box sx={{ py: 2, px: 1 }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         px: 2,
//                         mb: 2,
//                       }}
//                     >
//                       <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
//                         <MicIcon />
//                       </Avatar>
//                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         AccentAI
//                       </Typography>
//                     </Box>

//                     <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />

//                     <List>
//                       {menuItems.map((item, index) => (
//                         <React.Fragment key={item.text}>
//                           <ListItem
//                             button
//                             onClick={() => {
//                               item.action();
//                               setMenuOpen(false);
//                             }}
//                             sx={{
//                               borderRadius: 1,
//                               my: 0.5,
//                               "&:hover": {
//                                 bgcolor: "rgba(76, 175, 80, 0.12)",
//                               },
//                             }}
//                           >
//                             <ListItemIcon
//                               sx={{ color: "#4CAF50", minWidth: 40 }}
//                             >
//                               {item.icon}
//                             </ListItemIcon>
//                             <ListItemText primary={item.text} />
//                           </ListItem>
//                           {index === menuItems.length - 2 && (
//                             <Divider
//                               sx={{ my: 1, bgcolor: "rgba(255, 255, 255, 0.12)" }}
//                             />
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </List>
//                   </Box>
//                 </Drawer>
//               </>
//             ) : (
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 {menuItems.slice(0, 3).map((item) => (
//                   <Button
//                     key={item.text}
//                     color="inherit"
//                     startIcon={item.icon}
//                     onClick={item.action}
//                     sx={{
//                       mx: 1,
//                       color: "#E0E0E0",
//                       "&:hover": {
//                         bgcolor: "rgba(255, 255, 255, 0.08)",
//                         color: "#fff",
//                       },
//                       textTransform: "none",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {item.text}
//                   </Button>
//                 ))}

//                 <Button
//                   variant="outlined"
//                   startIcon={<LogoutIcon />}
//                   onClick={handleLogout}
//                   sx={{
//                     ml: 2,
//                     borderColor: "#4CAF50",
//                     color: "#4CAF50",
//                     "&:hover": {
//                       bgcolor: "rgba(76, 175, 80, 0.08)",
//                       borderColor: "#4CAF50",
//                     },
//                     textTransform: "none",
//                     fontWeight: 500,
//                     borderRadius: 1.5,
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </Box>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </header>
//   );
// };

// export default Header;
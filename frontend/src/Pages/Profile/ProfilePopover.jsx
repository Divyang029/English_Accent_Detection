// import React, { useState, useEffect } from 'react';
// import {
//   Popover,
//   Box,
//   Typography,
//   Avatar,
//   Divider,
//   Button,
//   TextField,
//   Snackbar,
//   Alert,
//   Grid,
//   IconButton
// } from '@mui/material';
// import { 
//   Edit as EditIcon, 
//   Close as CloseIcon,
//   AddAPhoto as AddAPhotoIcon,
//   Check as CheckIcon,
//   Cancel as CancelIcon
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const ProfilePopover = ({ 
//   anchorEl, 
//   handleClose, 
//   userProfile, 
//   setUserProfile, 
//   handleLogout 
// }) => {
//   const navigate = useNavigate();
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editProfile, setEditProfile] = useState({
//     firstName: userProfile?.firstName || 'Guest',
//     lastName: userProfile?.lastName || 'User',
//     email: userProfile?.email || 'guest123@gmail.com',
//     avatar: userProfile?.avatar || '/default-avatar.png'
//   });
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // Update editProfile when userProfile changes
//   useEffect(() => {
    
//     if (userProfile) {
//       setEditProfile({
//         firstName: userProfile.firstName || 'Guest',
//         lastName: userProfile.lastName || 'User',
//         email: userProfile.email || 'guest123@gmail.com',
//         avatar: userProfile.avatar || '/default-avatar.png'
//       });
//     }
//   }, [userProfile]);

//   const handleEditToggle = () => {
//     setIsEditMode(!isEditMode);
//     if (userProfile) {
//       setEditProfile({ ...userProfile });
//     }
//   };

//   const handleProfileUpdate = () => {
//     if (!editProfile.firstName.trim() || !editProfile.lastName.trim()) {
//       setSnackbarMessage('Please fill all required fields');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     const updatedProfile = {
//       ...editProfile,
//       firstName: editProfile.firstName.trim(),
//       lastName: editProfile.lastName.trim()
//     };

//     localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
//     setUserProfile(updatedProfile);
//     setIsEditMode(false);
    
//     // Trigger the storage event manually to update other components
//     window.dispatchEvent(new Event('storage'));
    
//     handleClose();
    
//     setSnackbarMessage('Profile updated successfully!');
//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.type.match('image.*')) {
//       setSnackbarMessage('Please select an image file');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       setSnackbarMessage('Image size should be less than 2MB');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setEditProfile({
//         ...editProfile,
//         avatar: reader.result
//       });
//       setSnackbarMessage('Profile picture updated');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     };
//     reader.onerror = () => {
//       setSnackbarMessage('Error loading image');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <>
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         PaperProps={{
//           sx: {
//             width: { xs: '90vw', sm: 320 },
//             maxWidth: 320,
//             bgcolor: '#212121',
//             color: '#fff',
//             borderRadius: 2,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
//             border: '1px solid rgba(255,255,255,0.1)',
//             mt: 1,
//             mr: { xs: 1, sm: 2 },
//             p: 2,
//           }
//         }}
//       >
//         {!isEditMode ? (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Avatar 
//                 src={userProfile?.avatar || '/default-avatar.png'} 
//                 sx={{ 
//                   width: 80, 
//                   height: 80, 
//                   mr: 2,
//                   border: '3px solid #4CAF50' 
//                 }} 
//               />
//               <Box>
//                 <Typography variant="h6" sx={{ color: '#fff' }}>
//                   {`${userProfile?.firstName || 'Guest'} ${userProfile?.lastName || 'User'}`}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
//                   {userProfile?.email || 'guest123@gmail.com'}
//                 </Typography>
//               </Box>
//             </Box>
            
//             <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <Button
//                 startIcon={<EditIcon />}
//                 onClick={handleEditToggle}
//                 sx={{
//                   color: '#4CAF50',
//                   textTransform: 'none',
//                   '&:hover': { 
//                     bgcolor: 'rgba(76, 175, 80, 0.1)' 
//                   }
//                 }}
//               >
//                 Edit Profile
//               </Button>
//             </Box>
            
//             <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            
//             <Button
//               fullWidth
//               startIcon={<CloseIcon />}
//               onClick={handleLogout}
//               sx={{
//                 color: '#fff',
//                 textTransform: 'none',
//                 bgcolor: 'rgba(255,255,255,0.1)',
//                 '&:hover': { 
//                   bgcolor: 'rgba(255,255,255,0.2)' 
//                 }
//               }}
//             >
//               Logout
//             </Button>
//           </Box>
//         ) : (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Box sx={{ position: 'relative' }}>
//                 <Avatar 
//                   src={editProfile.avatar || '/default-avatar.png'} 
//                   sx={{ 
//                     width: 80, 
//                     height: 80, 
//                     mr: 2,
//                     border: '3px solid #4CAF50' 
//                   }} 
//                 />
//                 <IconButton
//                   component="label"
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: "16px",
//                     bgcolor: "#4CAF50",
//                     color: "white",
//                     width: 32,
//                     height: 32,
//                     "&:hover": {
//                       bgcolor: "#45a049",
//                     },
//                   }}
//                 >
//                   <AddAPhotoIcon sx={{ width: 20, height: 20 }} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     style={{
//                       position: "absolute",
//                       width: 0,
//                       height: 0,
//                       opacity: 0,
//                       overflow: "hidden",
//                       zIndex: -1,
//                     }}
//                   />
//                 </IconButton>
//               </Box>
//               <Box>
//                 <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
//                   Edit Profile
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
//                   Update your details below
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   variant="outlined"
//                   value={editProfile.firstName}
//                   onChange={(e) => setEditProfile({...editProfile, firstName: e.target.value})}
//                   sx={{
//                     mb: 2,
//                     '& .MuiOutlinedInput-root': {
//                       bgcolor: 'rgba(255,255,255,0.1)',
//                       '& fieldset': {
//                         borderColor: 'rgba(255,255,255,0.3)',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#4CAF50',
//                       },
//                       '& input': {
//                         color: '#fff',
//                       },
//                     },
//                     '& .MuiInputLabel-root': {
//                       color: 'rgba(255,255,255,0.7)',
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   variant="outlined"
//                   value={editProfile.lastName}
//                   onChange={(e) => setEditProfile({...editProfile, lastName: e.target.value})}
//                   sx={{
//                     mb: 2,
//                     '& .MuiOutlinedInput-root': {
//                       bgcolor: 'rgba(255,255,255,0.1)',
//                       '& fieldset': {
//                         borderColor: 'rgba(255,255,255,0.3)',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#4CAF50',
//                       },
//                       '& input': {
//                         color: '#fff',
//                       },
//                     },
//                     '& .MuiInputLabel-root': {
//                       color: 'rgba(255,255,255,0.7)',
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               value={editProfile.email}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   bgcolor: 'rgba(255,255,255,0.05)',
//                   '& fieldset': {
//                     borderColor: 'rgba(255,255,255,0.1)',
//                   },
//                   '& input': {
//                     color: 'rgba(255,255,255,0.5)',
//                   },
//                 },
//                 '& .MuiInputLabel-root': {
//                   color: 'rgba(255,255,255,0.5)',
//                 },
//               }}
//             />

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button
//                 onClick={handleEditToggle}
//                 startIcon={<CancelIcon />}
//                 sx={{
//                   color: '#9E9E9E',
//                   textTransform: 'none',
//                   mr: 1,
//                   '&:hover': {
//                     bgcolor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleProfileUpdate}
//                 startIcon={<CheckIcon />}
//                 sx={{
//                   color: '#4CAF50',
//                   textTransform: 'none',
//                   '&:hover': {
//                     bgcolor: 'rgba(76, 175, 80, 0.1)'
//                   }
//                 }}
//               >
//                 Save Changes
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Popover>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={handleSnackbarClose} 
//           severity={snackbarSeverity} 
//           sx={{ width: '100%' }}
//           variant="filled"
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default ProfilePopover;



import React, { useState, useEffect } from 'react';
import {
  Popover,
  Box,
  Typography,
  Avatar,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
  Grid,
  IconButton,
  CircularProgress
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Close as CloseIcon,
  AddAPhoto as AddAPhotoIcon,
  Check as CheckIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProfilePopover = ({ 
  anchorEl, 
  handleClose,
  handleLogout,
  setprofileChange,
  userProfile
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [UserProfile, setUserProfile] = useState(null);
  const [editProfile, setEditProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: ''
  });
  const [originalProfile, setOriginalProfile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Fetch user profile from API when the popover opens
  useEffect(() => {
    if (Boolean(anchorEl)) {
      fetchUserProfile();
    }
  }, [anchorEl]);

  const fetchUserProfile = async () => {
    setLoading(true);
    
    const userData = userProfile;
    setUserProfile(userData);
    setEditProfile({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      avatar: userData.avatar || '/default-avatar.png'
    });
    setOriginalProfile({...userData});
    setLoading(false);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Entering edit mode - reset to current profile
      setEditProfile({...UserProfile});
      setImageFile(null);
    }
  };

  const handleProfileUpdate = async () => {
    if (!editProfile.firstName.trim() || !editProfile.lastName.trim()) {
      setSnackbarMessage('Please fill all required fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      
      // Only add changed fields to form data
      if (editProfile.firstName !== originalProfile.firstName) {
        formData.append('firstName', editProfile.firstName.trim());
      }
      
      if (editProfile.lastName !== originalProfile.lastName) {
        formData.append('lastName', editProfile.lastName.trim());
      }
      
      // Add image if a new one was selected
      if (imageFile) {
        formData.append('avatar', imageFile);
      }
      
      // Only make API call if there are changes
      if (formData.has('firstName') || formData.has('lastName') || formData.has('avatar')) {
        const url = `${API_BASE_URL}/api/user/profile`;

          const options = {
            method: 'PUT',
            headers: {},
            body: formData
          };
          
          if (token) {
            options.headers["Authorization"] = `Bearer ${token}`;
          }
          
          const response = await fetch(url, options);
        
        // Update local user profile with new data
        setUserProfile(response.data);
        setOriginalProfile({...response.data});
        
        setSnackbarMessage('Profile updated successfully!');
        setSnackbarSeverity('success');
        setprofileChange((val) => { !val });
      } else {
        setSnackbarMessage('No changes to update');
        setSnackbarSeverity('info');
      }
      
      setIsEditMode(false);
      handleClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarMessage(error.response?.data?.message || 'Failed to update profile');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    
    setLoading(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setSnackbarMessage('Please select an image file');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSnackbarMessage('Image size should be less than 2MB');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setImageFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditProfile({
        ...editProfile,
        avatar: reader.result
      });
    };
    reader.onerror = () => {
      setSnackbarMessage('Error loading image');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: { xs: '90vw', sm: 320 },
            maxWidth: 320,
            bgcolor: '#212121',
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            mt: 1,
            mr: { xs: 1, sm: 2 },
            p: 2,
          }
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress sx={{ color: '#4CAF50' }} />
          </Box>
        ) : !isEditMode ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={UserProfile?.avatar || '/default-avatar.png'} 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mr: 2,
                  border: '3px solid #4CAF50' 
                }} 
              />
              <Box>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  {`${UserProfile?.firstName || 'Guest'} ${UserProfile?.lastName || 'User'}`}
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                  {UserProfile?.email || 'guest123@gmail.com'}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                startIcon={<EditIcon />}
                onClick={handleEditToggle}
                sx={{
                  color: '#4CAF50',
                  textTransform: 'none',
                  '&:hover': { 
                    bgcolor: 'rgba(76, 175, 80, 0.1)' 
                  }
                }}
              >
                Edit Profile
              </Button>
            </Box>
            
            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
            
            <Button
              fullWidth
              startIcon={<CloseIcon />}
              onClick={handleLogout}
              sx={{
                color: '#fff',
                textTransform: 'none',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.2)' 
                }
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  src={editProfile.avatar || '/default-avatar.png'} 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: 2,
                    border: '3px solid #4CAF50' 
                  }} 
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: "16px",
                    bgcolor: "#4CAF50",
                    color: "white",
                    width: 32,
                    height: 32,
                    "&:hover": {
                      bgcolor: "#45a049",
                    },
                  }}
                >
                  <AddAPhotoIcon sx={{ width: 20, height: 20 }} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      position: "absolute",
                      width: 0,
                      height: 0,
                      opacity: 0,
                      overflow: "hidden",
                      zIndex: -1,
                    }}
                  />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                  Edit Profile
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                  Update your details below
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={editProfile.firstName}
                  onChange={(e) => setEditProfile({...editProfile, firstName: e.target.value})}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4CAF50',
                      },
                      '& input': {
                        color: '#fff',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.7)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={editProfile.lastName}
                  onChange={(e) => setEditProfile({...editProfile, lastName: e.target.value})}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4CAF50',
                      },
                      '& input': {
                        color: '#fff',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.7)',
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={editProfile.email}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '& input': {
                    color: 'rgba(255,255,255,0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.5)',
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                onClick={handleEditToggle}
                startIcon={<CancelIcon />}
                sx={{
                  color: '#9E9E9E',
                  textTransform: 'none',
                  mr: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleProfileUpdate}
                startIcon={<CheckIcon />}
                disabled={loading}
                sx={{
                  color: '#4CAF50',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(76, 175, 80, 0.1)'
                  }
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#4CAF50' }} /> : 'Save Changes'}
              </Button>
            </Box>
          </Box>
        )}
      </Popover>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfilePopover;
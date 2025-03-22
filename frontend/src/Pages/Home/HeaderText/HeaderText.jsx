import {Box,Typography,} from "@mui/material";

const HeaderText = () => {
     return (
       <>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2, 
                color: "#fff", 
                fontWeight: 700,
                textShadow: "0px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              Discover Your Accent
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                color: "#9E9E9E", 
                fontWeight: 400,
                maxWidth: "700px",
                mx: "auto"
              }}
            >
              Record your voice or upload an audio file to analyze your accent with our AI technology.
            </Typography>
          </Box>
       </>   
     );
}

export default HeaderText;
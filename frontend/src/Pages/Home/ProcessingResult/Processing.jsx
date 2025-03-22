import {
    Box,
    Typography,
    LinearProgress,
    CircularProgress,
    Card,
  } from "@mui/material";

const Processing = () => {
    return ( 
        <>
            <Card 
              elevation={8}
              sx={{ 
                width: "100%", 
                maxWidth: "800px", 
                bgcolor: "#212121",
                p: 4,
                borderRadius: 2
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress 
                  size={60} 
                  thickness={4} 
                  sx={{ color: "#4CAF50", mb: 3 }} 
                />
                <Typography variant="h6" sx={{ color: "#E0E0E0", mb: 1 }}>
                  Analyzing your accent...
                </Typography>
                <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
                  Our AI is processing your speech patterns
                </Typography>
                <LinearProgress 
                  sx={{ 
                    mt: 3, 
                    bgcolor: "rgba(255,255,255,0.1)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#4CAF50"
                    }
                  }} 
                />
              </Box>
            </Card>
        </>
     );
}
 
export default Processing;
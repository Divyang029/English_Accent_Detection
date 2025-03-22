import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import {  
  Upload, 
} from "@mui/icons-material";

const UploadFile = ({uploadedFile,handleFileUpload}) => {
    return ( 
        <>
            <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  alignItems: "center", 
                  gap: 2,
                  flex: 1
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />} // Add the upload icon
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 3,
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    fontWeight: 600, // Bold text
                    textTransform: "uppercase", // Uppercase text
                    letterSpacing: "0.05em", // Slightly spaced letters
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    "&:hover": {
                      bgcolor: "rgba(76, 175, 80, 0.1)",
                      borderColor: "#4CAF50",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Upload Audio
                  <input   type="file" style={{ display: "none" }} accept="audio/*"  onChange={handleFileUpload} />
                </Button>
                {uploadedFile && (
                  <Typography variant="body2" sx={{ color: "#9E9E9E", textAlign: "center" }}>
                    {uploadedFile.name}
                  </Typography>
                )}
              </Box>
        </>
    );
}
 
export default UploadFile;
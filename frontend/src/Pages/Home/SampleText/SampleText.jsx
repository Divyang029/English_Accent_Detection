import {
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {  Language as LanguageIcon, } from "@mui/icons-material";

const SampleText = () => {

  const sampleText =
    "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood?";

  return (
    <>
      <Card
        elevation={8}
        sx={{
          p: 0,
          mb: 5,
          bgcolor: "#212121",
          borderRadius: 2,
          textAlign: "center",
          maxWidth: "800px",
          width: "100%",
          borderLeft: "4px solid #4CAF50",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: "#4CAF50",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1
            }}
          >
            <LanguageIcon /> Sample Reading Text
          </Typography>
          <Divider sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
          <Typography
            variant="body1"
            sx={{
              color: "#E0E0E0",
              fontStyle: "italic",
              lineHeight: 1.8,
              letterSpacing: 0.3
            }}
          >
            {sampleText}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default SampleText;



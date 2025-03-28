// import React from "react";
// import { Box, Card, CardContent, Typography } from "@mui/material";
// import StorageIcon from "@mui/icons-material/Storage";
// import CloudIcon from "@mui/icons-material/Cloud";

import ArchitectureDiagram from "./ArchitectureDiagram";

// const ArchitectureDiagram = () => {
//     return (
//         <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             gap={3}
//             sx={{ backgroundColor: "#121212", minHeight: "100vh", padding: 5, color: "#ffffff" }}
//         >
//             {/* Title */}
//             <Typography variant="h3" fontWeight="bold" color="#ffffff">
//                 Website Architecture
//             </Typography>

//             {/* Outer Box Wrapper */}
//             <Box
//                 sx={{
//                     border: "1px solid #2a2a2a",
//                     borderRadius: 3,
//                     padding: 4,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: 3,
//                     backgroundColor: "#1e1e1e",
//                 }}
//             >
//                 {/* Frontend */}
//                 <Card sx={{ width: 320, textAlign: "center", backgroundColor: "#2a2a2a", color: "#ffffff" }}>
//                     <CardContent>
//                         <Typography variant="h6" color="#ffffff">Frontend (React + MUI)</Typography>
//                         <Typography variant="body2" color="#b0b0b0">• Components & Dependencies</Typography>
//                     </CardContent>
//                 </Card>

//                 {/* Arrow */}
//                 <Typography variant="h5" color="#b0b0b0">⇅</Typography>

//                 {/* Database, Backend & Cloud Row */}
//                 <Box display="flex" gap={4} alignItems="center">
//                     {/* MySQL Database */}
//                     <Card sx={{ width: 150, textAlign: "center", backgroundColor: "#2a2a2a", color: "#ffffff" }}>
//                         <CardContent>
//                             <StorageIcon sx={{ fontSize: 80, color: "#b0b0b0" }} />
//                             <Typography variant="body2" color="#ffffff">MySQL DB</Typography>
//                         </CardContent>
//                     </Card>

//                     {/* Arrow between MySQL and Spring Boot */}
//                     <Typography variant="h5" color="#b0b0b0">⇆</Typography>

//                     {/* Spring Boot Backend */}
//                     <Card sx={{ width: 320, textAlign: "center", backgroundColor: "#2a2a2a", color: "#ffffff" }}>
//                         <CardContent>
//                             <Typography variant="h6" color="#ffffff">Spring Boot Backend</Typography>
//                             <Typography variant="body2" color="#b0b0b0">• JWT Auth, Java Mailer, Rest API</Typography>
//                         </CardContent>
//                     </Card>

//                     {/* Arrow between Spring Boot and Cloud */}
//                     <Typography variant="h5" color="#b0b0b0">⇆</Typography>

//                     {/* Cloud Storage */}
//                     <Card sx={{ width: 150, textAlign: "center", backgroundColor: "#2a2a2a", color: "#ffffff" }}>
//                         <CardContent>
//                             <CloudIcon sx={{ fontSize: 80, color: "#b0b0b0" }} />
//                             <Typography variant="body2" color="#ffffff">Cloud Storage</Typography>
//                         </CardContent>
//                     </Card>
//                 </Box>

//                 {/* Arrow */}
//                 <Typography variant="h5" color="#b0b0b0">⇅</Typography>

//                 {/* Flask API & ML */}
//                 <Card sx={{ width: 320, textAlign: "center", backgroundColor: "#2a2a2a", color: "#ffffff" }}>
//                     <CardContent>
//                         <Typography variant="h6" color="#ffffff">Flask API</Typography>
//                         <Typography variant="body2" color="#b0b0b0">• Machine Learning</Typography>
//                     </CardContent>
//                 </Card>
//             </Box>
//         </Box>
//     );
// };

// export default ArchitectureDiagram;


const About = () => {
    return (
        <ArchitectureDiagram/>
    );
}

export default About;


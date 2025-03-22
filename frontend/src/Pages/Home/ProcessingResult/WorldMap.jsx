// import { useState, useEffect } from "react";
// import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// import { Box, Paper, Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import apiRequest from "../../../Services/apiService";

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const countryCoordinates = {
//   "South Africa": [22.9375, -30.5595],
//   Albania: [20.1683, 41.1533],
//   Ethiopia: [39.7823, 9.145],
//   "Saudi Arabia": [45.0792, 23.8859],
//   Egypt: [30.8025, 26.8206],
//   Morocco: [-7.0926, 31.7917],
//   Lebanon: [35.8623, 33.8547],
//   UAE: [53.8478, 23.4241],
//   Armenia: [45.0382, 40.0691],
//   Bangladesh: [90.3563, 23.685],
//   "Bosnia and Herzegovina": [17.6791, 43.9159],
//   Bulgaria: [25.4858, 42.7339],
//   China: [104.1954, 35.8617],
//   Spain: [-3.7492, 40.4637],
//   Croatia: [15.2, 45.1],
//   "Czech Republic": [15.4729, 49.8175],
//   Denmark: [9.5018, 56.2639],
//   Netherlands: [5.2913, 52.1326],
//   Belgium: [4.4699, 50.5039],
//   USA: [-95.7129, 37.0902],
//   UK: [-3.436, 55.3781],
//   Canada: [-106.3468, 56.1304],
//   Australia: [133.7751, -25.2744],
//   India: [78.9629, 20.5937],
//   France: [2.2137, 46.6034],
//   Switzerland: [8.2275, 46.8182],
//   Georgia: [43.3569, 42.3154],
//   Germany: [10.4515, 51.1657],
//   Austria: [14.5501, 47.5162],
//   Greece: [21.8243, 39.0742],
//   Israel: [34.8516, 31.0461],
//   Hungary: [19.5033, 47.1625],
//   Iceland: [-19.0208, 64.9631],
//   Indonesia: [113.9213, -0.7893],
//   Ireland: [-8.2439, 53.4129],
//   Italy: [12.5674, 41.8719],
//   Japan: [138.2529, 36.2048],
//   Kazakhstan: [66.9237, 48.0196],
//   Cambodia: [104.991, 12.5657],
//   "South Korea": [127.7669, 35.9078],
//   Latvia: [24.6032, 56.8796],
//   Lithuania: [23.8813, 55.1694],
//   "North Macedonia": [21.7453, 41.9981],
//   Malaysia: [101.9758, 4.2105],
//   Mongolia: [103.8467, 46.8625],
//   Nepal: [84.124, 28.3949],
//   Norway: [8.4689, 60.472],
//   Afghanistan: [67.709953, 33.93911],
//   Iran: [53.688, 32.4279],
//   Poland: [19.1451, 51.9194],
//   Portugal: [-8.2245, 39.3999],
//   Brazil: [-51.9253, -14.235],
//   Pakistan: [69.3451, 30.3753],
//   Romania: [24.9668, 45.9432],
//   Russia: [105.3188, 61.524],
//   Serbia: [21.0059, 44.0165],
//   Slovakia: [19.699, 48.669],
//   Slovenia: [14.9955, 46.1512],
//   Somalia: [46.1996, 5.1521],
//   Mexico: [-102.5528, 23.6345],
//   Argentina: [-63.6167, -38.4161],
//   Colombia: [-74.2973, 4.5709],
//   Sweden: [18.6435, 60.1282],
//   "Sri Lanka": [80.7718, 7.8731],
//   Thailand: [100.9925, 15.870],
//   Turkey: [35.2433, 38.9637],
//   Ukraine: [31.1656, 48.3794],
//   Uzbekistan: [64.5853, 41.3775],
//   Vietnam: [108.2772, 14.0583],
//   Nigeria: [8.6753, 9.082],
// };

// const WorldMap = ({ accentName }) => {
//   const [highlightedCountries, setHighlightedCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   useEffect(() => {
//     // Simulated fetch from backend
//     setHighlightedCountries(["India", "Canada", "South Korea","North Macedonia","South Korea","USA"]);
//   }, []);

//   // Handle click on a country
//   const handleCountryClick = (event, countryName) => {
//     event.stopPropagation();
//     setSelectedCountry(countryName);
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 2, margin: 2, borderRadius: 1, backgroundColor: "#1E1E1E" }}>
//       <Box sx={{ width: "100%", height: "500px", marginTop: "20px" }}>
//         <ComposableMap
//           projectionConfig={{ scale: 220 }}
//           style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}
//         >
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map((geo) => {
//                 const countryName = geo.properties.name;
//                 const isHighlighted = highlightedCountries.includes(countryName);

//                 return (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill={isHighlighted ? "url(#highlightGradient)" : "#2C2C2C"}
//                     stroke="#FFF"
//                     style={{
//                       default: { outline: "none" },
//                       hover: {outline: "none", cursor: "pointer" },
//                       // hover: { fill: "#66BB6A", outline: "none", cursor: "pointer" },
//                       pressed: {outline: "none" },
//                     }}
//                     onClick={(event) => handleCountryClick(event, countryName)}
//                   />
//                 );
//               })
//             }
//           </Geographies>
//           <defs>
//             <linearGradient id="highlightGradient" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="30%" stopColor="#4CAF50" />
//               <stop offset="90%" stopColor="#8BC34A" />
//             </linearGradient>
//           </defs>
//           {highlightedCountries.map(
//             (country) =>
//               countryCoordinates[country] && (
//                 <Marker key={country} coordinates={countryCoordinates[country]}>
//                   <text
//                     textAnchor="middle"
//                     style={{ fontSize: "14px", fontWeight: "bold", fill: "#FFF" }}
//                   >
//                     {country}
//                   </text>
//                 </Marker>
//               )
//           )}
//         </ComposableMap>
//       </Box>

//       {/* Country Info Modal */}
//       <Dialog open={!!selectedCountry} onClose={() => {setSelectedCountry(null)}}>
//         <DialogTitle>
//           {selectedCountry}
//           <IconButton
//             aria-label="close"
//             onClick={() => setSelectedCountry(null)}
//             sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Here you can display more details about {selectedCountry}.
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </Paper>
//   );
// };

// export default WorldMap;




import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Box, Paper, Dialog, DialogTitle, DialogContent, Typography, IconButton, CircularProgress, List, ListItem, ListItemButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import apiRequest from "../../../Services/apiService";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryCoordinates = {
  "South Africa": [22.9375, -30.5595],
  Albania: [20.1683, 41.1533],
  Ethiopia: [39.7823, 9.145],
  "Saudi Arabia": [45.0792, 23.8859],
  Egypt: [30.8025, 26.8206],
  Morocco: [-7.0926, 31.7917],
  Lebanon: [35.8623, 33.8547],
  UAE: [53.8478, 23.4241],
  Armenia: [45.0382, 40.0691],
  Bangladesh: [90.3563, 23.685],
  "Bosnia and Herzegovina": [17.6791, 43.9159],
  Bulgaria: [25.4858, 42.7339],
  China: [104.1954, 35.8617],
  Spain: [-3.7492, 40.4637],
  Croatia: [15.2, 45.1],
  "Czech Republic": [15.4729, 49.8175],
  Denmark: [9.5018, 56.2639],
  Netherlands: [5.2913, 52.1326],
  Belgium: [4.4699, 50.5039],
  "United States of America": [-95.7129, 37.0902],
  UK: [-3.436, 55.3781],
  Canada: [-106.3468, 56.1304],
  Australia: [133.7751, -25.2744],
  India: [78.9629, 20.5937],
  France: [2.2137, 46.6034],
  Switzerland: [8.2275, 46.8182],
  Georgia: [43.3569, 42.3154],
  Germany: [10.4515, 51.1657],
  Austria: [14.5501, 47.5162],
  Greece: [21.8243, 39.0742],
  Israel: [34.8516, 31.0461],
  Hungary: [19.5033, 47.1625],
  Iceland: [-19.0208, 64.9631],
  Indonesia: [113.9213, -0.7893],
  Ireland: [-8.2439, 53.4129],
  Italy: [12.5674, 41.8719],
  Japan: [138.2529, 36.2048],
  Kazakhstan: [66.9237, 48.0196],
  Cambodia: [104.991, 12.5657],
  "South Korea": [127.7669, 35.9078],
  Latvia: [24.6032, 56.8796],
  Lithuania: [23.8813, 55.1694],
  "North Macedonia": [21.7453, 41.9981],
  Malaysia: [101.9758, 4.2105],
  Mongolia: [103.8467, 46.8625],
  Nepal: [84.124, 28.3949],
  Norway: [8.4689, 60.472],
  Afghanistan: [67.709953, 33.93911],
  Iran: [53.688, 32.4279],
  Poland: [19.1451, 51.9194],
  Portugal: [-8.2245, 39.3999],
  Brazil: [-51.9253, -14.235],
  Pakistan: [69.3451, 30.3753],
  Romania: [24.9668, 45.9432],
  Russia: [105.3188, 61.524],
  Serbia: [21.0059, 44.0165],
  Slovakia: [19.699, 48.669],
  Slovenia: [14.9955, 46.1512],
  Somalia: [46.1996, 5.1521],
  Mexico: [-102.5528, 23.6345],
  Argentina: [-63.6167, -38.4161],
  Colombia: [-74.2973, 4.5709],
  Sweden: [18.6435, 60.1282],
  "Sri Lanka": [80.7718, 7.8731],
  Thailand: [100.9925, 15.870],
  Turkey: [35.2433, 38.9637],
  Ukraine: [31.1656, 48.3794],
  Uzbekistan: [64.5853, 41.3775],
  Vietnam: [108.2772, 14.0583],
  Nigeria: [8.6753, 9.082],
};

const dballcountries = [
  "Fiji", "Tanzania", "W. Sahara", "Canada", "United States of America", "Kazakhstan", "Uzbekistan", 
  "Papua New Guinea", "Indonesia", "Argentina", "Chile", "Dem. Rep. Congo", "Somalia", "Kenya", "Sudan", 
  "Chad", "Haiti", "Dominican Rep.", "Russia", "Bahamas", "Falkland Is.", "Norway", "Greenland", 
  "Fr. S. Antarctic Lands", "Timor-Leste", "South Africa", "Lesotho", "Mexico", "Uruguay", "Brazil", 
  "Bolivia", "Peru", "Colombia", "Panama", "Costa Rica", "Nicaragua", "Honduras", "El Salvador", 
  "Guatemala", "Belize", "Venezuela", "Guyana", "Suriname", "France", "Ecuador", "Puerto Rico", 
  "Jamaica", "Cuba", "Zimbabwe", "Botswana", "Namibia", "Senegal", "Mali", "Mauritania", "Benin", 
  "Niger", "Nigeria", "Cameroon", "Togo", "Ghana", "Côte d'Ivoire", "Guinea", "Guinea-Bissau", "Liberia", 
  "Sierra Leone", "Burkina Faso", "Central African Rep.", "Congo", "Gabon", "Eq. Guinea", "Zambia", 
  "Malawi", "Mozambique", "eSwatini", "Angola", "Burundi", "Israel", "Lebanon", "Madagascar", 
  "Palestine", "Gambia", "Tunisia", "Algeria", "Jordan", "United Arab Emirates", "Qatar", "Kuwait", 
  "Iraq", "Oman", "Vanuatu", "Cambodia", "Thailand", "Laos", "Myanmar", "Vietnam", "North Korea", 
  "South Korea", "Mongolia", "India", "Bangladesh", "Bhutan", "Nepal", "Pakistan", "Afghanistan", 
  "Tajikistan", "Kyrgyzstan", "Turkmenistan", "Iran", "Syria", "Armenia", "Sweden", "Belarus", 
  "Ukraine", "Poland", "Austria", "Hungary", "Moldova", "Romania", "Lithuania", "Latvia", "Estonia", 
  "Germany", "Bulgaria", "Greece", "Turkey", "Albania", "Croatia", "Switzerland", "Luxembourg", 
  "Belgium", "Netherlands", "Portugal", "Spain", "Ireland", "New Caledonia", "Solomon Is.", 
  "New Zealand", "Australia", "Sri Lanka", "China", "Taiwan", "Italy", "Denmark", "United Kingdom", 
  "Iceland", "Azerbaijan", "Georgia", "Philippines", "Malaysia", "Brunei", "Slovenia", "Finland", 
  "Slovakia", "Czechia", "Eritrea", "Japan", "Paraguay", "Yemen", "Saudi Arabia", "Antarctica", 
  "N. Cyprus", "Cyprus", "Morocco", "Egypt", "Libya", "Ethiopia", "Djibouti", "Somaliland", "Uganda", 
  "Rwanda", "Bosnia and Herz.", "Macedonia", "Serbia", "Montenegro", "Kosovo", "Trinidad and Tobago", 
  "S. Sudan"
];


const backendData = [
  {
    id: 1,
    name: "United States of America",
    flagPath: "/flags/us.png", // Local path (if available)
    accents: [
      {
        id: 1,
        name: "General American",
        commonWords: "dude, awesome, bro",
        influence: "British, Germanic, Indigenous Languages",
        countryNames: ["United States"]
      },
      {
        id: 2,
        name: "Southern American",
        commonWords: "y'all, reckon, fixin'",
        influence: "British, French, African Languages",
        countryNames: ["United States"]
      }
    ]
  },
  {
    id: 2,
    name: "Australia",
    flagPath: "/flags/au.png", // Local path (if available)
    accents: [
      {
        id: 1,
        name: "Australian",
        commonWords: "g'day, mate, no worries",
        influence: "British, Irish, Aboriginal Languages",
        countryNames: ["Australia"]
      },
      {
        id: 2,
        name: "Broad Australian",
        commonWords: "crikey, fair dinkum, arvo",
        influence: "British, Australian Slang",
        countryNames: ["Australia"]
      }
    ]
  },
  {
    id: 3,
    name: "Canada",
    flagPath: "/flags/ca.png", // Local path (if available)
    accents: [
      {
        id: 1,
        name: "Canadian English",
        commonWords: "eh, toque, loonie",
        influence: "British, French, Indigenous Languages",
        countryNames: ["Canada"]
      },
      {
        id: 2,
        name: "Newfoundland English",
        commonWords: "b'y, luh, scoff",
        influence: "Irish, Scottish, English",
        countryNames: ["Canada"]
      }
    ]
  },
  {
    id: 4,
    name: "India",
    flagPath: "/flags/India.jpg", // Local path (public(folder)/falgs/India.jpg)  (https://flagcdn.com/w320/in.png)
    accents: [
      {
        id: 1,
        name: "Indian",
        commonWords: "yaar, ji, bolo",
        influence: "British, Hindi, Sanskrit",
        countryNames: ["India"]
      },
      {
        id: 2,
        name: "Hinglish",
        commonWords: "chal, scene kya hai, timepass",
        influence: "Hindi, English, Urdu",
        countryNames: ["India"]
      },
      {
        id: 3,
        name: "South Indian English",
        commonWords: "aiyo, saar, enna",
        influence: "Dravidian Languages, British English",
        countryNames: ["India"]
      },
      {
        id: 4,
        name: "Bengali English",
        commonWords: "ki koreche, baba, ekdom",
        influence: "Bengali, British English",
        countryNames: ["India"]
      }
    ]
  }
];

const WorldMap = ({accentName}) => {
  const [highlightedCountries, setHighlightedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [expandedAccents, setExpandedAccents] = useState({});

  useEffect(() => {
    async function getdata() {
      const response = await apiRequest("GET", `/api/accent/${accentName}/countries`, null, true);

      if (!response.success) {
        console.log("Failed to get countries...")
        return;
      }      
      
      const countrylist = response.data;
      setHighlightedCountries(countrylist);
    }

    getdata();
  },[]);

  useEffect(() => {
    async function getdata(){
      if (selectedCountry) {
        setLoading(true);
        setLoadingFlag(true); 
  
      const response = await apiRequest("GET", `/api/countries/name/${selectedCountry}`, null, true);
  
      if (!response.success) {
        console.log("Failed to get countries...")
        return;
      }      
      
      const data = response.data;
  
        if (data) {
          setCountryData(data);
          loadFlag(data.flagPath); 
        } else {
          setCountryData(null);
          setCountryFlag(""); 
        }
        setLoading(false);
      }
    }
    
    getdata();
  }, [selectedCountry]);

  const loadFlag = (flagPath) => {
    const img = new Image();
    img.src = flagPath;
    img.onload = () => {
      setCountryFlag(flagPath); // Show local flag if available
      setLoadingFlag(false);
    };
    img.onerror = () => {
      // If local flag fails, fetch from API
      fetch(`https://thingproxy.freeboard.io/fetch/${flagPath}`)
        .then((response) => response.json())
        .then((apiData) => {
          if (apiData && apiData[0]?.flags?.png) {
            setCountryFlag(apiData[0].flags.png);
          }
        })
        .catch((error) => {
            console.error("Error fetching flag:", error);
            setCountryFlag("");
          }
        )
        .finally(() => setLoadingFlag(false)); // Stop flag loading
    };


    // console.log(flagPath);
    // fetch(flagPath)
    // .then((response) => response.json())
    // .then((apiData) => {
    //   if (apiData && apiData[0]?.flags?.png) {
    //     setCountryFlag(apiData[0].flags.png);
    //   } else {
    //     setCountryFlag(""); 
    //   }
    // })
    // .catch((error) => {
    //   console.error("Error fetching flag:", error);
    //   setCountryFlag("");
    // })
    // .finally(() => setLoadingFlag(false)); 
  };

  const handleCountryClick = (event, countryName) => {
    event.stopPropagation();
    setSelectedCountry(countryName);
    setExpandedAccents({});
  };

  const toggleAccentDetails = (accent) => {
    setExpandedAccents((prev) => ({
      ...prev,
      [accent]: !prev[accent],
    }));
  };


  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2, borderRadius: 1, backgroundColor: "#1E1E1E" }}>
      <Box sx={{ width: "100%", height: "500px", marginTop: "20px" }}>
        <ComposableMap projectionConfig={{ scale: 220 }} style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isHighlighted = highlightedCountries.includes(countryName);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "url(#highlightGradient)" : "#2C2C2C"}
                    stroke="#FFF"
                    style={{ default: { outline: "none" }, hover: { outline: "none", cursor: "pointer" }, pressed: { outline: "none" } }}
                    onClick={(event) => handleCountryClick(event, countryName)}
                  />
                );
              })
            }
          </Geographies>
          {highlightedCountries.map((country) =>
            countryCoordinates[country] ? (
              <Marker key={country} coordinates={countryCoordinates[country]}>
                <text
                  textAnchor="middle"
                  style={{ fontSize: "14px", fontWeight: "bold", fill: "#FFF", cursor: "pointer" }}
                  onClick={(event) => handleCountryClick(event, country)}
                >
                  {country}
                </text>
              </Marker>
            ) : null
          )}
          <defs>
            <linearGradient id="highlightGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="30%" stopColor="#4CAF50" />
              <stop offset="90%" stopColor="#8BC34A" />
            </linearGradient>
          </defs>
        </ComposableMap>
      </Box>

      <Dialog
        open={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
        PaperProps={{
          sx: {
            bgcolor: "#1E1E1E",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            border: "1px solid #333",
            width: "500px",
            maxWidth: "90%",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: "16px 16px 0 16px" }}>
          <IconButton
            aria-label="close"
            onClick={() => setSelectedCountry(null)}
            sx={{ color: "#FFF", "&:hover": { color: "#4CAF50" }, padding: "6px" }}
          >
          </IconButton>
        </Box>

        <DialogTitle sx={{ bgcolor: "#2C2C2C", color: "#FFF", borderBottom: "1px solid #444", fontSize: "1.5rem", fontWeight: "bold", padding: "16px 24px", textAlign: "center" }}>
          {selectedCountry}
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#1E1E1E", color: "#FFF", padding: "24px" }}>
          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto", color: "#4CAF50" }} />
          ) : (
            <>
              <Box sx={{ marginTop: "10px", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                {loadingFlag ? ( // Show spinner while loading the flag
                  <CircularProgress sx={{ color: "#4CAF50" }} />
                ) : (
                  countryFlag && (
                    <img
                      src={countryFlag}
                      alt={`${selectedCountry} Flag`}
                      style={{
                        width: "200px",
                        height: "auto",
                        borderRadius: "10px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  )
                )}
              </Box>

              {countryData ? (
                <Box sx={{ bgcolor: "#2C2C2C", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", width: "100%" }}>
                  <Typography variant="h6" sx={{ color: "#4CAF50", marginBottom: "15px", fontWeight: "bold" }}>
                    Most Spoken Accents
                  </Typography>
                  <List>
                    {countryData.accents.map((accent) => (
                      <Box key={accent.id} sx={{ marginBottom: "10px" }}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => toggleAccentDetails(accent.name)}
                            sx={{
                              bgcolor: "#1E1E1E",
                              borderRadius: "5px",
                              "&:hover": { bgcolor: "#333" },
                              padding: "10px",
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FFF" }}>
                              {accent.name}
                            </Typography>
                            {expandedAccents[accent.name] ? (
                              <ExpandLessIcon sx={{ color: "#4CAF50" }} />
                            ) : (
                              <ExpandMoreIcon sx={{ color: "#FFF" }} />
                            )}
                          </ListItemButton>
                        </ListItem>

                        <Collapse in={expandedAccents[accent.name]} timeout="auto" unmountOnExit>
                          <Box sx={{ paddingLeft: "20px", paddingBottom: "10px", borderLeft: "2px solid #4CAF50", marginTop: "10px" }}>
                            <Typography variant="body2" sx={{ marginBottom: "10px", color: "#BBB" }}>
                              <strong style={{ color: "#FFF" }}>Common Words:</strong> {accent.commonWords}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#BBB" }}>
                              <strong style={{ color: "#FFF" }}>History & Influence:</strong> {accent.influence}
                            </Typography>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </List>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ textAlign: "center", color: "#BBB", fontStyle: "italic", marginTop: "20px" }}>
                  For now, details are not present.
                </Typography>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default WorldMap;
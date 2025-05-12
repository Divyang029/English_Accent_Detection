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
  Ghana: [-1.0232, 7.9465],
  Philippines: [121.7740, 12.8797],
  Qatar: [51.1839, 25.3548],
  "Burkina Faso": [-1.5616, 12.2383],
  "Ivory Coast": [-5.5471, 7.5400],
  "New Zealand": [174.8860, -40.9006]
};

// Dummy data for accents and countries
const accentCountryData = {
  "Ghanaian": {
    countries: ["Ghana"],
    data: {
      name: "Ghana",
      flagPath: "https://flagcdn.com/w320/gh.png",
      accents: [
        {
          id: 1,
          name: "Ghanaian English",
          commonWords: "chale, abi, eii",
          influence: "Akan, British English, Pidgin",
          countryNames: ["Ghana"]
        },
        {
          id: 2,
          name: "Ghanaian Pidgin",
          commonWords: "dey, small, chop",
          influence: "English, Akan, Ga, Ewe",
          countryNames: ["Ghana"]
        }
      ]
    }
  },
  "Indian": {
    countries: ["India"],
    data: {
      name: "India",
      flagPath: "https://flagcdn.com/w320/in.png",
      accents: [
        {
          id: 1,
          name: "Indian English",
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
        }
      ]
    }
  },
  "Philippine": {
    countries: ["Philippines"],
    data: {
      name: "Philippines",
      flagPath: "https://flagcdn.com/w320/ph.png",
      accents: [
        {
          id: 1,
          name: "Philippine English",
          commonWords: "po, kuya, ate",
          influence: "Tagalog, Spanish, American English",
          countryNames: ["Philippines"]
        },
        {
          id: 2,
          name: "Taglish",
          commonWords: "sige, ano ba, talaga",
          influence: "Tagalog, English, Spanish",
          countryNames: ["Philippines"]
        }
      ]
    }
  },
  "Gulf": {
    countries: ["Saudi Arabia", "UAE", "Qatar"],
    data: {
      name: "Gulf Countries",
      flagPath: "https://flagcdn.com/w320/ae.png",
      accents: [
        {
          id: 1,
          name: "Gulf English",
          commonWords: "habibi, inshallah, wallah",
          influence: "Arabic, English, Urdu",
          countryNames: ["Saudi Arabia", "UAE", "Qatar"]
        },
        {
          id: 2,
          name: "Khaleeji English",
          commonWords: "yalla, mashallah, shukran",
          influence: "Arabic, Persian, English",
          countryNames: ["Saudi Arabia", "UAE", "Qatar"]
        }
      ]
    }
  },
  "French": {
    countries: ["France", "Belgium", "Canada"],
    data: {
      name: "French-influenced English",
      flagPath: "https://flagcdn.com/w320/fr.png",
      accents: [
        {
          id: 1,
          name: "Franglais",
          commonWords: "c'est la vie, déjà vu, bon appétit",
          influence: "French, English",
          countryNames: ["France", "Belgium", "Canada"]
        },
        {
          id: 2,
          name: "Quebec English",
          commonWords: "depanneur, poutine, tuque",
          influence: "French, Canadian English",
          countryNames: ["Canada"]
        }
      ]
    }
  },
  "American": {
    countries: ["United States of America"],
    data: {
      name: "United States of America",
      flagPath: "https://flagcdn.com/w320/us.png",
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
    }
  },
  "South African": {
    countries: ["South Africa"],
    data: {
      name: "South Africa",
      flagPath: "https://flagcdn.com/w320/za.png",
      accents: [
        {
          id: 1,
          name: "South African English",
          commonWords: "howzit, lekker, braai",
          influence: "Afrikaans, Bantu languages, British English",
          countryNames: ["South Africa"]
        },
        {
          id: 2,
          name: "Cape Flats English",
          commonWords: "laaitie, kiff, china",
          influence: "Afrikaans, English, Malay",
          countryNames: ["South Africa"]
        }
      ]
    }
  },
  "Irish": {
    countries: ["Ireland"],
    data: {
      name: "Ireland",
      flagPath: "https://flagcdn.com/w320/ie.png",
      accents: [
        {
          id: 1,
          name: "Hiberno-English",
          commonWords: "craic, grand, yoke",
          influence: "Irish Gaelic, English",
          countryNames: ["Ireland"]
        },
        {
          id: 2,
          name: "Dublin English",
          commonWords: "deadly, gas, quare",
          influence: "Irish Gaelic, English, Norse",
          countryNames: ["Ireland"]
        }
      ]
    }
  },
  "New Zealand": {
    countries: ["New Zealand"],
    data: {
      name: "New Zealand",
      flagPath: "https://flagcdn.com/w320/nz.png",
      accents: [
        {
          id: 1,
          name: "New Zealand English",
          commonWords: "sweet as, chur, jandals",
          influence: "Māori, British English, Australian English",
          countryNames: ["New Zealand"]
        },
        {
          id: 2,
          name: "Kiwi English",
          commonWords: "bach, dairy, tramping",
          influence: "Māori, English, Scottish",
          countryNames: ["New Zealand"]
        }
      ]
    }
  },
  "Nigerian": {
    countries: ["Nigeria"],
    data: {
      name: "Nigeria",
      flagPath: "https://flagcdn.com/w320/ng.png",
      accents: [
        {
          id: 1,
          name: "Nigerian English",
          commonWords: "na wa, abeg, una",
          influence: "Pidgin, Yoruba, Igbo, Hausa",
          countryNames: ["Nigeria"]
        },
        {
          id: 2,
          name: "Nigerian Pidgin",
          commonWords: "wahala, chop, shakara",
          influence: "English, Yoruba, Portuguese",
          countryNames: ["Nigeria"]
        }
      ]
    }
  }
};


const WorldMap = ({ accentName }) => {
  const [highlightedCountries, setHighlightedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [expandedAccents, setExpandedAccents] = useState({});
  const [hoveredCountry, setHoveredCountry] = useState(null);

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
  }, [accentName]);

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
        .finally(() => setLoadingFlag(false));
    };
  };

  const handleCountryClick = (event, countryName) => {
    event.stopPropagation();
    setSelectedCountry(countryName);
    setExpandedAccents({});
  };

  const handleCountryHover = (geo) => {
    const countryName = geo.properties.name;
    if (highlightedCountries.includes(countryName)) {
      setHoveredCountry(countryName);
    }
  };

  const handleCountryLeave = () => {
    setHoveredCountry(null);
  };

  const toggleAccentDetails = (accent) => {
    setExpandedAccents((prev) => ({
      ...prev,
      [accent]: !prev[accent],
    }));
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2, borderRadius: 1, backgroundColor: "#1E1E1E" }}>
      {/* Added title section */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ color: "#4CAF50", fontWeight: "bold" }}>
          Accent: {accentName}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#BBB", mt: 1 }}>
          Spoken in: {highlightedCountries.join(", ")}
        </Typography>
      </Box>

      <Box sx={{ width: "100%", height: "500px" }}>
        <ComposableMap projectionConfig={{ scale: 220 }} style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isHighlighted = highlightedCountries.includes(countryName);
                const isHovered = hoveredCountry === countryName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? 
                      (isHovered ? "url(#hoverGradient)" : "url(#highlightGradient)") : 
                      "#2C2C2C"}
                    stroke="#FFF"
                    style={{
                      default: { outline: "none" },
                      hover: { 
                        outline: "none", 
                        cursor: isHighlighted ? "pointer" : "default",
                        filter: isHighlighted ? "brightness(1.2)" : "none"
                      },
                      pressed: { outline: "none" }
                    }}
                    onClick={(event) => isHighlighted && handleCountryClick(event, countryName)}
                    onMouseEnter={() => handleCountryHover(geo)}
                    onMouseLeave={handleCountryLeave}
                  />
                );
              })
            }
          </Geographies>

          {/* Show country name only when hovered and highlighted */}
          {hoveredCountry && countryCoordinates[hoveredCountry] && (
            <Marker key={`hover-${hoveredCountry}`} coordinates={countryCoordinates[hoveredCountry]}>
              <text
                textAnchor="middle"
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fill: "#FFF",
                  textShadow: "0 0 8px rgba(76, 175, 80, 0.8)",
                  transition: "all 0.3s ease"
                }}
              >
                {hoveredCountry}
              </text>
            </Marker>
          )}

          <defs>
            <linearGradient id="highlightGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="30%" stopColor="#4CAF50" />
              <stop offset="90%" stopColor="#8BC34A" />
            </linearGradient>
            <linearGradient id="hoverGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="10%" stopColor="#8BC34A" />
              <stop offset="90%" stopColor="#4CAF50" />
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
                {loadingFlag ? (
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
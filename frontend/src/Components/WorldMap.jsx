import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Box, Paper } from "@mui/material";
import apiRequest from "../Services/apiService";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryCoordinates = {
  India: [78.9629, 20.5937],
  "United States": [-95.7129, 37.0902],
  Canada: [-106.3468, 56.1304],
  Australia: [133.7751, -25.2744],
  "United Kingdom": [-3.436, 55.3781],
  Russia: [105.3188, 61.524],
  China: [104.1954, 35.8617],
  Japan: [138.2529, 36.2048],
  "New Zealand": [174.885, -40.9006],
  France: [2.2137, 46.6034],
  Germany: [10.4515, 51.1657],
  Brazil: [-51.9253, -14.235],
  Pakistan: [69.3451, 30.3753],
  "Sri Lanka": [80.7718, 7.8731],
  Italy: [12.5674, 41.8719],
  Spain: [-3.7492, 40.4637],
  Mexico: [-102.5528, 23.6345],
  "South Korea": [127.7669, 35.9078],
};

const WorldMap = ({accentName}) => {
  const [highlightedCountries, setHighlightedCountries] = useState([]);
console.log(accentName);
  // Fetch highlighted countries from backend
  useEffect(() => {
    // const fetchHighlightedCountries = async () => {
    //   const postData = {
    //         "firstName": firstName,
    //         "lastName": lastName,
    //         "email": email,
    //         "password": password
    //       }
      
    //       const response = await apiRequest("POST", "/api/auth/signup", postData, false);
      
    //       if (response.data.status === "success") {
    //         setTimeout(() => navigate("/login"), 1000);
    //       }
    //       else {
    //         if (response.data.message == "User already exists.")
    //           setTimeout(() => navigate("/login"), 1000);
    //       }
    // };

    // fetchHighlightedCountries();

    setHighlightedCountries(["India","Canada","South Korea"]);
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2, borderRadius: 1, backgroundColor: "#1E1E1E" }}>
      <Box sx={{ width: "100%", height: "500px", marginTop: "20px" }}>
        <ComposableMap
          projectionConfig={{ scale: 220 }}
          style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isHighlighted = highlightedCountries.includes(countryName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "url(#highlightGradient)" : "#2C2C2C"} // Highlight fetched countries
                    stroke="#FFF"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#66BB6A", outline: "none" },
                      pressed: { fill: "#4CAF50", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          <defs>
            <linearGradient id="highlightGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="30%" stopColor="#4CAF50" />
              <stop offset="90%" stopColor="#8BC34A" />
            </linearGradient>
          </defs>
          {highlightedCountries.map((country) => (
            countryCoordinates[country] && (
              <Marker key={country} coordinates={countryCoordinates[country]}>
                <text
                  textAnchor="middle"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fill: "#FFF",
                  }}
                >
                  {country}
                </text>
              </Marker>
            )
          ))}
        </ComposableMap>
      </Box>
    </Paper>
  );
};

export default WorldMap;

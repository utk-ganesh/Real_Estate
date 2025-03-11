import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState("buy");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/suggestions/locations");
        const data = await response.json();
        setSuggestions(data.locations); 
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`${activeTab}?location=${location}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "89vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: 2,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
          textShadow: "0 0px 5px rgba(0, 0, 0, 1)",
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
        gutterBottom
      >
        Discover a place <br /> you'll love to live
      </Typography>

      <Box
        role="group"
        aria-label="search type"
        sx={{
          display: "flex",
          backgroundColor: "rgba(59, 65, 68, 0.6)",
          borderRadius: "8px",
          overflow: "hidden",
          mb: 2,
        }}
      >
        <Button
          onClick={() => setActiveTab("buy")}
          sx={{
            textTransform: "none",
            backgroundColor: activeTab === "buy" ? "white" : "transparent",
            color: activeTab === "buy" ? "#3b4144" : "white",
            fontWeight: activeTab === "buy" ? "bold" : "normal",
            "&:hover": { backgroundColor: "white", color: "#3b4144" },
          }}
        >
          Buy
        </Button>
        <Button
          onClick={() => setActiveTab("rent")}
          sx={{
            textTransform: "none",
            backgroundColor: activeTab === "rent" ? "white" : "transparent",
            color: activeTab === "rent" ? "#3b4144" : "white",
            fontWeight: activeTab === "rent" ? "bold" : "normal",
            "&:hover": { backgroundColor: "white", color: "#3b4144" },
          }}
        >
          Rent
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "50px",
          padding: "0 15px",
          width: "60%",
          maxWidth: 500,
          boxShadow: 3,
          position: "relative",
        }}
      >
        <TextField
          fullWidth
          placeholder="Enter city, state, or zip code"
          variant="standard"
          value={location}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": { padding: "10px 0" },
          }}
        />
        <Button
          onClick={handleSearch}
          sx={{
            color: "white",
            backgroundColor: "red",
            borderRadius: "20px",
            marginLeft: "10px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#cc0000" },
          }}
        >
          Search
        </Button>
        {filteredSuggestions.length > 0 && (
          <List
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: "0 0 20px 20px",
              boxShadow: 3,
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <ListItemText primary={suggestion} sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

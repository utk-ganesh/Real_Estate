import React, { useState } from "react";
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

const suggestions = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "10001",
  "90001",
  "60601",
  "77001",
  "85001",
];

const HomePage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState("buy"); // Default active tab is 'Buy'

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/search?location=${location}&type=${activeTab}`);
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
      {/* Headline */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          display: "block",
          textAlign: "center",
          color: "white",
          textShadow: "0 0px 5px rgba(0, 0, 0, 1)",
          fontSize: {
            xs: "2rem", // Extra small screens
            sm: "3rem", // Small screens
            md: "4rem", // Medium screens
          },
        }}
        gutterBottom
      >
        Discover a place <br /> you'll love to live
      </Typography>

      {/* Buy and Rent Buttons */}
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
            "&:hover": {
              backgroundColor: "white",
              color: "#3b4144",
            },
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
            "&:hover": {
              backgroundColor: "white",
              color: "#3b4144",
            },
          }}
        >
          Rent
        </Button>
      </Box>

      {/* Search Box */}
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
            "& .MuiInputBase-input": {
              padding: "10px 0",
            },
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
            "&:hover": {
              backgroundColor: "#cc0000",
            },
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
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemText
                    primary={suggestion}
                    sx={{
                      color: "black",
                    }}
                  />
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

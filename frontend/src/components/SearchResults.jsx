import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get("location");
  const mode = location.pathname.includes("rent") ? "rent" : "buy";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [emiAmount, setEmiAmount] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!searchLocation) return;
      try {
        const response = await fetch(
          `http://localhost:5000/properties/location?location=${searchLocation}&mode=${mode}`
        );
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchLocation, mode]);

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    let sortedProperties = [...properties];

    if (option === "price_low_high") {
      sortedProperties.sort((a, b) =>
        mode === "rent" ? a.rent_per_month - b.rent_per_month : a.buying_price - b.buying_price
      );
    } else if (option === "price_high_low") {
      sortedProperties.sort((a, b) =>
        mode === "rent" ? b.rent_per_month - a.rent_per_month : b.buying_price - a.buying_price
      );
    } else if (option === "area_low_high") {
      sortedProperties.sort((a, b) => a.area - b.area);
    } else if (option === "area_high_low") {
      sortedProperties.sort((a, b) => b.area - a.area);
    } else if (option === "garages_low_high") {
      sortedProperties.sort((a, b) => a.parking_spaces - b.parking_spaces);
    } else if (option === "garages_high_low") {
      sortedProperties.sort((a, b) => b.parking_spaces - a.parking_spaces);
    }

    setProperties(sortedProperties);
  };

  const handleLike = (property) => {
    const isSaved = savedProperties.some((p) => p.property_id === property.property_id);
    const updatedSavedProperties = isSaved
      ? savedProperties.filter((p) => p.property_id !== property.property_id)
      : [...savedProperties, property];

    setSavedProperties(updatedSavedProperties);
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setEmiAmount(null);
  };

  const handleCloseDialog = () => {
    setSelectedProperty(null);
  };

  const calculateEMI = () => {
    const principal = selectedProperty.buying_price;
    const interestRate = 7 / 100 / 12; // 7% annual interest, converted to monthly
    const tenure = 20 * 12; // 20 years loan tenure in months

    const emi = (principal * interestRate * Math.pow(1 + interestRate, tenure)) /
      (Math.pow(1 + interestRate, tenure) - 1);

    setEmiAmount(emi.toFixed(2));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
        Properties in {searchLocation}
      </Typography>

      {/* Sorting Dropdown */}
      <Box sx={{ textAlign: "right", marginBottom: 2 }}>
        <Select value={sortOption} onChange={handleSortChange} displayEmpty>
          <MenuItem value="" disabled>Sort by</MenuItem>
          <MenuItem value="price_low_high">Price: Low to High</MenuItem>
          <MenuItem value="price_high_low">Price: High to Low</MenuItem>
          <MenuItem value="area_low_high">Area: Low to High</MenuItem>
          <MenuItem value="area_high_low">Area: High to Low</MenuItem>
   
        </Select>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : properties.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No properties found for {searchLocation}.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
            justifyContent: "center",
          }}
        >
          {properties.map((property) => (
            <Card
              key={property.property_id}
              sx={{ width: "100%", maxWidth: 350, boxShadow: 4, borderRadius: 3, position: "relative", cursor: "pointer" }}
              onClick={() => handleCardClick(property)}
            >
              <CardMedia
                component="img"
                height="200"
                image={property.image_url || "https://via.placeholder.com/350"}
                alt="Property"
              />
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10, color: "red" }}
                onClick={(e) => { e.stopPropagation(); handleLike(property); }}
              >
                {savedProperties.some((p) => p.property_id === property.property_id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {mode === "rent" ? `$${property.rent_per_month} / month` : `$${property.buying_price}`}
                </Typography>
                <Typography>
                  {property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqft
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {property.address}, {property.city}, {property.state} - {property.zipcode}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Property Details Dialog */}
      {selectedProperty && (
        <Dialog open={true} onClose={handleCloseDialog}>
          <DialogTitle>Property Details</DialogTitle>
          <DialogContent>
            <Typography><b>Address:</b> {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state}, {selectedProperty.zipcode}</Typography>
            <Typography><b>Type:</b> {selectedProperty.property_type}</Typography>
            <Typography><b>Year Built:</b> {selectedProperty.year_built}</Typography>
            <Typography><b>Bedrooms:</b> {selectedProperty.bedrooms}, <b>Bathrooms:</b> {selectedProperty.bathrooms}</Typography>
            <Typography><b>Garages:</b> {selectedProperty.parking_spaces}</Typography>

            {mode === "buy" && (
              <>
                <Typography><b>Price:</b> ${selectedProperty.buying_price}</Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={calculateEMI}>Calculate EMI</Button>
                {emiAmount && <Typography sx={{ mt: 1 }}><b>Estimated EMI:</b> ${emiAmount}/month</Typography>}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SearchResults;

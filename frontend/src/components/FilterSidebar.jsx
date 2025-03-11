import React from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Button,
} from "@mui/material";

const FilterSidebar = ({ filters, setFilters, mode }) => {
  // Handle filter changes safely
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box sx={{ p: 2, width: 300, background: "#f8f9fa", borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Filters
      </Typography>

      {/* Price Range */}
      <Typography fontWeight="bold">Price Range</Typography>
      <Slider
        value={filters.price || [5000, mode === "buy" ? 50000000 : 500000]}
        onChange={(e, newValue) => handleChange("price", newValue)}
        valueLabelDisplay="auto"
        min={5000}
        max={mode === "buy" ? 50000000 : 500000}
        step={mode === "buy" ? 500000 : 5000}
      />
      <Typography variant="body2">
        ₹{filters.price?.[0]} - ₹{filters.price?.[1]}
      </Typography>

      {/* Property Type */}
      <Typography fontWeight="bold">Property Type</Typography>
      {["Apartment", "Condo", "Townhouse", "Duplex"].map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={(filters.propertyType || []).includes(type)}
              onChange={(e) =>
                handleChange(
                  "propertyType",
                  e.target.checked
                    ? [...(filters.propertyType || []), type]
                    : (filters.propertyType || []).filter((t) => t !== type)
                )
              }
            />
          }
          label={type}
        />
      ))}

      {/* Bedrooms */}
      <Typography fontWeight="bold">Bedrooms</Typography>
      {["1BHK", "2BHK", "3BHK", "4BHK"].map((bhk) => (
        <FormControlLabel
          key={bhk}
          control={
            <Checkbox
              checked={(filters.bedrooms || []).includes(bhk)}
              onChange={(e) =>
                handleChange(
                  "bedrooms",
                  e.target.checked
                    ? [...(filters.bedrooms || []), bhk]
                    : (filters.bedrooms || []).filter((b) => b !== bhk)
                )
              }
            />
          }
          label={bhk}
        />
      ))}

      {/* Furnishing (For Rent Only) */}
      {mode === "rent" && (
        <>
          <Typography fontWeight="bold">Furnishing</Typography>
          {["Unfurnished", "Semi-Furnished", "Fully Furnished"].map((furnish) => (
            <FormControlLabel
              key={furnish}
              control={
                <Checkbox
                  checked={(filters.furnishing || []).includes(furnish)}
                  onChange={(e) =>
                    handleChange(
                      "furnishing",
                      e.target.checked
                        ? [...(filters.furnishing || []), furnish]
                        : (filters.furnishing || []).filter((f) => f !== furnish)
                    )
                  }
                />
              }
              label={furnish}
            />
          ))}
        </>
      )}

      {/* Parking Spaces */}
      <Typography fontWeight="bold">Parking Spaces</Typography>
      {[1, 2, 3].map((num) => (
        <FormControlLabel
          key={num}
          control={
            <Checkbox
              checked={(filters.parkingSpaces || []).includes(num)}
              onChange={(e) =>
                handleChange(
                  "parkingSpaces",
                  e.target.checked
                    ? [...(filters.parkingSpaces || []), num]
                    : (filters.parkingSpaces || []).filter((p) => p !== num)
                )
              }
            />
          }
          label={`${num}+`}
        />
      ))}

      {/* Exact Match Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={filters.exactParking || false}
            onChange={(e) => handleChange("exactParking", e.target.checked)}
          />
        }
        label="Exact Match"
      />

      {/* Apply Filters Button */}
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;

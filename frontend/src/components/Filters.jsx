// src/components/Filters.jsx
import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Slider, Typography, Button } from '@mui/material';

// Sample options for dropdowns
const propertyTypes = ['Apartment', 'Condo', 'Duplex', 'Townhouse'];
const furnishedStatus = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];

const Filters = ({ type }) => {
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    zipcode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    furnished: '',
    parkingSpaces: '',
    priceRange: [0, 100000],
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  // Submit Filters
  const handleSubmit = () => {
    console.log('Applied Filters:', filters);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {type === 'buy' ? 'Buy Property' : 'Rent Property'}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="State"
            name="state"
            fullWidth
            value={filters.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="City"
            name="city"
            fullWidth
            value={filters.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Zipcode"
            name="zipcode"
            fullWidth
            value={filters.zipcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Property Type"
            name="propertyType"
            fullWidth
            value={filters.propertyType}
            onChange={handleChange}
          >
            {propertyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            fullWidth
            value={filters.bedrooms}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            fullWidth
            value={filters.bathrooms}
            onChange={handleChange}
          />
        </Grid>
        {type === 'rent' && (
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Furnished Status"
              name="furnished"
              fullWidth
              value={filters.furnished}
              onChange={handleChange}
            >
              {furnishedStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Parking Spaces"
            name="parkingSpaces"
            type="number"
            fullWidth
            value={filters.parkingSpaces}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={1000}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;

// src/components/BuyPage.jsx
import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card, CardContent } from '@mui/material';

const propertyData = [
  { id: 1, type: 'Apartment', price: 5000000 },
  { id: 2, type: 'House', price: 15000000 },
  { id: 3, type: 'Villa', price: 30000000 },
];

const BuyPage = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProperties = propertyData.filter((property) => {
    if (filter === '') return true;
    return property.type === filter;
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Buy Properties
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Property Type</InputLabel>
        <Select value={filter} onChange={handleFilterChange} label="Property Type">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="House">House</MenuItem>
          <MenuItem value="Villa">Villa</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{property.type}</Typography>
                <Typography variant="body2">Price: ₹{property.price.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuyPage;

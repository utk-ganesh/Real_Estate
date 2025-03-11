// src/pages/SearchPage.jsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const mode = window.location.pathname.includes("rent") ? "rent" : "buy";

  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    price: [0, mode === "buy" ? 50000000 : 500000],
    propertyType: [],
    bedrooms: [],
    furnishing: [],
    sort: "price",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let query = `http://localhost:5000/properties/location?location=${params.get("location")}&mode=${mode}`;
        const response = await fetch(query);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [params]);

  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <FilterSidebar filters={filters} setFilters={setFilters} mode={mode} />
      <SearchResults properties={properties} />
    </Box>
  );
};

export default SearchPage;

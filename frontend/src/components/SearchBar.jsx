// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Slider,
//   FormControlLabel,
//   Checkbox,
//   FormGroup,
//   Select,
//   MenuItem,
//   Button,
// } from "@mui/material";

// const Filters = ({ type }) => {
//   const [price, setPrice] = useState([1000, 500000]);
//   const [propertyType, setPropertyType] = useState([]);
//   const [bedrooms, setBedrooms] = useState("");

//   // Define correct property types explicitly
//   const propertyTypes = ["Apartment", "Condo", "Duplex", "Townhouse"];

//   const handlePriceChange = (event, newValue) => {
//     setPrice(newValue);
//   };

//   return (
//     <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
//       <Typography variant="h6" fontWeight="bold">Filters</Typography>

//       {/* Price Range */}
//       <Box my={2}>
//         <Typography variant="body1" fontWeight="bold">Price Range</Typography>
//         <Slider
//           value={price}
//           onChange={handlePriceChange}
//           valueLabelDisplay="auto"
//           min={1000}
//           max={500000}
//         />
//       </Box>

//       {/* Property Type */}
//       <Box my={2}>
//         <Typography variant="body1" fontWeight="bold">Property Type</Typography>
//         <FormGroup>
//           {propertyTypes.map((type) => (
//             <FormControlLabel
//               key={type}
//               control={<Checkbox />}
//               label={<Typography variant="body2">{type}</Typography>}
//             />
//           ))}
//         </FormGroup>
//       </Box>

//       {/* Bedrooms */}
//       <Box my={2}>
//         <Typography variant="body1" fontWeight="bold">Bedrooms</Typography>
//         <Select
//           value={bedrooms}
//           onChange={(e) => setBedrooms(e.target.value)}
//           fullWidth
//         >
//           {["1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((bhk) => (
//             <MenuItem key={bhk} value={bhk}>
//               <Typography variant="body2">{bhk}</Typography>
//             </MenuItem>
//           ))}
//         </Select>
//       </Box>

//       <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//         Apply Filters
//       </Button>
//     </Box>
//   );
// };

// export default Filters;

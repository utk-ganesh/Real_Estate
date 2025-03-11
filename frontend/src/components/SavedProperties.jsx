import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const SavedProperties = () => {
    const [savedProperties, setSavedProperties] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
        setSavedProperties(saved);
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
                Saved Properties
            </Typography>
            {savedProperties.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    No saved properties yet.
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 3,
                    }}
                >
                    {savedProperties.map((property, index) => (
                        <Card key={index} sx={{ width: 320, boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={property.image_url}
                                alt="Property"
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    ${property.price}
                                </Typography>
                                <Typography variant="body1">
                                    {property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqft
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {property.address}, {property.city}, {property.state}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default SavedProperties;

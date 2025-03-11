import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        const updateSavedCount = () => {
            const saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
            setSavedCount(saved.length);
        };

        window.addEventListener("storage", updateSavedCount);
        updateSavedCount();

        return () => window.removeEventListener("storage", updateSavedCount);
    }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        MyWebsite
                    </Link>
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit">
                        <Link to="/saved-properties" style={{ textDecoration: "none", color: "white" }}>
                            Saved Properties ({savedCount})
                        </Link>
                    </Button>

                    {/* Add Login and Signup Buttons */}
                    <Button color="inherit">
                        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
                            Signup
                        </Link>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

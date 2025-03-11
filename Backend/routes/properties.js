import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Fetch properties based on city/state and mode (rent or buy)
router.get("/location", async (req, res) => {
  try {
    const { location, mode } = req.query;

    if (!location || !mode) {
      return res.status(400).json({ message: "Location and mode are required" });
    }

    // Base query to fetch properties
    let query = `
      SELECT p.*,
    `;

    // Check if the user is searching for rental properties or properties to buy
    if (mode === "rent") {
      query += `r.rent_per_month, r.furnished FROM Properties p 
                JOIN Rentals r ON p.property_id = r.property_id`;
    } else if (mode === "buy") {
      query += `s.buying_price FROM Properties p 
                JOIN Sales s ON p.property_id = s.property_id`;
    } else {
      return res.status(400).json({ message: "Invalid mode. Choose 'rent' or 'buy'." });
    }

    // Add filtering for city or state
    query += ` WHERE p.city LIKE ? OR p.state LIKE ?`;

    // Execute query with placeholders
    const [results] = await db.execute(query, [`%${location}%`, `%${location}%`]);

    res.json(results);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

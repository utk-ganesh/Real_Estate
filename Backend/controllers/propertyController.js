import db from "../config/db.js";

export const getDistinctLocations = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT city FROM Properties
      UNION
      SELECT DISTINCT state FROM Properties
    `);

    const locations = rows.map(row => Object.values(row)[0]);

    res.json({ locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

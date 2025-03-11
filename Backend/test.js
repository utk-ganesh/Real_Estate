import db from "./config/db.js"; // Import your main DB config

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Successfully connected to the RDS database!");
    connection.release(); // Release the connection
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Successfully connected to the RDS database!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

export default db;

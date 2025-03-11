import mysql from "mysql2/promise";

const users_db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Abcdef@25%",
  database: "real_estate",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const connection = await users_db.getConnection();
    console.log("✅ Successfully connected to the local MySQL database!");
    connection.release();
  } catch (error) {
    console.error("❌ Local database connection failed:", error);
  }
})();

export default users_db;

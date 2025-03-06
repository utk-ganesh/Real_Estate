import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Abcdef@25%",
    database: "real_estate",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

export default db;

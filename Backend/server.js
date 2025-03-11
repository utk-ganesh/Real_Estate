import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan"; // Optional: For logging HTTP requests
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/suggestions.js";
import propertiesRoutes from "./routes/properties.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Already handles JSON parsing, so bodyParser.json() isn't needed
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions
app.use(morgan("dev")); // Logs requests for debugging

// Routes
app.use("/auth", authRoutes);
app.use("/suggestions", propertyRoutes); // Register property routes
app.use("/properties",propertiesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

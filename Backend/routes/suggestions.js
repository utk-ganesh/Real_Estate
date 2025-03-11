import express from "express";
import { getDistinctLocations } from "../controllers/propertyController.js";

const router = express.Router();

// Route to fetch distinct cities and states
router.get("/locations", getDistinctLocations);

export default router;

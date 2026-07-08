/**
 * Registers all routes for the Express app.
 * 
 * @module routes
 * @requires express
 * @requires ../modules/project/project.routes
 * @requires ../modules/auth/auth.routes
 * @requires ../modules/review/review.routes
*/

import { Router } from "express";
import projectRoutes from "../modules/project/project.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import reviewRoutes from "../modules/review/review.routes.js";

const router = Router();

// Health check
router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PrismCode API is healthy",
        version: "v1"
    });
});

// Authentication routes
router.use("/auth", authRoutes);

// Projects routes
router.use("/projects", projectRoutes);

// Review routes
router.use("/reviews", reviewRoutes);

export default function registerRoutes(app) {
    app.use("/api/v1", router);
}
/**
 * Registers all routes for the Express app.
*/

import { Router } from "express";
import projectRoutes from "../modules/project/project.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PrismCode API is healthy",
        version: "v1"
    });
});

// Projects routes
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);

export default function registerRoutes(app) {
    app.use("/api/v1", router);
}
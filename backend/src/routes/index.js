/**
 * Registers all routes for the Express app.
*/

import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PrismCode API is healthy",
        version: "v1"
    });
});

export default function registerRoutes(app) {
    app.use("/api/v1", router);
}
/**
 * app.js
 * 
 * Configures the Express application
 * Registers middleware, routes and global error handlers.
*/

import express from "express";

import registerMiddlewares from "./middlewares/index.js";
import registerRoutes from "./routes/index.js";

const app = express();

registerMiddlewares(app);
registerRoutes(app);

// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.path,
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message,
    });
});

export default app;

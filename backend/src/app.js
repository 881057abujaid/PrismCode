/**
 * app.js
 * 
 * Configures the Express application
 * Registers middleware, routes and global error handlers.
*/

import express from "express";

import registerMiddlewares from "./middlewares/index.js";
import registerRoutes from "./routes/index.js";
import errorHandler from "./shared/errors/errorHandler.js";

const app = express();

registerMiddlewares(app);
registerRoutes(app);

// 404 Not Found Handler
app.use((req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// Global Error Handler
app.use(errorHandler);

export default app;

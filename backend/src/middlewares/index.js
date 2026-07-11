/**
 * middlewares/index.js
 * 
 * Registers global middleware for the Express app.
 * 
 * @module middlewares
 * @requires express
 * @requires cors
 * @requires helmet
 * @requires morgan
*/

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Register global middleware
const registerMiddlewares = (app) => {
    // Security
    app.use(helmet());

    // CORS
    app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }));

    // Body Parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Logger
    app.use(morgan("dev"));
}

export default registerMiddlewares;
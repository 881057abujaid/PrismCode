import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


/**
 * Registers global middleware for the Express app.
*/

const registerMiddlewares = (app) => {
    // Security
    app.use(helmet());

    // CORS
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }));

    // Body Parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Logger
    app.use(morgan("dev"));
}

export default registerMiddlewares;
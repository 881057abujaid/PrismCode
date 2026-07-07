/**
 * server.js
 * 
 * Entry point of the application.
 * initializes environment variables
 * and starts the HTTP server.
*/

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 5000;

// Database connection
connectDatabase();


// Server
app.listen(PORT, () => {
    console.log(`PrismCode API is running on port http://localhost:${PORT}`);
});
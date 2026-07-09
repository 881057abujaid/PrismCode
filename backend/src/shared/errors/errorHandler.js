/**
 * errorHandler.js
 * 
 * Global error handling middleware.
 * 
 * @module errorHandler
 * @requires zod
*/

import { ZodError } from "zod";
import { errorResponse } from "../responses/apiResponse";

const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Zod Validation Error
    if (err instanceof ZodError) {
        return errorResponse(res, 400, "Validation failed", err.errors);
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        return errorResponse(res, 400, err.message);
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        return errorResponse(res, 400, err.message);
    }

    // Default Error
    return errorResponse(res, err.status || 500, err.message || "Internal Server Error");
};

export default errorHandler;
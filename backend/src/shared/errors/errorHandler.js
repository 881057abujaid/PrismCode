import { success, ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Zod Validation Error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.errors,
        });
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        return res.json(400).json({
            success: false,
            message: err.message,
        });
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message
        });
    }

    // Default Error
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default errorHandler;
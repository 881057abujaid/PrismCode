/**
 * auth.middleware.js
 * 
 * Middleware for auth-related operations.
 * 
 * @module auth
 * @requires jsonwebtoken
 * @requires ../auth/user.model
*/

import jwt from "jsonwebtoken";
import User from "./user.model.js";
import { ERROR_MESSAGES } from "../../shared/constants/messages.js";

export const protect = async (req, res, next) => {
    try {
        // Check Authentication Header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: ERROR_MESSAGES.AUTH_REQUIRED,
            });
        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check User Exists
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: ERROR_MESSAGES.USER_NOT_FOUND,
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};
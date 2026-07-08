/**
 * auth.controller.js
 * 
 * Controllers for auth-related operations.
 * 
 * @module auth
 * @requires auth.validation
 * @requires auth.service
*/

import { loginSchema, registerSchema } from "./auth.validation.js";
import * as authService from "./auth.service.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const user = await authService.registerUser(validatedData);

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const { user, token } = await authService.loginUser(validatedData);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
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
import { SUCCESS_MESSAGES } from "../../shared/constants/messages.js";
import { successResponse } from "../../shared/responses/apiResponse.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const user = await authService.registerUser(validatedData);

        return successResponse(res, 201, SUCCESS_MESSAGES.ACCOUNT_CREATED, {
            id: user._id,
            name: user.name,
            email: user.email,
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

        return successResponse(res, 200, SUCCESS_MESSAGES.LOGIN, {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
    try {
        return successResponse(res, 200, SUCCESS_MESSAGES.LOGOUT, {});
    } catch (error) {
        next(error);
    }
};
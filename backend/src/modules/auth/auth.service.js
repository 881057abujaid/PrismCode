/**
 * auth.service.js
 * 
 * Services for auth-related operations.
 * 
 * @module auth
 * @requires bcryptjs
 * @requires ../auth/user.model
 * @requires ../utils/generateToken
 * @requires ../shared/constants/messages
*/

import bcrypt from "bcryptjs";
import User from "../auth/user.model.js";
import generateToken from "../../utils/generateToken.js";
import { ERROR_MESSAGES } from "../../shared/constants/messages.js";

export const registerUser = async (userData) => {
    // Existing user check
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Creating user
    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    // Return user
    return user;
};

export const loginUser = async (userData) => {
    // Check user existence
    const user = await User.findOne({ email: userData.email }).select("+password");

    if (!user) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Check Password
    const isPasswordMatched = await bcrypt.compare(
        userData.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Generate JWT Token
    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    // Return user and token
    return {
        user,
        token,
    };
};

// @desc Logout user
// @route POST /api/v1/auth/logout
// @access Private
export const logoutUser = async (userId) => {
    // Check user existence
    const user = await User.findById(userId);

    if (!user) {
        throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Return user
    return user;
};
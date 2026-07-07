import bcrypt from "bcryptjs";
import User from "../auth/user.model.js";
import generateToken from "../../utils/generateToken.js";

export const registerUser = async (userData) => {
    // Existing user check
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new Error("User already exists.");
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
        throw new Error("Invalid email or password.");
    }

    // Check Password
    const isPasswordMatched = await bcrypt.compare(
        userData.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password.");
    }

    // Generate JWT Tokrn
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
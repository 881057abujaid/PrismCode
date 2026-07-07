import bcrypt from "bcryptjs";
import User from "../auth/user.model.js";

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
}
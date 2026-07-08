/**
 * generateToken.js
 * 
 * Generates a JWT token.
 * 
 * @module generateToken
 * @requires jsonwebtoken
*/

import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export default generateToken;
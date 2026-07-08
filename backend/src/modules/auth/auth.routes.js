/**
 * auth.routes.js
 * 
 * Routes for auth-related operations.
 * 
 * @module auth
 * @requires express
 * @requires ../auth/auth.controller
*/

import { Router } from "express";
import { login, register } from "./auth.controller.js";

const router = Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

export default router;
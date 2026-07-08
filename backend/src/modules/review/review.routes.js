/**
 * review.routes.js
 * 
 * Routes for review-related endpoints.
 * 
 * @module review
 * @requires express
 * @requires ../auth/auth.middleware
*/

import { Router } from "express";
import { generateReview } from "./review.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

// Generate review for a code
router.post("/", protect, generateReview);

export default router;
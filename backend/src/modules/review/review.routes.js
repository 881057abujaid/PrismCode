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
import { generateProjectReview } from "./review.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

// Generate review for a project
router.post("/:projectId/review", protect, generateProjectReview);

export default router;
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
import { createProjectReview, getProjectReviews, getReviewById } from "./review.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router({ mergeParams: true });

// Generate review for a code
router.post("/", protect, createProjectReview);

// Get all reviews for a project
router.get("/", protect, getProjectReviews);

// Get review by id
router.get("/:reviewId", protect, getReviewById);

export default router;
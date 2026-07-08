/**
 * project.routes.js
 * 
 * Routes for project-related endpoints.
 * 
 * @module project
 * @requires express
 * @requires project.controller
 * @requires auth.middleware
 */

import { Router } from "express";
import { createProject, getProjects, updateProject } from "./project.controller.js";
import { generateProjectReview } from "../review/review.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

// Create a new project
router.post("/", protect, createProject);

// Get all projects
router.get("/", protect, getProjects);

// Generate review for a project
router.post("/:projectId/review", protect, generateProjectReview);

// Update a project
router.put("/:projectId", protect, updateProject);

export default router;
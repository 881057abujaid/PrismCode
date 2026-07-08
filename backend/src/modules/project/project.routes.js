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
import { createProject, getProjects } from "./project.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

// Create a new project
router.post("/", protect, createProject);

// Get all projects
router.get("/", protect, getProjects);

export default router;
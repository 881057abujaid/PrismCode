import { Router } from "express";
import { createProject } from "./project.controller.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

router.post("/", protect, createProject);

export default router;
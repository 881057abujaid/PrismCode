/**
 * project.validation.js
 * 
 * Validation schemas for project-related operations.
 * 
 * @module project
 * @requires zod
*/

import { z } from "zod";

// Create project validation schema
export const createProjectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 2 characters.")
        .max(100),

    description: z
        .string()
        .trim()
        .optional(),

    language: z
        .string()
        .trim()
        .min(1, "Language is required."),

    code: z
        .string()
        .trim()
        .min(1, "Code cannot be empty.")
});
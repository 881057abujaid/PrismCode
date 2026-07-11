import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required").min(3, "Title must be at least 3 characters long"),
    description: z.string().min(1, "Description is required").min(10, "Description must be at least 10 characters long"),
    language: z.string().min(1, "Language is required").min(2, "Language must be at least 2 characters long"),
    code: z.string().min(1, "Code is required").min(10, "Code must be at least 10 characters long"),
});
import { z } from "zod";

export const createReviewSchema = z.object({
    language: z.string().trim().min(1, "Language is required."),
    code: z.string().trim().min(1, "Code is required."),
});

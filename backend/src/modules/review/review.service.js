/**
 * review.service.js
 * 
 * Services for review-related operations.
 * 
 * @module review
 * @requires ../config/groq
 * @requires ../project/project.model
 * @requires ../shared/prompts/review.prompt
 * @requires ../shared/constants/messages
 * @requires ../shared/constants/role
 * @requires ../shared/constants/projectStatus
*/

import { getGroqClient } from "../../config/groq.js";
import Project from "../project/project.model.js";
import { ERROR_MESSAGES } from "../../shared/constants/messages.js";
import { ROLES } from "../../shared/constants/role.js";
import { PROJECT_STATUS } from "../../shared/constants/projectStatus.js";
import { buildReviewPrompt } from "../../shared/prompts/review.prompt.js";

// @desc    Test Groq connection
// @route   GET /api/v1/review/test-groq
// @access  Private
export const testGroqConnection = async () => {
    const groq = getGroqClient();
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: ROLES.USER,
                content: "Reply with only: PrismCode Connected",
            },
        ],
    });
    return response?.choices?.[0]?.message?.content;
};

// @desc    Generate review for a given code
// @route   POST /api/v1/review/generate-review
// @access  Private
export const generateReview = async (language, code) => {
    const groq = getGroqClient();
    const prompt = buildReviewPrompt(code, language);

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: ROLES.USER,
                content: prompt
            }
        ],
        temperature: 0.3,
    });

    return response?.choices?.[0]?.message?.content;
};

export const generateProjectReview = async (projectId, userId) => {
    // Check project existence
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error(ERROR_MESSAGES.PROJECT_NOT_FOUND);
    }

    // Ownership Check
    if (project.createdBy.toString() !== userId.toString()) {
        throw new Error(ERROR_MESSAGES.NOT_AUTHORIZED);
    }

    // Check if review already exists
    if (project.review) {
        return project;
    }

    // Generate AI Review from GROQ
    const review = await generateReview(project.language, project.code);

    // Update project with review
    project.review = review;
    project.reviewedAt = new Date();
    project.status = PROJECT_STATUS.REVIEWED;

    // Save project
    await project.save();

    // Return review
    return project;
}
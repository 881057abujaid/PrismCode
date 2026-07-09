/**
 * review.service.js
 * 
 * Services for review-related operations.
 * 
 * @module review
 * @requires ../config/groq
 * @requires ../project/project.model
*/

import { getGroqClient } from "../../config/groq.js";
import Project from "../project/project.model.js";
import { ERROR_MESSAGES } from "../../shared/constants/messages.js";
import { ROLES } from "../../shared/constants/role.js";
import { PROJECT_STATUS } from "../../shared/constants/projectStatus.js";

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
    const prompt = `
    You are a Senior Software Engineer and Code Reviewer.
    
    Your task is to review the submitted source code.
    
    Analyze the code carefully and provide your review in Markdown.
    
    Include the following sections:
    
    # Code Summary
    
    # Strengths
    
    # Issues Found
    
    # Security Concerns
    
    # Performance Improvements
    
    # Clean Code Suggestions
    
    # Best Practices
    
    # Final Verdict
    
    Do not rewrite the entire code unless necessary.

    Do not recommend TypeScript unless the submitted code already uses TypeScript.

    Do not suggest classes, design patterns or architectural changes for very small utility functions.

    Keep the review proportional to the complexity of the code.

    Avoid generic advice.

    Give practical suggestions only.
    
    Language:
    ${language}
    
    Code:
    ${code}
    
    Give me the review in the JSON format. With Keys as:
    codeSummary
    strengths
    issuesFound
    securityConcerns
    performanceImprovements
    cleanCodeSuggestions
    bestPractices
    finalVerdict`;

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
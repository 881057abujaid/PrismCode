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

// @desc    Test Groq connection
// @route   GET /api/v1/review/test-groq
// @access  Private
export const testGroqConnection = async () => {
    const groq = getGroqClient();
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
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
                role: "user",
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
        throw new Error("Project not found");
    }

    // Check if review already exists
    if (project.review) {
        return project;
    }

    // Ownership Check
    if (project.createdBy.toString() !== userId.toString()) {
        throw new Error("You are not authorized to review this project");
    }

    // Generate AI Review from GROQ
    const review = await generateReview(project.language, project.code);

    // Update project with review
    project.review = review;
    project.status = "reviewed";

    // Save project
    await project.save();

    // Return review
    return project;
}
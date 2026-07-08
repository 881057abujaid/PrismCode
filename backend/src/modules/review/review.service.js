/**
 * review.service.js
 * 
 * Services for review-related operations.
 * 
 * @module review
 * @requires ../config/groq
*/

import { getGroqClient } from "../../config/groq.js";

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
    
    Language:
    ${language}
    
    Code:
    ${code}`;

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
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
    const prompt = `
    You are a senior software engineer.
    
    Review the following ${language} code.

    Provide:

    1. Summary
    2. Bugs
    3. Improvements
    4. Best Practices
    5. Optimized Code

    Code:
    ${code}
    `;

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
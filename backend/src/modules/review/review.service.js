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
/**
 * groq.js
 * 
 * Groq API client configuration.
 * 
 * @module groq
 * @requires groq-sdk
*/

import Groq from "groq-sdk";

let groq = null;

export const getGroqClient = () => {
    if (!groq) {
        groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }
    return groq;
};
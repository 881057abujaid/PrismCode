import { getGroqClient } from "../../config/groq.js";

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
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function generateResponse(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {"role": "user", "content": prompt}
            ]
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI API error:", error);
        throw error;
    }
} 
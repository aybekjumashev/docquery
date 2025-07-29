
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { Language, languageOptions } from '../lib/translations';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-2.5-flash';

const getLanguageName = (langCode: Language) => {
    return languageOptions.find(opt => opt.value === langCode)?.label || 'English';
}

export const summarizeText = async (text: string, language: Language): Promise<string> => {
    try {
        const languageName = getLanguageName(language);
        const prompt = `Provide a concise, easy-to-read summary of the following document. Use bullet points for key takeaways. IMPORTANT: Respond ONLY in the following language: ${languageName}. Document:\n\n---\n\n${text}`;
        
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing text:", error);
        throw new Error("Failed to generate summary. The model may have refused to respond.");
    }
};

export const startChat = (documentText: string, language: Language): Chat => {
    const languageName = getLanguageName(language);
    const systemInstruction = `You are an expert AI assistant. Your purpose is to answer questions based *only* on the content of the document provided below. Do not use any external knowledge. If the answer cannot be found within the document, state clearly that the document does not contain the information. Be helpful and precise. IMPORTANT: Respond ONLY in the following language: ${languageName}.

Here is the document:
---
${documentText}
---`;

    const chat = ai.chats.create({
        model: modelName,
        config: {
            systemInstruction: systemInstruction,
        },
    });
    return chat;
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to get a response from the model.");
    }
};

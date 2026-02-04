
import { GoogleGenAI } from "@google/genai";
import { CHATBOT_INSTRUCTIONS } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const chatWithAssistant = async (message: string, history: { role: 'user' | 'model', text: string }[] = []) => {
  const ai = getAIClient();
  
  // Using gemini-2.5-flash-lite-latest for low latency as requested
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash-lite-latest',
    config: {
      systemInstruction: CHATBOT_INSTRUCTIONS,
      temperature: 0.7,
    },
  });

  // Re-establish history if any
  // Note: For simplicity in this demo, we'll just send the message 
  // with current context or use the built-in history if we manage it correctly.
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getFastAIResponse = async (prompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
  });
  return response.text;
};

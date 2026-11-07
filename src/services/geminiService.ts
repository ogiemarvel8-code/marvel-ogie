import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithAura(message: string, history: { role: "user" | "model", parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: "You are Aura AI, the virtual assistant for Aura Motors, a premium electric vehicle company. You are helpful, sophisticated, and knowledgeable about Aura's car models (Tesla Model S Plaid, Porsche Taycan Turbo S, Lucid Air Sapphire), technology (Next-Gen Propulsion, Aura Intelligence), and sustainability efforts. Keep responses concise and premium." }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am Aura AI, ready to assist you with your inquiries about Aura Motors and our pursuit of electric excellence." }],
        },
        ...history,
        {
          role: "user",
          parts: [{ text: message }]
        }
      ],
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting right now. Please try again later.";
  }
}

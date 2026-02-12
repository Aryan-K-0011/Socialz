import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real production app, you would handle API keys more securely (e.g., backend proxy).
// For this frontend-only demo, we use the environment variable directly.
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateContentIdeas = async (topic: string, vibe: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key not configured.";

  try {
    const prompt = `
      Act as a professional social media manager.
      Generate 3 creative social media post ideas including captions and hashtags.
      Topic: ${topic}
      Vibe/Tone: ${vibe}
      
      Format the output clearly with emojis.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No ideas generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate content. Please check your API key or try again later.";
  }
};

export const generateBio = async (businessType: string, highlights: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key not configured.";

  try {
    const prompt = `
      Write a catchy and professional Instagram bio for a ${businessType}.
      Key Highlights to include: ${highlights}
      Keep it under 150 characters if possible, use emojis/bullet points.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No bio generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating bio.";
  }
};

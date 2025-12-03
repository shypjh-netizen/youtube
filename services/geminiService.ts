import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedScriptResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateViralScript = async (
  referenceScript: string,
  newTopic: string
): Promise<GeneratedScriptResult> => {
  const model = "gemini-2.5-flash";

  const systemInstruction = `
    You are an expert YouTube Script Consultant and Copywriter.
    Your task is to take a "Reference Script" (which is known to be successful/viral) and a "New Topic".
    
    1. First, deep-analyze the Reference Script to understand WHY it worked. Look for:
       - The specific hook structure (how it grabs attention in 5 seconds).
       - The pacing and sentence length.
       - Where the open loops (curiosity gaps) are placed.
       - The tone (exciting, serious, funny, fast-paced).
    
    2. Then, write a BRAND NEW script for the "New Topic" that strictly follows the structural and psychological blueprint of the Reference Script.
    
    3. The output must be in Korean (Hangul).
    
    IMPORTANT: The new script must not just copy the words, but copy the *soul* and *rhythm* of the reference.
    Include visual cues for the editor.
  `;

  const prompt = `
    [Reference Script]:
    ${referenceScript}

    [New Topic]:
    ${newTopic}
  `;

  // Define the JSON schema for structured output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      analysis: {
        type: Type.OBJECT,
        properties: {
          hookStrategy: { type: Type.STRING, description: "Analysis of how the original script grabs attention." },
          pacingAndTone: { type: Type.STRING, description: "Description of the rhythm, speed, and emotional tone." },
          retentionTactics: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of specific psychological triggers used to keep viewers watching."
          }
        },
        required: ["hookStrategy", "pacingAndTone", "retentionTactics"]
      },
      newScript: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A click-baity, viral-style title for the new video." },
          thumbnailIdea: { type: Type.STRING, description: "A concept for the thumbnail text/visual." },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sectionName: { type: Type.STRING, description: "E.g., Hook, Body, Climax, CTA" },
                spokenAudio: { type: Type.STRING, description: "The actual words the narrator says." },
                visualCue: { type: Type.STRING, description: "Instructions for b-roll, graphics, or editing." }
              },
              required: ["sectionName", "spokenAudio", "visualCue"]
            }
          }
        },
        required: ["title", "thumbnailIdea", "sections"]
      }
    },
    required: ["analysis", "newScript"]
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly creative but structured
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedScriptResult;
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
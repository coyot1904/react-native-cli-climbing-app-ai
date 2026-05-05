import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: 'YOUR_API_KEY',
});

const history: any[] = [];

export const askClimbingAI = async (userPrompt: string) => {
  try {
    history.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',

      contents: history,

      config: {
        responseMimeType: 'application/json',

        systemInstruction: `
You are a professional mountaineering expert.

Return valid JSON only.

Response format:
{
  "message": "string",
  "images": ["url1", "url2"],
  "showImages": true
}

Rules:
- If visuals help the answer, set showImages=true
- If visuals are unnecessary, return empty images array
- Only answer climbing-related questions
`,
      },
    });

    const rawText = result.text || '{}';

    const parsed = JSON.parse(rawText);

    history.push({
      role: 'model',
      parts: [{ text: parsed.message }],
    });

    return parsed;
  } catch (error) {
    console.error(error);

    return {
      message: 'AI error',
      images: [],
      showImages: false,
    };
  }
};

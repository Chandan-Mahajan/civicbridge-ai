import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({ path: '/Users/chandanmahajan/Documents/CivicBridge AI/server/.env' });

async function main() {
  const apiKey = process.env.GEMINI_API_KEY!;
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  console.log('Testing model:', model);
  const ai = new GoogleGenAI({ apiKey });
  const start = Date.now();
  const res = await ai.models.generateContent({
    model,
    contents: 'Translate to Hindi: "The street light in front of my house is broken for 3 days."',
  });
  console.log('Took:', (Date.now() - start) / 1000, 's');
  console.log('Result:', res.text);
}
main().catch(console.error);

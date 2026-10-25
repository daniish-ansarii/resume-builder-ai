import OpenAI from "openai";

const geminiApiKey = process.env.GEMINI_API_KEY;
export const aiModel = process.env.GEMINI_MODEL || "gemini-3.8-flash";
export const aiFastModel = process.env.GEMINI_FAST_MODEL || "gemini-3.5-flash-lite";
export const aiImportModel = process.env.GEMINI_IMPORT_MODEL || aiFastModel;

const ai = geminiApiKey ? new OpenAI({
    apiKey: geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    timeout: 30_000,
    maxRetries: 0,
}) : null;

export default ai

import Resume from "../models/Resume.js";
import ai, { aiFastModel, aiImportModel } from '../configs/ai.js'

const requireAI = (res) => {
    if (!ai) {
        res.status(503).json({message: 'Gemini AI is not configured. Set GEMINI_API_KEY in server/.env.'});
        return false;
    }
    return true;
}

const reportAIError = (res, error) => {
    const upstreamStatus = error.status ? ` (Gemini HTTP ${error.status})` : "";
    console.error(`Gemini request failed${upstreamStatus}:`, error.message);
    return res.status(502).json({message: `Gemini request failed${upstreamStatus}: ${error.message}`});
}

// controller for ehancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        if (!requireAI(res)) return;
        const { userContent } = req.body;

        if(!userContent) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const response = await ai.chat.completions.create({
            model: aiFastModel,
            messages: [
                { role: "system", content: "Rewrite the resume summary as 1-2 concise, specific, ATS-friendly sentences. Return only the revised summary." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            max_tokens: 256,
            })

            const enhancedContent = response.choices[0].message.content;
            return res.status(200).json({enhancedContent})
        } catch (error) {
            return reportAIError(res, error)
        }
    }

    // controller for enhancing a resume's job description
    // POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        if (!requireAI(res)) return;
        const { userContent } = req.body;

        if(!userContent) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const response = await ai.chat.completions.create({
            model: aiFastModel,
            messages: [
                { role: "system", content: "Rewrite this resume job description as 1-2 concise, achievement-focused, ATS-friendly sentences. Preserve facts and return only the revised description." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            max_tokens: 256,
            })

            const enhancedContent = response.choices[0].message.content;
            return res.status(200).json({enhancedContent})
        } catch (error) {
            return reportAIError(res, error)
        }
    }

    // controller for uploading a resume to the database
    // POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        if (!requireAI(res)) return;

        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const userPrompt = `Extract information from the entire resume, including every page. Preserve all skills, projects, work history, education, certifications, and publications; do not stop after the first page. Keep descriptions concise and use empty strings or arrays for missing information. Return only JSON with this shape:
{"professional_summary":"","skills":[],"personal_info":{"image":"","full_name":"","profession":"","email":"","phone":"","location":"","linkedin":"","website":""},"experience":[{"company":"","position":"","start_date":"","end_date":"","description":"","is_current":false}],"project":[{"name":"","type":"","description":""}],"publications":[{"title":"","authors":"","publisher":"","date":"","url":"","description":""}],"education":[{"institution":"","degree":"","field":"","graduation_date":"","gpa":""}]}

Resume text from all pages:\n${resumeText}`;
 
        const response = await ai.chat.completions.create({
            model: aiImportModel,
            messages: [
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {type: 'json_object'},
            max_tokens: 3500,
            })

            const extractedData = response.choices[0].message.content;
            const parsedData = JSON.parse(extractedData)
            const newResume = await Resume.create({userId, title, ...parsedData})

            res.json({resumeId: newResume._id})
        } catch (error) {
            return reportAIError(res, error)
        }
    }



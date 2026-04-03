const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.analyzeResume = async (resumeText) => {
    const prompt = `Analyze the following resume text and provide a structured JSON response with:
    1. Summary of candidate
    2. List of key skills
    3. Suggested job roles
    4. Profile improvement tips
    
    Resume Text: ${resumeText}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        throw error;
    }
};

exports.calculateJobMatch = async (jobDesc, candidateProfile) => {
    // ... same code ...
};

// Alias for consistency
exports.analyzeJobMatch = exports.calculateJobMatch;

exports.recommendJobs = async (candidateProfile, jobs) => {
    const prompt = `Given the candidate profile and a list of jobs, return the top 5 most suitable jobs by ID.
    Candidate: ${JSON.stringify(candidateProfile)}
    Jobs: ${JSON.stringify(jobs.map(j => ({ id: j._id, title: j.title, desc: j.description })))}
    Return a JSON array of objects: { jobId, score, reason }.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('AI Recommend Error:', error);
        throw error;
    }
};

exports.optimizeKeywords = async (resumeText, jobTitle) => {
    const prompt = `Analyze this resume for a ${jobTitle} role and suggest 5-10 missing keywords or phrases to improve ATS compatibility.
    Resume: ${resumeText}
    Return as a JSON object: { suggestedKeywords: [], explanation: "" }.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('AI Keyword Opt Error:', error);
        throw error;
    }
};

exports.generateInterviewQuestions = async (jobRole, candidateProfile) => {
    const prompt = `Generate 5 highly relevant technical and behavioral interview questions for a ${jobRole} position. 
    Tailor them specifically to this candidate's background: ${JSON.stringify(candidateProfile)}.
    Return as a JSON array of strings called "questions".`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        return JSON.parse(response.choices[0].message.content).questions;
    } catch (error) {
        console.error('AI Interview Gen Error:', error);
        throw error;
    }
};

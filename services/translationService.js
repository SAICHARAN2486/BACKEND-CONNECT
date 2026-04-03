const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Translates text into target languages using OpenAI.
 * @param {string} text - The source text.
 * @param {string[]} targetLanguages - Array of target languages (e.g., ['Telugu', 'Hindi', 'English']).
 * @returns {Object} - Object with translations { telugu, hindi, english }.
 */
exports.translateText = async (text) => {
    const prompt = `Translate the following text into Telugu, Hindi, and English. 
    Return the result as a JSON object with keys "telugu", "hindi", and "english".
    
    Text: "${text}"`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        const translations = JSON.parse(response.choices[0].message.content);
        return {
            telugu: translations.telugu || "",
            hindi: translations.hindi || "",
            english: translations.english || ""
        };
    } catch (error) {
        console.error('Translation Service Error:', error);
        throw error;
    }
};

/**
 * Generates an AI response for the voice assistant.
 * @param {string} text - User input.
 * @returns {string} - AI generated response in English.
 */
exports.generateAIResponse = async (text, history = []) => {
    const messages = [
        { role: "system", content: "You are a helpful career assistant for the CareerConnect AI platform. Provide concise, helpful, and friendly responses." },
        ...history,
        { role: "user", content: text }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('AI Response Error:', error);
        throw error;
    }
};
/**
 * Generates a professional cover letter using OpenAI.
 * @param {Object} details - Job and user details { jobTitle, company, description, userName, skills }.
 * @returns {string} - AI generated cover letter.
 */
exports.generateCoverLetter = async ({ jobTitle, company, description, userName, skills }) => {
    const prompt = `Write a professional and compelling cover letter for the following job application:
    
    Job Title: ${jobTitle}
    Company: ${company}
    Job Description: ${description}
    
    Applicant Name: ${userName}
    Applicant Skills: ${skills ? skills.join(', ') : 'Not specified'}
    
    The cover letter should be tailored to the job description and highlight why the candidate is a great fit. Focus on a tone that is professional yet enthusiastic.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Cover Letter Generation Error:', error);
        throw error;
    }
};

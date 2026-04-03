const { translateText, generateAIResponse, generateCoverLetter } = require('../services/translationService');

exports.getVoiceAssistantResponse = async (req, res) => {
    try {
        const { text, history } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text input is required' });
        }

        const userTranslations = await translateText(text);
        const aiResponseEnglish = await generateAIResponse(userTranslations.english, history);
        const aiTranslations = await translateText(aiResponseEnglish);

        res.json({
            user: userTranslations,
            ai: aiTranslations
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.analyzeResume = async (req, res) => {
    try {
        // Mock AI analysis logic
        setTimeout(() => {
            res.json({
                score: 82,
                summary: "Highly skilled Frontend Developer with strong React and Tailwind CSS expertise.",
                skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js"],
                suggestions: [
                    "Add more details about AWS or Google Cloud experience.",
                    "Quantify achievements in previous roles.",
                    "Include a section for personal projects."
                ]
            });
        }, 2000);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInterviewQuestions = async (req, res) => {
    try {
        const { role } = req.body;
        // Mock question generation
        setTimeout(() => {
            res.json({
                questions: [
                    `How do you optimize React performance in a large-scale ${role} application?`,
                    "Can you explain your experience with state management beyond Redux?",
                    "Describe a time you had to handle a critical production bug.",
                    "How do you ensure accessibility in complex dashboard interfaces?",
                    "How would you approach integrating real-time WebSocket data?"
                ]
            });
        }, 1500);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.generateCoverLetter = async (req, res) => {
    try {
        const { jobTitle, company, description, userName, skills } = req.body;
        if (!jobTitle || !company) {
            return res.status(400).json({ message: 'Job title and company are required' });
        }

        const coverLetter = await generateCoverLetter({ jobTitle, company, description, userName, skills });
        res.json({ coverLetter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

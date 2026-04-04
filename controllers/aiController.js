const { translateText, generateAIResponse, generateCoverLetter } = require('../services/translationService');

exports.getVoiceAssistantResponse = async (req, res) => {
    try {
        console.log('Voice Assistant Request Received');
        const { text, history } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: 'Text input is required' });
        }

        console.log('User said:', text);

        // Mock multilingual response (you can integrate real AI later)
        setTimeout(() => {
            res.json({
                user: {
                    telugu: "మీరు అడిగారు: " + text,
                    english: "You asked: " + text,
                    hindi: "आपने पूछा: " + text
                },
                ai: {
                    telugu: "నేను మీ ప్రశ్నకు సహాయం చేస్తాను. దయచేసి మీ కెరీర్ గురించి మరింత సమాచారం తెలియజేండి.",
                    english: "I'm here to help with your career. Please tell me more about your job search or skills.",
                    hindi: "मैं आपके करियर में मदद करने के लिए हूं। कृपया अपनी नौकरी खोज या कौशल के बारे में और बताएं।"
                }
            });
        }, 1000);
    } catch (error) {
        console.error('Voice Assistant Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.analyzeResume = async (req, res) => {
    try {
        console.log('AI Analysis Request Received');
        console.log('File:', req.file);
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // For now, return mock analysis (you can integrate real AI later)
        setTimeout(() => {
            res.json({
                score: 85,
                summary: "Strong frontend developer with excellent React and modern JavaScript skills. Good foundation in web technologies and responsive design.",
                skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Git"],
                suggestions: [
                    "Add more specific project achievements with metrics",
                    "Include experience with testing frameworks",
                    "Highlight any backend or full-stack experience",
                    "Add certifications or online courses completed"
                ]
            });
        }, 2000);
    } catch (error) {
        console.error('AI Analysis Error:', error);
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

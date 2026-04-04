const express = require('express');
const { getVoiceAssistantResponse, analyzeResume, getInterviewQuestions, generateCoverLetter } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/voice-assistant', getVoiceAssistantResponse); // Removed protect for testing
router.post('/analyze-resume', analyzeResume); // Removed protect for testing
router.post('/interview-questions', protect, getInterviewQuestions);
router.post('/generate-cover-letter', protect, generateCoverLetter);

module.exports = router;

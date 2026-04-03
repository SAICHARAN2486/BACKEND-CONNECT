const mongoose = require('mongoose');

const aiAnalysisSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['Resume-Analysis', 'Job-Matching', 'Interview-Prep'] },
    inputData: { type: mongoose.Schema.Types.Mixed }, // The content analyzed
    outputData: { type: mongoose.Schema.Types.Mixed }, // AI response (JSON)
    tokensUsed: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIAnalysis', aiAnalysisSchema);

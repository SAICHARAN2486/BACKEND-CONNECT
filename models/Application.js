const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resume: { type: String },
    coverLetter: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Shortlisted', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    aiFeedback: { type: String },
    aiMatchScore: { type: Number, min: 0, max: 100 },
    aiAnalysis: { type: mongoose.Schema.Types.Mixed },
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);

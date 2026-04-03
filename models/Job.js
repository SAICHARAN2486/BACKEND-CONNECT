const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    salaryRange: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'USD' }
    },
    location: { type: String, required: true },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Remote', 'Contract'],
        default: 'Full-time'
    },
    experienceLevel: { type: String },
    skillsRequired: [String],
    category: { type: String },
    isPremium: { type: Boolean, default: false },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);

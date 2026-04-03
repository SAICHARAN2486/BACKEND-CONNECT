const Application = require('../models/Application');
const Job = require('../models/Job');
const aiService = require('../services/aiService');

exports.applyToJob = async (req, res) => {
    try {
        const { jobId, coverLetter } = req.body;
        const existingApp = await Application.findOne({ jobId, applicantId: req.user.id });

        if (existingApp) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Trigger AI Match Analysis
        const aiAnalysis = await aiService.analyzeJobMatch(
            job.description,
            req.user.skills ? req.user.skills.join(', ') : 'No skills listed'
        );

        const application = await Application.create({
            jobId,
            applicantId: req.user.id,
            resume: req.user.resume,
            coverLetter,
            aiMatchScore: aiAnalysis?.score || 0,
            aiAnalysis: aiAnalysis,
            aiFeedback: aiAnalysis?.summary || 'Waiting for AI analysis'
        });

        res.status(201).json(application);
    } catch (error) {
        console.error('Apply Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getApplicationsByJob = async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId })
            .populate('applicantId', 'name email skills resume');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.user.id })
            .populate({
                path: 'jobId',
                populate: { path: 'employerId', select: 'name' }
            })
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

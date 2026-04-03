const Job = require('../models/Job');
const redis = require('../services/redisService');

exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            employerId: req.user.id
        });
        // Clear jobs cache on new post
        await redis.del('jobs:*');
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const { keyword, location, type, minSalary } = req.query;
        const cacheKey = `jobs:${JSON.stringify(req.query)}`;

        // Try getting from cache
        const cachedJobs = await redis.get(cacheKey);
        if (cachedJobs) return res.json(JSON.parse(cachedJobs));

        let query = { status: 'Open' };
        // ... filtering logic ...
        if (keyword) query.title = { $regex: keyword, $options: 'i' };
        if (location) query.location = { $regex: location, $options: 'i' };
        if (type) query.jobType = type;
        if (minSalary) query['salaryRange.min'] = { $gte: Number(minSalary) };

        const jobs = await Job.find(query).populate('employerId', 'name').sort({ createdAt: -1 });

        // Save to cache for 5 minutes
        await redis.set(cacheKey, JSON.stringify(jobs), { EX: 300 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employerId', 'name email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.employerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.employerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employerId: req.user.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

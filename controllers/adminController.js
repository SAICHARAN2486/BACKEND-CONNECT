const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getPlatformStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        
        // Get user growth (last 30 days)
        const lastMonth = new Date();
        lastMonth.setDate(lastMonth.getDate() - 30);
        const usersLastMonth = await User.countDocuments({ createdAt: { $gte: lastMonth } });
        
        // Calculate user growth percentage
        const growth = totalUsers > usersLastMonth ? ((usersLastMonth / (totalUsers - usersLastMonth)) * 100).toFixed(1) : 0;

        res.json({
            stats: [
                { label: 'Total Users', value: totalUsers.toLocaleString(), change: `+${growth}%`, icon: 'Users', color: 'text-primary' },
                { label: 'Active Jobs', value: totalJobs.toLocaleString(), change: '+5.4%', icon: 'Briefcase', color: 'text-secondary' },
                { label: 'Applications', value: totalApplications.toLocaleString(), change: '+18%', icon: 'FilePlus', color: 'text-green-400' },
                { label: 'AI Match Rate', value: '94%', change: '+2.1%', icon: 'Activity', color: 'text-accent' },
            ]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const express = require('express');
const router = express.Router();
const { getPlatformStats, getAllUsers, updateUserStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/stats', protect, authorize('admin', 'superadmin'), getPlatformStats);
router.get('/users', protect, authorize('admin', 'superadmin'), getAllUsers);
router.put('/users/:id', protect, authorize('admin', 'superadmin'), updateUserStatus);

module.exports = router;

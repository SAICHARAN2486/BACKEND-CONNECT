const express = require('express');
const { applyToJob, getApplicationsByJob, updateApplicationStatus, getMyApplications } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('jobseeker'), applyToJob);
router.get('/my-applications', protect, authorize('jobseeker'), getMyApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getApplicationsByJob);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;

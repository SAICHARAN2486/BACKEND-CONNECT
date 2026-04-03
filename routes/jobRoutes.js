const express = require('express');
const { createJob, getJobs, getJobById, updateJob, deleteJob, getMyJobs } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getJobs);
router.get('/my-jobs', protect, authorize('employer', 'admin'), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;

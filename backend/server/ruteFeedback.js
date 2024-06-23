const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createFeedback, getFeedbacks } = require('./controllers/feedbackController');
const router = express.Router();

router.post('/feedback', protect, createFeedback);
router.get('/feedback', protect, getFeedbacks);

module.exports = router;
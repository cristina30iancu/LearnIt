const asyncHandler = require('express-async-handler');
const Feedback = require('../models/feedback');

exports.createFeedback = asyncHandler(async (req, res) => {
    const { name, email, details } = req.body;

    const feedback = await Feedback.create({
        name,
        email,
        details
    });

    res.status(201).json(feedback);
});

exports.getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
});
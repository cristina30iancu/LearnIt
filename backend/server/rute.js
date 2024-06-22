const express = require('express');
const router = express.Router();
const { getQuizByIdAndSubject, getQuizBySubject, createQuiz, updateQuiz, deleteQuiz, saveQuizScore, submitQuiz } = require('./controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
router.get('/quiz/:id/:subject', getQuizByIdAndSubject);

router.get('/quiz/:subject', getQuizBySubject);
router.post('/quiz', createQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);

// Rute pentru scoruri
router.post('/submit', protect, submitQuiz);

module.exports = router;

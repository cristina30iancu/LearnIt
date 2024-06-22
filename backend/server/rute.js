const express = require('express');
const router = express.Router();
const { getQuizByIdAndSubject, getSingleUserAnswer, getQuizBySubject, createQuiz, updateQuiz, deleteQuiz, getAnswersOfUser, submitQuiz } = require('./controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
router.get('/quiz/:id/:subject', getQuizByIdAndSubject);

router.get('/quiz/:subject', getQuizBySubject);
router.post('/quiz', createQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);
router.post('/submit', protect, submitQuiz);
router.get('/user-answers', protect, getAnswersOfUser);
router.get('/user-answers/:id', protect, getSingleUserAnswer);
module.exports = router;

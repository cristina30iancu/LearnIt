const express = require('express');
const router = express.Router();
const { getQuizByIdAndSubject, getQuizBySubject, createQuiz, updateQuiz, deleteQuiz, saveQuizScore } = require('./controllers/quizController');

router.get('/quiz/:id/:subject', getQuizByIdAndSubject);
router.get('/quiz/:subject', getQuizBySubject);
router.post('/quiz', createQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);

// Rute pentru scoruri
router.post('/score', saveQuizScore);

module.exports = router;

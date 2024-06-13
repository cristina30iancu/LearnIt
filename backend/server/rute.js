const express = require('express');
const router = express.Router();
const quizController = require('./controllers/quizController');


router.get('/quiz/:id/:subject', quizController.getQuizByIdAndSubject);





module.exports = router;

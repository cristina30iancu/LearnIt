const Quiz = require('../models/quizz');
const Score = require('../models/score');
const asyncHandler = require('express-async-handler');

exports.getQuizByIdAndSubject = async (req, res) => {
  try {
      const { id, subject } = req.params;
      const quiz = await Quiz.findOne({
          _id: id,
          subject: { $regex: new RegExp(subject, 'i') }
      });

      if (!quiz) {
          return res.status(404).json({ message: "Quiz-ul nu a fost găsit." });
      }

      res.json(quiz);
  } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.getQuizBySubject = async (req, res) => {
  try {
      const { subject } = req.params;
      const quiz = await Quiz.findOne({
          subject: { $regex: new RegExp(subject, 'i') }
      });

      if (!quiz) {
          return res.status(404).json({ message: "Quiz-ul nu a fost găsit." });
      }

      res.json(quiz);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.createQuiz = asyncHandler(async (req, res) => {
  const { subject, questions } = req.body;

  const quiz = new Quiz({
    subject,
    questions
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

exports.updateQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subject, questions } = req.body;

  const quiz = await Quiz.findById(id);

  if (quiz) {
    quiz.subject = subject || quiz.subject;
    quiz.questions = questions || quiz.questions;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } else {
    res.status(404);
    throw new Error('Quiz-ul nu a fost găsit');
  }
});

exports.deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const quiz = await Quiz.findById(id);

  if (quiz) {
    await quiz.remove();
    res.json({ message: 'Quiz-ul a fost șters' });
  } else {
    res.status(404);
    throw new Error('Quiz-ul nu a fost găsit');
  }
});

exports.saveQuizScore = asyncHandler(async (req, res) => {
  const { userId, quizId, score } = req.body;

  const newScore = new Score({
    userId,
    quizId,
    score
  });

  const savedScore = await newScore.save();
  res.status(201).json(savedScore);
});

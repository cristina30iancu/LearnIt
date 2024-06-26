const Quiz = require('../models/quizz');
const Score = require('../models/score');
const asyncHandler = require('express-async-handler');

exports.submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;
  const userId = req.user._id;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
      return res.status(404).json({ msg: 'Quiz nu a fost găsit' });
  }

  let score = 0;
  const detailedQuestions = [];

  answers.forEach(answer => {
    const question = quiz.questions.find(q => q.question === answer.questionText); // Folosim textul întrebării pentru a găsi întrebarea
   
    if (question) {
        const isCorrect = question.answer === answer.answer;
        if (isCorrect) {
            score++;
        }
        detailedQuestions.push({
            question: question.question,
            options: question.options,
            answer: question.answer,
            givenAnswer: answer.answer
        });
    } else {
        console.log(`Question with text "${answer.questionText}" not found in quiz ${quizId}`);
    }
});

  const newScore = await Score.create({
      userId,
      quizId,
      score,
      questions: detailedQuestions
  });

  res.status(200).json({ score: newScore.score });
};

exports.getQuizBySubject = async (req, res) => {
  try {
    const { subject } = req.body;
    const quiz = await Quiz.findOne({
      subject: { $regex: new RegExp(subject, 'i') }
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz-ul nu a fost găsit." });
    }

    // Randomizează și selectează 20 de întrebări
    const questions = quiz.questions.sort(() => 0.5 - Math.random()).slice(0, 20);

    // Trimite quiz-ul cu întrebările selectate
    res.json({ ...quiz.toObject(), questions });
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

exports.getSingleUserAnswer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const scoreId = req.params.id;

  const score = await Score.findOne({ _id: scoreId, userId }).populate('quizId');
  if (!score) {
    res.status(404);
    throw new Error('Scorul nu a fost găsit');
  }

  res.status(200).json(score);
});

exports.getAnswersOfUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const scores = await Score.find({ userId }).populate('quizId');
  res.status(200).json(scores);
});
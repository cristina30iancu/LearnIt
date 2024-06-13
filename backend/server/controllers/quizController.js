const Quiz = require('../models/quizz');

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
        res.status(500).json({ message: error.message });
    }
};




  /*// Funcție pentru a actualiza o întrebare existentă
exports.updateQuestion = async (req, res) => {
    const { subject, questionId, question, options, answer } = req.body;
    try {
      const quiz = await Quiz.findOne({ subject: subject });
      if (!quiz) {
        return res.status(404).json({ message: "Quiz-ul nu a fost găsit." });
      }
      const questionIndex = quiz.questions.findIndex(q => q._id.equals(questionId));
      if (questionIndex === -1) {
        return res.status(404).json({ message: "Întrebarea nu a fost găsită." });
      }
      const updatedQuestion = { question, options, answer };
      quiz.questions[questionIndex] = updatedQuestion;
      await quiz.save();
      res.status(200).json({ message: "Întrebarea a fost actualizată." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Funcție pentru a șterge o întrebare
  exports.deleteQuestion = async (req, res) => {
    const { subject, questionId } = req.body;
    try {
      const quiz = await Quiz.findOne({ subject: subject });
      if (!quiz) {
        return res.status(404).json({ message: "Quiz-ul nu a fost găsit." });
      }
      quiz.questions = quiz.questions.filter(q => !q._id.equals(questionId));
      await quiz.save();
      res.status(200).json({ message: "Întrebarea a fost ștearsă." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };*/
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  questions: [{
    question: { type: String, required: true },
    options: { 
        type: [String],
        required: true,
        validate: [arrayLimit, 'Trebuie să existe cel puțin două opțiuni.']
    },
    answer: { type: String, required: true },
    givenAnswer: { type: String, required: true }
  }]
});

function arrayLimit(val) {
  return val.length >= 2;
}

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
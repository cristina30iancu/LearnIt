const mongoose = require('mongoose');


  const quizSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: true
    },
    questions: [{
      question: { type: String, required: true },
      options: { 
          type: [String],
          required: true,
          validate: [arrayLimit, 'Trebuie să existe cel puțin două opțiuni.']
      },
      answer: { type: String, required: true }
  }]
  });
  function arrayLimit(val) {
    return val.length >= 2;
}
  quizSchema.index({ subject: 1 }); // Index ascendent pe câmpul subject

  
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

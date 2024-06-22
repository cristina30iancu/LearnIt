const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const authController = require('./controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/rutaProtejata', protect, (req, res) => {
    res.json({ data: 'Ai accesat o rută protejată.' });
  });
 
router.get('/profile', protect, authController.getUserProfile);

// router.post('/forgot-password', authController.forgotPassword);

router.post('/logout', (req, res) => {
    res.json({ message: 'Deconectare reușită.' });
  });

// Ruta pentru resetarea parolei
//router.post('/reset-password/:resetToken', authController.resetPassword);

  
  // Ruta pentru verificarea tokenului
router.get('/check-token', protect, (req, res) => {
    res.json({ valid: true });
  });
  


module.exports = router;

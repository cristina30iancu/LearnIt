const jwt = require('jsonwebtoken');
const User = require('../server/models/userModel');

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Nu ești autorizat să accesezi această rută' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Nu ești autorizat, nu există token' });
  }
};

module.exports = { protect };

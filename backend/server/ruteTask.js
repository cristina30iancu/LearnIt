const express = require('express');
const router = express.Router();
const taskController = require('./controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
router.get('/tasks', protect,taskController.getAllTasks);
router.post('/tasks', protect,taskController.addTask);
router.put('/tasks/:id',protect, taskController.updateTask);

module.exports = router;
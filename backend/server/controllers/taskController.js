const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la preluarea sarcinilor', error });
  }
};

exports.addTask = async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = new Task({ text, userId: req.user._id});
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la adăugarea sarcinii', error });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { isCompleted }, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la actualizarea sarcinii', error });
  }
};
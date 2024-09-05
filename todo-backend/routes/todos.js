// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { protect } = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

// @route   GET /api/todos
// @desc    Get all user's todos
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/todos
// @desc    Add new todo
// @access  Private
router.post(
  '/',
  [
    protect,
    [check('task', 'Task is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTodo = new Todo({
        task: req.body.task,
        user: req.user.id,
        completed: req.body.completed || false,
      });

      const todo = await newTodo.save();
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/todos/:id
// @desc    Update todo
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { task, completed } = req.body;

  // Build todo object
  const todoFields = {};
  if (task) todoFields.task = task;
  if (typeof completed === 'boolean') todoFields.completed = completed;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Make sure user owns todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: todoFields },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Make sure user owns todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json({ message: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

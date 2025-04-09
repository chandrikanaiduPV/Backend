const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');  // Import your Task model
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // For parsing application/json
const uri = `mongodb+srv://chandrikapasupuletiv:2Uxf4LKIHNUn1QmC@cluster0.8eaezlf.mongodb.net/`;

// MongoDB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// --- Routes ---

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, deadline , completed } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({ message: 'Title and Deadline are required' });
  }

  const newTask = new Task({
    title,
    description,
    deadline,
    completed,
  });

  newTask.save()
    .then((task) => res.status(201).json(task))
    .catch((err) => res.status(500).json({ message: 'Error saving task', error: err }));
});

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json({ message: 'Error fetching tasks', error: err }));
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', (req, res) => {
  const { title, description, deadline, completed } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({ message: 'Title and Deadline are required' });
  }

  Task.findByIdAndUpdate(req.params.id, { title, description, deadline, completed }, { new: true })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => res.status(500).json({ message: 'Error updating task', error: err }));
});


// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully', task: deletedTask });
    })
    .catch((err) => res.status(500).json({ message: 'Error deleting task', error: err }));
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

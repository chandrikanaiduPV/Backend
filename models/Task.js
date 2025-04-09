const mongoose = require('mongoose');

// Task Schema definition
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

// Create the model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

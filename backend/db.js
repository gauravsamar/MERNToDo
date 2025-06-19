const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gauravsamar:technology@cohort.xihnb9j.mongodb.net/');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  Todo
};
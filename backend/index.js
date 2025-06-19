const express = require('express');
const { createTodo } = require('./types');
const { Todo } = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.post('/todo', async function(req, res){
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    return res.status(400).json({
      error: 'Invalid payload',
      details: parsedPayload.error.errors,
    });
  }
  // Put it in MongoDB
  await Todo.create({
    title: parsedPayload.data.title,
    description: parsedPayload.data.description,
    completed: false // Default value for completed
  })
    .then((todo) => res.status(201).json({
        message: 'Todo created successfully',
        todo: todo
    }))
    .catch((err) => res.status(500).json({ error: 'Database error', details: err.message }));
});

app.get('/todos', async function(req, res){
  // Get all todos from MongoDB
  const todos = await Todo.find({}); // Fetch all todos
  console.log(todos); // Promise to return all todos
  res.status(200).json({
    message: 'Todos fetched successfully',
    todos: todos // Return the fetched todos
  });
});

app.put('/completed', async function(req, res){
  const updatedPayload = req.body;
  const parsedPayload = createTodo.safeParse(updatedPayload);
  if(!parsedPayload.success) {   
      return res.status(400).json({
        error: 'Invalid payload',
        details: parsedPayload.error.errors,
      });
    }
  // Update the completed status of a todo
  await Todo.update({
    _id : req.body._id,
  },{
    completed: true
  })
  res.status(200).json({
    message: 'Todo marked as completed successfully'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Export the app for testing
module.exports = app;                       
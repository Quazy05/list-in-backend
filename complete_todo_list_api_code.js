const express = require('express');
const cors = require('cors');
const db = require('./dbconfig');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

// CREATE task
app.post('/tasks', async (req, res) => {
  const {
    id,
    title,
    description,
    date,
    time,
    category,
    priority,
    completed,
    createdAt
  } = req.body;

  if (!title) return res.status(400).send('Title is required');

  const task = {
    id,
    title,
    description,
    date,
    time,
    category,
    priority,
    completed,
    createdAt
  };

  try {
    const response = await db.insert({
      table: 'tasks',
      records: [task],
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// READ all tasks
app.get('/tasks', async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM your_schema.tasks'); // replace 'your_schema'
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE task
app.put('/tasks/:id', async (req, res) => {
  const updatedTask = { ...req.body, id: req.params.id };

  try {
    const response = await db.update({
      table: 'tasks',
      records: [updatedTask],
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const response = await db.delete({
      table: 'tasks',
      hashValues: [req.params.id],
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log("✅ Server running on http://<your-ip>:3000");
});

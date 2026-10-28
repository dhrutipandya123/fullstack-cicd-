
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((error) => console.error('MongoDB Connection Error:', error.message));

const Student = mongoose.model('Student', new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true }
}));

app.get('/', (req, res) => {
  res.json({ message: 'Full Stack CI/CD Backend is Running Successfully!' });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create({
      name: req.body.name,
      course: req.body.course
    });

    res.status(201).json({
      message: 'Student saved successfully!',
      student
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});

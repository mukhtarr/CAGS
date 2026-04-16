const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { apiLimiter } = require('./src/middleware/rateLimiter');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Routes
app.use('/api/academic-years', require('./src/routes/academicYears'));
app.use('/api/faculties', require('./src/routes/faculties'));
app.use('/api/classes', require('./src/routes/classes'));
app.use('/api/subjects', require('./src/routes/subjects'));
app.use('/api/students', require('./src/routes/students'));
app.use('/api/program-outcomes', require('./src/routes/programOutcomes'));
app.use('/api/psos', require('./src/routes/psos'));
app.use('/api/course-outcomes', require('./src/routes/courseOutcomes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cags';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

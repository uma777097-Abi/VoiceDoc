const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Updated CORS for port 3000 and 3001
app.use(cors({
  origin: ['http://localhost:3000', 'http://172.20.10.3:3000', 'http://localhost:3001', 'http://172.20.10.3:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err) => console.log('MongoDB Error ❌', err));

// Test Route
app.get('/', (req, res) => {
  res.send('VoiceDoc Backend Running! 🏥');
});

// Symptom Route
const symptomRoute = require('./routes/symptom');
app.use('/api/symptom', symptomRoute);

const PORT = process.env.PORT || 5000;

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
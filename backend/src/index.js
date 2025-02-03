const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://root:${process.env.DB_PASSWORD}@mongodb:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Redis Client
const redisClient = redis.createClient({ host: 'redis', port: 6379 });
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis Error:', err));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Example API Endpoint
app.get('/api/data', (req, res) => {
  redisClient.get('data', (err, data) => {
    if (data) {
      res.json({ source: 'cache', data: JSON.parse(data) });
    } else {
      const newData = { message: 'Hello from MongoDB' };
      redisClient.setex('data', 3600, JSON.stringify(newData));
      res.json({ source: 'database', data: newData });
    }
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

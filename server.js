const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const { connectToDb } = require('./db/connect');

app.get('/', (req, res) => {
  res.send('Hello World');
});

connectToDb((err) => {
  if (err) {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
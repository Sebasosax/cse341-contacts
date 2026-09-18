const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const { connectToDb } = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send('Contacts API is running. See /api-docs for documentation.');
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
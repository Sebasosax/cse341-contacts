const { MongoClient } = require('mongodb');

let database;

const connectToDb = (callback) => {
  if (database) {
    console.log('Database connection already exists.');
    return callback();
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db();
      console.log('Connected to MongoDB');
      callback();
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error('No database connection. Call connectToDb() first.');
  }
  return database;
};

module.exports = { connectToDb, getDb };
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URI;
const dbName = 'moviesDB';

let db;

const connect = (async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true });
  db = client.db(dbName);
  console.log('Connected to MongoDB');
})();

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected!');
  }
  return db;
};

module.exports = { connect, getDb }
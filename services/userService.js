const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'weatherdb';

let dbClient;

async function connectToDatabase() {
  if (!dbClient || !dbClient.isConnected()) {
    dbClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await dbClient.connect();
    console.log('Connected to MongoDB');
  }
  return dbClient.db(DB_NAME);
}

async function getAllUsers() {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return collection.find({}).toArray();
}

async function getNoUsers() {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  return [];
}

async function getUserById(id) {
  const db = await connectToDatabase();
  const collection = db.collection('users');
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid user ID');
  }
  return collection.findOne({ _id: new ObjectId(id) });
}

module.exports = { getAllUsers, getUserById };

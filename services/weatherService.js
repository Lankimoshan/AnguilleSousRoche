const { MongoClient } = require('mongodb');

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

async function getWeatherData(city) {
  const db = await connectToDatabase();
  const collection = db.collection('weather');
  const weather = await collection.findOne({ city: city.toLowerCase() });
  if (!weather) {
    throw new Error('City not found');
  }
  return weather;
}

module.exports = { getWeatherData };

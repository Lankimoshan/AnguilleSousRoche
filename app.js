const http = require('http');
const url = require('url');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'weatherdb';

let dbClient;

// Fonction pour connecter la base MongoDB
async function connectToDatabase() {
  if (!dbClient || !dbClient.isConnected()) {
    dbClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await dbClient.connect();
    console.log('Connected to MongoDB');
  }
  return dbClient.db(DB_NAME);
}

// Fonction pour récupérer la météo d’une ville depuis la base
async function getWeatherData(city) {
  const db = await connectToDatabase();
  const collection = db.collection('weather');

  const weather = await collection.findOne({ city: city.toLowerCase() });
  if (!weather) {
    throw new Error('City not found');
  }
  return weather;
}

const requestHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method === 'GET') {
    if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Welcome to WeatherDB</h1>
        <p>Use the endpoint <code>/weather?city=CityName</code> to get weather data.</p>
      `);
    } else if (path === '/weather') {
      const city = query.city;
      if (!city) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'City parameter is missing' }));
      }

      try {
        const weather = await getWeatherData(city);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(weather));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Resource not found' }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`WeatherDB server running at http://localhost:${PORT}/`);
});

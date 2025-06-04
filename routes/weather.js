const url = require('url');
const { getWeatherData } = require('../services/weatherService');

async function weatherRoute(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

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
}

module.exports = weatherRoute;

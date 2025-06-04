const http = require('http');
const url = require('url');
const weatherRoute = require('./routes/weather');
const usersRoute = require('./routes/users');
const authMiddleware = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

const requestHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method === 'GET') {
    if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Welcome to WeatherDB</h1>
        <p>Use the endpoint <code>/weather?city=CityName</code> to get weather data.</p>
      `);
    } else if (path === '/weather') {
      await weatherRoute(req, res);
    } else if (path === '/users' || path.startsWith('/users/')) {
        await usersRoute(req, res);
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

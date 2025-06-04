const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload; // user info from Google
  } catch (error) {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Authorization header missing' }));
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Token missing' }));
    return;
  }

  // First try JWT verification
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (!err) {
      // JWT valid
      req.user = decoded;
      next();
    } else {
      // Try Google token verification
      const googleUser = await verifyGoogleToken(token);
      if (googleUser) {
        req.user = googleUser;
        next();
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid token' }));
      }
    }
  });
}

module.exports = authMiddleware;

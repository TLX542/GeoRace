const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must contain at least 32 characters');
}

function createToken(userId) {
  return jwt.sign({ sub: userId }, jwtSecret, { expiresIn: '7d' });
}

function requireAuth(req, res, next) {
  const header = req.get('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    if (typeof payload !== 'object' || typeof payload.sub !== 'string') {
      return res.status(401).json({ error: 'Invalid authentication token' });
    }
    req.userId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
}

module.exports = { createToken, requireAuth };

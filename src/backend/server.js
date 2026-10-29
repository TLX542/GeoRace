const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { createToken, requireAuth } = require('./auth');
const { corsOrigin, port } = require('./config');
const { query } = require('./db');

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '2mb' }));

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.created_at,
  };
}

function validateCredentials(body) {
  body = body || {};
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const username = typeof body.username === 'string' ? body.username.trim() : '';

  if (!email || !email.includes('@') || email.length > 254) {
    return { error: 'A valid email is required' };
  }
  if (password.length < 8 || password.length > 200) {
    return { error: 'Password must contain between 8 and 200 characters' };
  }
  return { email, password, username };
}

function validateRun(body) {
  body = body || {};
  const durationMs = Number(body.durationMs);
  const distanceM = Number(body.distanceM);
  const points = body.points ?? [];

  if (!Number.isFinite(durationMs) || durationMs < 0 || !Number.isInteger(durationMs)) {
    return { error: 'durationMs must be a non-negative integer' };
  }
  if (!Number.isFinite(distanceM) || distanceM < 0) {
    return { error: 'distanceM must be a non-negative number' };
  }
  if (!Array.isArray(points) || points.length > 10000) {
    return { error: 'points must be an array with at most 10000 items' };
  }
  return { durationMs, distanceM, points, raceResults: body.raceResults ?? null };
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/auth/register', async (req, res, next) => {
  try {
    const input = validateCredentials(req.body);
    if (input.error) return res.status(400).json({ error: input.error });
    if (!input.username || input.username.length > 50) {
      return res.status(400).json({ error: 'username is required and must be at most 50 characters' });
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const result = await query(
      'INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username, created_at',
      [input.email, passwordHash, input.username]
    );
    const user = result.rows[0];
    return res.status(201).json({ user: publicUser(user), token: createToken(user.id) });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: 'Email is already registered' });
    return next(error);
  }
});

app.post('/auth/login', async (req, res, next) => {
  try {
    const input = validateCredentials(req.body);
    if (input.error) return res.status(400).json({ error: input.error });

    const result = await query('SELECT * FROM users WHERE email = $1', [input.email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.json({ user: publicUser(user), token: createToken(user.id) });
  } catch (error) {
    return next(error);
  }
});

app.get('/me', requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      'SELECT id, email, username, created_at FROM users WHERE id = $1',
      [req.userId]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: publicUser(result.rows[0]) });
  } catch (error) {
    return next(error);
  }
});

app.post('/runs', requireAuth, async (req, res, next) => {
  try {
    const input = validateRun(req.body);
    if (input.error) return res.status(400).json({ error: input.error });
    const startedAt = req.body.startedAt ? new Date(req.body.startedAt) : new Date();
    if (Number.isNaN(startedAt.getTime())) return res.status(400).json({ error: 'startedAt must be a valid date' });

    const result = await query(
      `INSERT INTO runs (user_id, started_at, duration_ms, distance_m, points, race_results)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
       RETURNING id, started_at, duration_ms, distance_m, points, race_results, created_at`,
      [req.userId, startedAt, input.durationMs, input.distanceM, JSON.stringify(input.points), JSON.stringify(input.raceResults)]
    );
    return res.status(201).json({ run: result.rows[0] });
  } catch (error) {
    return next(error);
  }
});

app.get('/runs', requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, started_at, duration_ms, distance_m, points, race_results, created_at
       FROM runs WHERE user_id = $1 ORDER BY started_at DESC`,
      [req.userId]
    );
    return res.json({ runs: result.rows });
  } catch (error) {
    return next(error);
  }
});

app.get('/runs/:id', requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, started_at, duration_ms, distance_m, points, race_results, created_at
       FROM runs WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.userId]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Run not found' });
    return res.json({ run: result.rows[0] });
  } catch (error) {
    return next(error);
  }
});

app.delete('/runs/:id', requireAuth, async (req, res, next) => {
  try {
    const result = await query('DELETE FROM runs WHERE id = $1 AND user_id = $2 RETURNING id', [
      req.params.id,
      req.userId,
    ]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Run not found' });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  app.listen(port, () => console.log(`GeoRace backend listening on port ${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Unable to start GeoRace backend:', error);
    process.exitCode = 1;
  });
}

module.exports = app;

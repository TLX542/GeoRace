const { Pool } = require('pg');
const { databaseUrl } = require('./config');

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to start the backend');
}

const pool = new Pool({ connectionString: databaseUrl });

async function query(text, values) {
  return pool.query(text, values);
}

module.exports = { pool, query };

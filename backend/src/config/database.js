const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false,

  max: Number(process.env.DB_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT || 30000),
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT || 2000),
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones:', err.message);
});

module.exports = pool;
import { Pool } from 'pg';

const pool = new Pool({
  host: (process.env.DB_HOST || '49.50.138.93').trim(),
  port: parseInt((process.env.DB_PORT || '5433').trim()),
  database: (process.env.DB_NAME || 'vibers_main').trim(),
  user: (process.env.DB_USER || 'vibers').trim(),
  password: process.env.DB_PASSWORD?.trim(),
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default pool;

import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const pool = new Pool({
  user: 'uche',
  host: 'localhost',
  database: 'wayfarer',
  password: '',
  port: 5432,
});

pool.on('connect', () => {
  console.log('connected to database');
});

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_DB_URL,

// });

export default pool;

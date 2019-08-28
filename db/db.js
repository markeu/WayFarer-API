import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to database');
});

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_DB_URL,

// });

export default pool;

import { pool } from 'pg';
import dotenv from 'dotenv';

 dotenv.config();

const pool = new Pool({
	connectionString: process.env.POSTGRES_DB_URL
	
});

export default pool;
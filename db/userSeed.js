/* eslint-disable no-console */
import pool from './db';
import { encryptPassword } from '../utilities/encrypt';

/**
 * Insert super admin after tables are created
 * @name insertSeed
 * @returns {String} details of insert
 */
const insertSeed = async () => {
  const seed = `INSERT INTO users
  (first_name, last_name, password, email, is_admin)
  VALUES ($1, $2, $3, $4, $5)`;
  const password = encryptPassword('mickey');
  try {
    await pool.query(seed, ['uche', 'mark', `${password}`, 'uchemark@gmail.com', true]);
    console.log('insert admin succeeded');
  } catch (error) {
    console.log(error);
  }
};

insertSeed();

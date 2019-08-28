/* eslint-disable no-console */
import pool from './db';

/**
 * Insert bus for test, after tables are created
 * @name busSeed
 * @returns {String} details of insert
 */
const insertSeed = async () => {
  const seed = `INSERT INTO trips
  (bus_id, origin, destination, fare, status, trip_date)
  VALUES ($1, $2, $3, $4, $5, $6)`;

  try {
    const date = new Date();
    await pool.query(seed, [1, 'Oyo', 'Lagos', 5677678, 'Active', date]);
    console.log('insert Trip succeeded');
  } catch (error) {
    console.log(error);
  }
};

insertSeed();

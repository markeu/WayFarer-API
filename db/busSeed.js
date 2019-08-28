/* eslint-disable no-console */
import pool from './db';

/**
 * Insert bus for test, after tables are created
 * @name busSeed
 * @returns {String} details of insert
 */
const insertSeed = async () => {
  const seed = `INSERT INTO buses
  (number_plate, model, year, manufacturer, capacity)
  VALUES ($1, $2, $3, $4, $5)`;

  try {
    await pool.query(seed, ['NSR 122 TP', 'Toyota', 2019, 'Mercedes', 18]);
    console.log('insert BUS succeeded');
  } catch (error) {
    console.log(error);
  }
};

insertSeed();

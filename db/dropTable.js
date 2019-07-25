/* eslint-disable no-console */
import pool from './db';

const dropTables = () => {
  const queryText = `DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS buses CASCADE;
  DROP TABLE IF EXISTS trips CASCADE;
  DROP TABLE IF EXISTS bookings CASCADE;`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

dropTables();

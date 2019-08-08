/* eslint-disable no-tabs */
/* eslint-disable no-console */
import pool from './db';


const tablesQuerry = `    
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
        modified_on TIMESTAMP WITHOUT TIME ZONE,
        is_admin BOOLEAN NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS buses(
        id SERIAL PRIMARY KEY,
        number_plate VARCHAR(10) NOT NULL,
        model TEXT NOT NULL,
        year INT NOT NULL,
        manufacturer TEXT NOT NULL,
        capacity INT NOT NULL,
        created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
        modified_on TIMESTAMP WITHOUT TIME ZONE
    );
    
    CREATE TABLE IF NOT EXISTS trips(
        id SERIAL PRIMARY KEY,
        bus_id INT NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        trip_date TEXT NOT NULL,
        fare FLOAT(2) NOT NULL,
        status VARCHAR(10) DEFAULT 'active',
        FOREIGN KEY (bus_id) REFERENCES buses(id)
    );

    CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        seat_number SERIAL,
        created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
        modified_on TIMESTAMP WITHOUT TIME ZONE,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
`;


const createTable = () => {
  console.log('called');
  pool.query(`${tablesQuerry}`).then(() => {
    console.log('Tables created successfully');
  });
};


createTable();

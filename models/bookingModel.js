/* eslint-disable camelcase */
import pool from '../db/db';

/**
 *
 *
 * @export
 * @class Trips
 */
export default class Buses {
  /**
     *
     * Buses model to create new buses
     * @static
     * @param {object} Buses
     * @returns {object} bus data
     * @memberof Buses
     */
  static async create(bookings) {
    const {
      user_id,
      trip_id,
      bus_id,
      first_name,
      last_name,
      email,
      seat_number,
    } = bookings;
    const date = new Date();
    const { rows } = await pool.query(`INSERT INTO bookings
    (user_id, trip_id, bus_id, trip_date, first_name, last_name, email, seat_number) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`, [user_id, trip_id, bus_id, date, first_name, last_name, email, seat_number]);
    return rows[0];
  }

  /**
   * @static
   * @description Method to get all buses
   * @returns {array} All buses in the DB
   * @memberof Buses
   */
  static async getAllBookings() {
    const data = await pool.query(
      'SELECT * FROM bookings',
    );
    return data.rows;
  }
}

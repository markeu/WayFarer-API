/* eslint-disable camelcase */
import pool from '../db/db';

/**
 *
 *
 * @export
 * @class Trips
 */
export default class Bookings {
  /**
     *
     * Booking model to create bookings
     * @static
     * @param {object} Buses
     * @returns {object} booking data
     * @memberof Booking
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
   * @description Method to get all bookings
   * @returns {array} All bookings
   * @memberof Bookings
   */
  static async getAllBookings() {
    const data = await pool.query(
      'SELECT * FROM bookings',
    );
    return data.rows;
  }

  /**
   * @static
   * @description Method to select a specific booking
   * @param {number} id Id of the booking to be returned
   * @returns {object} booking details
   * @memberof Bookings
   */
  static async selectBooking(id) {
    const data = await pool.query('SELECT * FROM bookings WHERE booking_id= $1;', [id]);
    return data.rows[0];
  }

  /**
   * @static
   * @description Method to delete booking
   * @param {number} id Id of the booking to be deleted
   * @memberof Bookings
   */
  static async deleteBooking(id) {
    const data = await pool.query('DELETE FROM bookings WHERE booking_id= $1', [id]);
    if (data.rowCount === 1) return true;
    return false;
  }
}

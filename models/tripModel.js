/* eslint-disable camelcase */
import pool from '../db/db';

/**
 *
 *
 * @export
 * @class Trips
 */
export default class Trips {
  /**
     *
     * Trip model to create new trips
     * @static
     * @param {object} Trip
     * @returns {object} trip data
     * @memberof Trips
     */
  static async create(trip) {
    const {
      bus_id,
      origin,
      destination,
      fare,
    } = trip;
    const date = Date();
    const { rows } = await pool.query(`INSERT INTO trips
      (bus_id, origin, destination, trip_date, fare) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`, [bus_id, origin, destination, date, fare]);
    return rows[0];
  }

  /**
   * @static
   * @description Method to get one specific trip
   * @param {number} id Id of the trip to be returned
   * @returns {object} Single trip details
   * @memberof Trips
   */
  static async selectTrip(id) {
    const data = await pool.query('SELECT * FROM trips WHERE id= $1;', [id]);
    return data.rows[0];
  }

  /**
   * @static
   * @description Method to Get all trips with details
   * @returns {array} All trips in the DB
   * @memberof Trips
   */
  static async getAllTrips() {
    const data = await pool.query(
      'SELECT * FROM trips',
    );
    return data.rows;
  }

  /**
   * @static
   * @description Method to update trip
   * @param {number} id Id of the trip to be updated
   * @param {string} name new detail of the trip
   * @returns {object} Details of the newly updated trip
   * @memberof Trips
   */

  static async updateTrip(trip, id) {
    const {
      bus_id,
      origin,
      destination,
      fare,
      status,
    } = trip;
    const date = new Date();
    const { rows } = await pool.query(
      `UPDATE trips
    SET bus_id= $2, origin= $3, destination= $4, trip_date= $5, fare= $6, status= $7
    WHERE id= $1 RETURNING *`, [id, bus_id, origin, destination, date, fare, status],
    );
    return rows[0];
  }

  /**
   * @static
   * @description Method to delete trip
   * @param {number} id Id of the trip to be deleted
   * @memberof Trips
   */
  static async deleteTrip(id) {
    const data = await pool.query('DELETE FROM trips WHERE id= $1', [id]);
    if (data.rowCount === 1) return true;
    return false;
  }
}

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
  static async create(bus) {
    const {
      number_plate,
      model,
      year,
      manufacturer,
      capacity,
    } = bus;
    const date = new Date();
    const { rows } = await pool.query(`INSERT INTO buses
      (number_plate, model, year, manufacturer, capacity, modified_on) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`, [number_plate, model, year, manufacturer, capacity, date]);
    return rows[0];
  }

  /**
   * @static
   * @description Method to get all buses
   * @returns {array} All buses in the DB
   * @memberof Buses
   */
  static async getAllBuses() {
    const data = await pool.query(
      'SELECT * FROM buses',
    );
    return data.rows;
  }

  /**
   * @static
   * @description Method to select a specific bus
   * @param {number} id Id of the busto be returned
   * @returns {object} bus details
   * @memberof Buses
   */
  static async selectBus(id) {
    const data = await pool.query('SELECT * FROM buses WHERE id= $1;', [id]);
    return data.rows[0];
  }

  /**
   * @static
   * @description Method to update bus
   * @param {number} id Id of the bus to be updated
   * @param {string} name new detail of the bus
   * @returns {object} Details of the newly updated bus
   * @memberof Buses
   */

  static async updateBus(bus, id) {
    const {
      number_plate,
      model,
      year,
      manufacturer,
      capacity,
    } = bus;
    const date = new Date();
    const { rows } = await pool.query(
      `UPDATE buses
    SET number_plate= $2, model= $3, year= $4, manufacturer= $5, capacity= $6, modified_on= $7
    WHERE id= $1 RETURNING *`, [id, number_plate, model, year, manufacturer, capacity, date],
    );
    return rows[0];
  }
}

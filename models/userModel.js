/* eslint-disable camelcase */
import pool from '../db/db';
/**
 *
 *
 * @export
 * @class Users
 */
export default class UserModel {
  /**
   *
   * User model to create user account
   * @static
   * @param {object} user
   * @returns {object} User data
   * @memberof Users
   */
  static async createUser(user) {
    const {
      first_name, last_name, password, email,
    } = user;
    const { rows } = await pool.query(`INSERT INTO users
        (first_name, last_name, password, email, is_admin)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`, [first_name, last_name, password, email, false]);
    return rows[0];
  }

  /**
      *
      * User model to create user profile
      * @static
      * @param {object} userId
      * @returns {object} User Profile data
      * @memberof Users
      */
  static async createProfile(userId) {
    const data = await pool.query(`INSERT INTO users_profile(
              "userId"
          )
          VALUES (
              $1
          ) RETURNING *`, [userId]);
    return data.rows[0];
  }

  /**
     *
     *
     * @static
     * @param {string} userData
     * @returns {object} User data according to supplied email
     * @memberof Users
     */
  static async findUserInput(email) {
    const data = await pool.query(`SELECT * FROM users WHERE email = ${email}`);
    console.log(data, 'user model');

    if (data.rowCount < 1) {
      return false;
    }
    return data.rows[0];
  }
}

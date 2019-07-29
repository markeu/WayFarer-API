
import tripsModel from '../models/tripModel';

const { create } = tripsModel;


/**
 *
 *
 * @export
 * @class tripsController
 */
export default class TripsController {
  /**
     * addTrip controller - Add new trip
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} tripDetails
     * @memberof TripsController
     */
  static async createTrip(req, res) {
    try {
      const data = req.body;
      const newTrip = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newTrip,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Get all properties
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} propertiesDetails
   * @memberof PropertyController
   */
  static async getAllTrips(req, res, next) {
    try {
      const allProperties = await getTripQuery();
      if (allProperties.length > 0) {
        return res.status(201).json({
          status: 'success',
          data: newTrip,
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no properties in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}

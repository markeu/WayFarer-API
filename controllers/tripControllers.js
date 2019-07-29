
import tripsModel from '../models/tripModel';

const { create, getAllTrips } = tripsModel;


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
   * @description Get all trips
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} allTrips
   * @memberof TripController
   */
  static async getAllTrips(req, res, next) {
    try {
      const allTrips = await getAllTrips();
      if (allTrips.length > 0) {
        return res.status(201).json({
          status: 'success',
          data: allTrips,
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no trips in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}


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
}


import tripsModel from '../models/tripModel';

const {
  create, getAllTrips, selectTrip, updateStatus,
} = tripsModel;


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
  static async getAllTrips(req, res) {
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

  /**
   * @description Update trip status
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} updatedTrip details
   * @memberof PropertyController
   */
  static async updateTripStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const tripToBeUpdated = await selectTrip(parseInt(id, 10));

      if (!tripToBeUpdated) {
        return res.status(400).json({
          status: 'error',
          error: 'trip does not exist',
        });
      }
      if (tripToBeUpdated.status === status) {
        return res.status(400).json({
          status: 'error',
          error: `trip is already set to ${status}`,
        });
      }
      if (Object.keys(tripToBeUpdated.status).length === 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Status key must be defined',
        });
      }
      const data = { id, status };
      await updateStatus(data);
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Trip cancelled successfully',
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}

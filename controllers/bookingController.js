
import bookingModel from '../models/bookingModel';

const {
  create, getAllBookings,
} = bookingModel;


/**
 *
 *
 * @export
 * @class bookingModel
 */
export default class BookingController {
  /**
     * addBooking controller - Add new trip
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} bookingDetails
     * @memberof BookingController
     */
  static async createBooking(req, res) {
    try {
      const data = { ...req.body, user_id: req.user.id, email: req.user.email };
      const newBooking = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newBooking,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Get all buses
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} allBuses
   * @memberof BusesController
   */
  static async allBookings(req, res) {
    try {
      const bookings = await getAllBookings();
      if (bookings.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: bookings,
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no bookings',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}

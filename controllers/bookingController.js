
import bookingModel from '../models/bookingModel';

const {
  create,
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
}

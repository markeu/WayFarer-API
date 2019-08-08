import busModel from '../models/busModel';

const { create } = busModel;


/**
 *
 *
 * @export
 * @class busesController
 */
export default class busesController {
  /**
     * addBus controller - Add new bus
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} busDetails
     * @memberof BusesController
     */
  static async createBus(req, res) {
    try {
      const data = req.body;
      const newBus = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newBus,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}

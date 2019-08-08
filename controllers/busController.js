import busModel from '../models/busModel';

const { create, getAllBuses, selectBus, updateBus } = busModel;


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
  static async getAll(req, res) {
    try {
      const allBuses = await getAllBuses();
      if (allBuses.length > 0) {
        return res.status(201).json({
          status: 'success',
          data: allBuses,
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no bus in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Get specific bus
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} busDetails
   * @memberof BusesController
   */
  static async getSpecificBus(req, res) {
    try {
      const { id } = req.params;
      const busDetails = await selectBus(parseInt(id, 10));
      if (busDetails) {
        return res.status(200).json({
          status: 'success',
          data: busDetails,
        });
      }
      return res.status(404).json({
        status: 'error',
        error: 'Bus not found',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description update specific bus
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} busDetails
   * @memberof BusesController
   */
  static async updateBusData(req, res) {
    try {
      const { id } = req.params;
      const dataFetch = { ...req.body };
      const busToBeUpdated = await selectBus(parseInt(id, 10));
      if (!busToBeUpdated) {
        return res.status(400).json({
          status: 'error',
          error: 'bus does not exist',
        });
      }
      const newData = Object.assign(busToBeUpdated, dataFetch);
      const updatedBusDetail = await updateBus(newData, id);
      return res.status(201).json({
        status: 'success',
        data: updatedBusDetail,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}

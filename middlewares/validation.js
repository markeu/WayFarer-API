/* eslint-disable camelcase */
import validationHelp from '../utilities/validationHelp';
import { emailRegex, passwordRegex, descriptionRegex } from '../utilities/rexegen';

const {
  checkForEmptyFields, checkPatternedFields, checkStringFields, checkIntergerFields,
} = validationHelp;

export default {
  auth: (req, res, next) => {
    const errors = [];
    const {
      first_name, last_name, email, password,
    } = req.body;


    if (req.path.includes('signup')) {
      errors.push(...checkForEmptyFields('first_name', first_name));
      errors.push(...checkForEmptyFields('last_name', last_name));
      errors.push(...checkStringFields('first_name', first_name));
      errors.push(...checkStringFields('last_name', last_name));
    }
    errors.push(...checkPatternedFields('email', email, emailRegex));
    errors.push(...checkForEmptyFields('password', password, passwordRegex));

    if (errors.length) {
      return res.status(400).json({
        Status: 'error',
        error: errors,
      });
    }
    return next();
  },
  tripValidator: (req, res, next) => {
    const errors = [];
    const {
      bus_id,
      origin,
      destination,
      fare,
    } = req.body;

    errors.push(...checkForEmptyFields('bus_id', bus_id));
    errors.push(...checkForEmptyFields('origin', origin));
    errors.push(...checkForEmptyFields('destination', destination));
    errors.push(...checkForEmptyFields('fare', fare));
    errors.push(...checkIntergerFields('fare', fare));
    if (errors.length) {
      return res.status(400).json({
        Status: 'error',
        error: errors,
      });
    }
    return next();
  },

  statusValidator: (req, res, next) => {
    const errors = [];
    const { status } = req.body;
    errors.push(...checkForEmptyFields('status', status));

    if (errors.length) {
      return res.status(400).json({
        Status: 'error',
        error: 'Status Value must be a string value of "Active" or "Cancelled"',
      });
    }
    return next();
  },

  busValidator: (req, res, next) => {
    const errors = [];
    const {
      number_plate,
      model,
      year,
      manufacturer,
      capacity,
    } = req.body;

    errors.push(...checkForEmptyFields('number_plate', number_plate));
    errors.push(...checkForEmptyFields('model', model));
    errors.push(...checkIntergerFields('year', year));
    errors.push(...checkForEmptyFields('manufacturer', manufacturer));
    errors.push(...checkStringFields('manufacturer', manufacturer));
    errors.push(...checkIntergerFields('capacity', capacity));
    if (errors.length) {
      return res.status(400).json({
        Status: 'error',
        error: errors,
      });
    }
    return next();
  },

  
};

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
  postValidator: (req, res, next) => {
    const errors = [];
    const {
      status, price, state, city, address, type,
    } = req.body;

    errors.push(...checkForEmptyFields('status', status));
    errors.push(...checkForEmptyFields('city', city));
    errors.push(...checkForEmptyFields('address', address));
    errors.push(...checkForEmptyFields('type', type));
    errors.push(...checkForEmptyFields('state', state));
    errors.push(...checkForEmptyFields('price', price));
    errors.push(...checkStringFields('status', status));
    errors.push(...checkStringFields('city', city));
    errors.push(...checkStringFields('state', state));
    errors.push(...checkIntergerFields('price', price));

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

    if (!errors.length) {
      return res.status(400).json({
        Status: 'error',
        error: 'Status Value must be a string value of "Sold" or "Available"',
      });
    }
    return next();
  },

  flagValidator: (req, res, next) => {
    const errors = [];
    const {
      reason, description,
    } = req.body;

    errors.push(...checkForEmptyFields('status', reason));
    errors.push(...checkForEmptyFields('city', description));
    errors.push(...checkStringFields('status', reason));
    errors.push(...checkStringFields('city', description, descriptionRegex));

    if (errors.length) {
      return res.status(400).json({
        message: 'Error',
        data: errors,
      });
    }
    return next();
  },

  checkPropertyParams: (req, res, next) => {
    const { params: { id } } = req;
    const parsedNumber = parseInt(id, 10);
    const isInter = Number.isInteger(parsedNumber);
    const isGreaterThanZero = parsedNumber > 0;

    if (isInter && isGreaterThanZero) return next();
    return res.jsend.error('Property ID must be an integer greater than zero');
  },
};

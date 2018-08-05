const Validator = require('validator');
const isEmpty = require('./helpers');

//the data passed in will be request.body at users.js in api routes.
module.exports = function validateLoginInput(data) {
  let errors = {};
  //ensure that the data.?? is a string if it is empty.
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email format is invalid.';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty.';
  }

  return { errors, isValid: isEmpty(errors) };
};

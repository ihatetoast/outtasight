const Validator = require('validator');
const isEmpty = require('./helpers');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  //NOTE: VALIDATOR VALIDATES STRINGS.
  //ensure that the data.?? is a string if it is empty.
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //allow for longer names hyphens and such. 50?
  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 50
    })
  ) {
    errors.name = 'Name must have at least 2 characters.';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be empty.';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty.';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email format.';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty.';
  }
  if (
    !Validator.isLength(data.password, {
      min: 8,
      max: 50
    })
  ) {
    errors.password = 'Password to be at least 8 characters';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Re-enter password field cannot be empty.';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match.';
  }
  return { errors, isValid: isEmpty(errors) };
};

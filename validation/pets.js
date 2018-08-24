const Validator = require('validator');
const isEmpty = require('./helpers');

//the data passed in will be request.body at users.js in api routes.
module.exports = function validatePetsInput(data) {
  //init errors obj to collect errors:
  let errors = {};
  //required fields: name species breed
  //ensure that the data.?? is a string if it is empty.
  data.name = !isEmpty(data.name) ? data.name : '';
  data.species = !isEmpty(data.species) ? data.species : '';
  data.breed = !isEmpty(data.breed) ? data.breed : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field cannot be empty.';
  }

  if (Validator.isEmpty(data.species)) {
    errors.species = 'Species field cannot be empty.';
  }
  if (Validator.isEmpty(data.breed)) {
    errors.breed = 'Breed field cannot be empty.';
  }

  return { errors, isValid: isEmpty(errors) };
};

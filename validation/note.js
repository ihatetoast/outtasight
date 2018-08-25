const Validator = require('validator');
const isEmpty = require('./helpers');

//the data passed in will be request.body at users.js in api routes.
module.exports = function validateNoteInput(data) {
  //init errors obj to collect errors:
  let errors = {};
  //ensure that the data.?? is a string if it is empty.
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 250 })) {
    errors.text = 'Note needs to have 10 to 250 characters.';
  }
  if (Validator.isEmpty(data.text)) {
    //should be last
    errors.text = 'Text field cannot be empty.';
  }

  return { errors, isValid: isEmpty(errors) };
};

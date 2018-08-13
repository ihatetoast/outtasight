const Validator = require('validator');
const isEmpty = require('./helpers');

module.exports = function validateProfileInput(data) {
  //init errors obj to collect errors:
  let errors = {};
  //will come from FE from form and these are not required, so could be empty (undef or null)
  //this turns them into empty strings if they come from empty fields:
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.groups = !isEmpty(data.groups) ? data.groups : '';

  //USERNAME/HANDLE
  if (!Validator.isLength(data.handle, { min: 5, max: 20 })) {
    errors.handle = 'Handle needs to have 5 to 20 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }
  //VOLUNTEER/ADOPTION GROUPS
  if (Validator.isEmpty(data.groups)) {
    errors.groups = 'Groups field is required';
  }

  //URL VALIDATORS. not required. check if empty. don't validate empty fields

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

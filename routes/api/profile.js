//public persona: volunteers, adopters, etc.
const express = require('express');
const router = express.Router();
const passport = require('passport');

//get the validator for profiles:
const validateProfileInput = require('../../validation/profile');

//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles/test
// @desc    Tests profiles route
// @access  Public
router.get('/test', (request, response) => {
  response.json({
    msg: 'Profile loads.'
  });
});

//protected route gets the current user's profile:

// @route   GET api/profile/
// @desc    get the user's profile (curr user)
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    const errors = {};
    Profile.findOne({ user: request.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user.';
          return response.status(404).json(errors);
        }
        response.json(profile);
      })
      .catch(err => {
        response.status(404).json(err);
      });
  }
);

// @route   POST api/profile/
// @desc    create/update the user's profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    const { errors, isValid } = validateProfileInput(request.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      console.log('damn');
      return response.status(400).json(errors);
    }

    //get the fields from fe
    const profileDetails = {};
    //attached to the logged-in user:
    profileDetails.user = request.user.id;
    //from model
    if (request.body.handle) profileDetails.handle = request.body.handle;
    if (request.body.location) profileDetails.location = request.body.location;

    //split vol groups into array
    if (typeof request.body.groups !== 'undefined') {
      profileDetails.groups = request.body.groups.split(',');
    }

    //social is an object in model. comes in from FE as a string.
    //set to obj but init obj first:
    //initialise profileDetails.social={}
    profileDetails.social = {};
    if (request.body.youtube)
      profileDetails.social.youtube = request.body.youtube;
    if (request.body.linkedin)
      profileDetails.social.linkedin = request.body.linkedin;
    if (request.body.twitter)
      profileDetails.social.twitter = request.body.twitter;
    if (request.body.instagram)
      profileDetails.social.instagram = request.body.instagram;
    if (request.body.facebook)
      profileDetails.social.facebook = request.body.facebook;

    Profile.findOne({ user: request.user.id }).then(profile => {
      if (profile) {
        //update:
        Profile.findOneAndUpdate(
          { user: request.user.id },
          { $set: profileDetails },
          { new: true }
        ).then(profile => reponse.json(profile));
      } else {
        //create:
        //does handle exist? only one handle . keep uniq like user name.
        Profile.findOne({ handle: profileDetails.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists.';
            response.status(400).json(errors);
          }
          //save
          new Profile(profileDetails)
            .save()
            .then(profile => response.json(profile));
        });
      }
    });
  }
);

module.exports = router;

//public persona: volunteers, adopters, etc.
const express = require('express');
const router = express.Router();
const passport = require('passport');

//get the validator for profiles:
const validateProfileInput = require('../../validation/profile');
const validatePetsInput = require('../../validation/pets');
//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//////////////////////////////////////////////
//////////////////////////////////////////////
//       GET GET  GET  GET  GET             //
//       GET GETCHER ROUTES HERE!           //
//////////////////////////////////////////////
//////////////////////////////////////////////

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

//NOTE ON :HANDLE AND :USER_ID:
// frontend hits backend routes with these end points.
// bar will have different look
// @route   GET api/profile/handle/:handle
// @desc    gets profile by the handle/username
// @access  Private - visible only to those logged in.

router.get(
  '/handle/:handle',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    const errors = {};
    Profile.findOne({ handle: request.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this handle';
          res.status(404).json(errors);
        }
        response.json(profile);
      })
      .catch(err => response.status(404).json(err));
  }
);

// @route   GET api/profile/user/:user_id
// @desc    gets profile by user id
// @access  Private - visible only to those logged in.

router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    const errors = {};
    Profile.findOne({ user: request.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        response.json(profile);
      })
      .catch(err =>
        response
          .status(404)
          .json({ profile: 'There is no profile for this user id.' })
      );
  }
);

// @route   GET api/profile/all
// @desc    get profile by handle
// @access  Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    const errors = {};
    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'No profiles found';
          return response.status(404).json(errors);
        }
        response.json(profiles);
      })
      .catch(err =>
        response.status(404).json({ profile: 'No profiles found.' })
      );
  }
);

//////////////////////////////////////////////
//////////////////////////////////////////////
//     POST  POST POST POST POST            //
//       YOU'RE S'POST TO POST              //
//////////////////////////////////////////////
//////////////////////////////////////////////
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

// @route   POST api/profile/pets
// @desc    add pets to profile
// @access  Private (need user)
router.post(
  '/pets',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    //validate later
    const { errors, isValid } = validatePetsInput(request.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return response.status(400).json(errors);
    }
    //find a profile by logged in user
    Profile.findOne({ user: request.user.id }).then(profile => {
      const newPet = {
        name: request.body.name,
        species: request.body.species,
        breed: request.body.breed,
        photo: request.body.photo,
        description: request.body.description
      };
      //add to array of profile where pets are
      profile.pets.unshift(newPet);

      //save, add exp and return profile with new pet.
      profile.save().then(response.json(profile));
    });
  }
);

//////////////////////////////////////////////
//////////////////////////////////////////////
//     DELETE DELETE DELETE DELETE          //
//     DELETE TOUTE SUITE, PETITE           //
//////////////////////////////////////////////
//////////////////////////////////////////////

router.delete(
  '/pets/:pet_id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    Profile.findOne({
      user: request.user.id
    })
      .then(profile => {
        //find the pet we want to delete,
        //map over each and capture the index of the one we're looking for the one that is the param.
        const removeIndex = profile.pets
          .map(item => item.id)
          .indexOf(request.params.pet_id);

        //pets is array. use splice to remove at removeIndex and take one:
        profile.pets.splice(removeIndex, 1);
        console.log(removeIndex);
        //save, return profile
        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);
module.exports = router;

//posts about social meetups or questions about sighthound-related interests
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//authenticate
const passport = require('passport');
//validate:
const validateNoteInput = require('../../validation/note');

//bring in models:
const Note = require('../../models/Note');
//////////////////////////////////////////////
//////////////////////////////////////////////
//       GET GET  GET  GET  GET             //
//       GET GETCHER ROUTES HERE!           //
//////////////////////////////////////////////
//////////////////////////////////////////////
// @route   GET api/notes/test
// @desc    Tests notes route
// @access  Public
router.get('/test', (request, response) => {
  response.json({
    msg: 'Posts works.'
  });
});

//////////////////////////////////////////////
//////////////////////////////////////////////
//     POST  POST POST POST POST            //
//       YOU'RE S'POST TO POST              //
//////////////////////////////////////////////
//////////////////////////////////////////////

// @route   POST api/notes
// @desc    create a note
// @access  Private bc user

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    //validation block:
    const { errors, isValid } = validateNoteInput(request.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return response.status(400).json(errors);
    }

    //create new post from body
    const newNote = new Note({
      text: request.body.text,
      name: request.body.name,
      avatar: request.body.avatar,
      user: request.body.user
    });
    //save the new note, respond with json
    newNote.save().then(note => response.json(note));
  }
);

//////////////////////////////////////////////
//////////////////////////////////////////////
//     DELETE DELETE DELETE DELETE          //
//     DELETE TOUTE SUITE, PETITE           //
//////////////////////////////////////////////
//////////////////////////////////////////////
module.exports = router;

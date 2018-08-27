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
const Profile = require('../../models/Profile');
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
// @route   GET api/notes/
// @desc    get all posts?
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    Note.find()
      .sort({ date: -1 })
      .then(notes => response.json(notes))
      .catch(err => response.status(404).json({ nonotes: 'No notes found.' }));
  }
);
// @route   GET api/notes/:id
// @desc    get one post
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    Note.findById(request.params.id)
      .then(note => response.json(note))
      .catch(err =>
        response.status(404).json({ nonote: 'No note found with that ID.' })
      );
  }
);

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
/////////////////////////////////////////////

// @route   DELETE api/notes/:id
// @desc    del a note
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    Profile.findOne({ user: request.user.id }).then(profile => {
      Note.findById({ _id: request.params.id })
        .then(note => {
          if (note.user.toString() !== request.user.id) {
            return response.status(401).json({ notauth: 'User is not auth' });
          }
          note.remove().then(() => response.json({ success: true }));
        })
        .catch(err =>
          response.status(404).json({ notenotfound: 'Note not found' })
        );
    });
  }
);

module.exports = router;

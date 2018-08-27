//posts about social meetups or questions about sighthound-related interests
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//authenticate
const passport = require('passport');
//validate:
const validateNoteInput = require('../../validation/note');

//bring in models:
const Profile = require('../../models/Profile');
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
      user: request.user.id
    });
    //save the new note, respond with json
    newNote.save().then(note => response.json(note));
  }
);

/////////////////
/////////////////
//   LIKES     //
/////////////////
/////////////////

// @route   POST api/notes/like/:id (id of note)
// @desc    like a note
// @access  Private

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    //get teh user
    Profile.findOne({ user: request.user.id })
      .then(() => {
        //get the post by id
        Note.findById(request.params.id).then(note => {
          //check if user's aready liked. is id already there?
          if (
            note.likes.filter(like => like.user.toString() === request.user.id)
              .length > 0
          ) {
            return response
              .status(400)
              .json({ alreadyLiked: 'User already liked this note' });
          }
          //if not already liked, add user's id to likes arr
          note.likes.unshift({ user: request.user.id });
          //save to db
          note.save().then(note => response.json(note));
        });
      })
      .catch(err =>
        response
          .status(404)
          .json({ nonote: 'Cannot delete. No post with given id found.' })
      );
  }
);
// NOTE NOTE  NOTE NOTE  NOTE NOTE  NOTE NOTE  NOTE NOTE
//unliking is a post request and not a delete.
//I am posting from front end and just using JS array methods (index of, splice) to deal with removing a user's id from the likes arr.

// @route   POST api/notes/unlike/:id (id of NOTE)
// @desc    like a note
// @access  Private

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    //get teh user
    Profile.findOne({ user: request.user.id })
      .then(() => {
        //get the post by id
        Note.findById(request.params.id).then(note => {
          //check if user's aready liked. is id already there?
          if (
            note.likes.filter(like => like.user.toString() === request.user.id)
              .length === 0
          ) {
            return response.status(400).json({
              notliked: 'User cannot unlike bc user has not yet liked'
            });
          }
          //index of note to unlike in array.map over to find idx of like that matches request.user.id
          // 1 map over the array and convert every elem.user to string
          // 2 use indexof with req.us.id to find the index
          // 3 use likes array and found index to splice and remove one
          const idxOfNoteToRem = note.likes
            .map(elem => elem.user.toString())
            .indexOf(request.user.id);
          note.likes.splice(idxOfNoteToRem, 1);
          //save adjusted arr to db
          note.save().then(note => response.json(note));
        });
      })
      .catch(err =>
        response
          .status(404)
          .json({ nonote: 'Cannot delete. No post with given id found.' })
      );
  }
);
/////////////////
/////////////////
//   COMMENTS  //
/////////////////
/////////////////
// @route   POST api/notes/comment/:id (id of note)
// @desc    comment on a note
// @access  Private

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    //validation: same as note bc just about text
    const { errors, isValid } = validateNoteInput(request.body);

    if (!isValid) {
      //400 status
      return response.status(400).json(errors);
    }
    //if all good, find the note with the id
    Note.findById(request.params.id)
      .then(note => {
        //make new comment (is obj)
        const newComment = {
          user: request.user.id,
          text: request.body.text,
          name: request.body.name,
          avatar: request.body.avatar
        };
        //like likes. add to arr with unshift
        note.comments.unshift(newComment);
        note.save().then(note => response.json(note));
      })
      .catch(err =>
        response.status(404).json({ notenotfound: 'No note found.' })
      );
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
    //get teh user
    Profile.findOne({ user: request.user.id })
      .then(() => {
        //get the post by id
        Note.findById(request.params.id).then(note => {
          //make sure the owner is the one we want
          if (note.user.toString() !== request.user.id) {
            return response
              .status(401)
              .json({ notauthorized: 'Unauthorized user.' });
          }
          //if all good, delete!
          note.remove().then(() => response.json({ success: true }));
        });
      })
      .catch(err =>
        response
          .status(404)
          .json({ nonote: 'Cannot delete. No post with given id found.' })
      );
  }
);
module.exports = router;

//Guardians of the Zool

const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (request, response) => {
  response.json({
    msg: 'Users side loads.'
  });
});

// @route   GET api/users/register
// @desc    registers users
// @access  Public

router.post('/register', (request, response) => {
  User.findOne({ email: request.body.email }).then(user => {
    if (user) {
      return response.status(400).json({ email: 'User exists' });
    } else {
      //grab gravatar for email. default is silhouette
      const avatar = gravatar.url(request.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: request.body.name,
        email: request.body.email,
        avatar,
        password: request.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => response.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    users log in. if user exists, jwt gets returned
// @access  Public
router.post('/login', (request, response) => {
  //info from login form on client
  const email = request.body.email;
  const password = request.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return response.status(404).json({ email: 'User not found.' });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            response.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        return response.status(400).json({ password: 'Password invalid' });
      }
    });
  });
});
module.exports = router;

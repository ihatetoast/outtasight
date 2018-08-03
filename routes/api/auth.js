//Guardians of the Zool

const express = require('express');
const router = express.Router();

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get('/test', (request, response) => {
  response.json({
    msg: 'Auth side loads.'
  });
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
//body parser for wreck dot bodday
//extended false if not multilayered
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys.js').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected to OuttaSight'))
  .catch(err => console.log(err));

//PASSPORT
//init ppp
app.use(passport.initialize());
//strategy for jwt in config file, pass in pp
require('./config/passport')(passport);

//POINT TO ROUTES
//auth
app.use('/api/users', users);
//vols, members, adopters
app.use('/api/profile', profile);
//communications
app.use('/api/posts', posts);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`OuttaSight listening on port ${PORT}`));

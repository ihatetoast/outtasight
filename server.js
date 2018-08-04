const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
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

app.get('/', (request, response) => response.send('OuttaSight.'));

//POINT TO ROUTES
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`OuttaSight listening on port ${PORT}`));

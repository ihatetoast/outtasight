const express = require('express');
const mongoose = require('mongoose');

const auth = require('./routes/api/auth');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

const db = require('./config/keys.js');
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected to OuttaSight'))
  .catch(err => console.log(err));

app.get('/', (request, response) => response.send('OuttaSight.'));

//POINT TO ROUTES
app.use('/api/auth', auth);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`OuttaSight listening on port ${PORT}`));

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema, set to new schema and pass in obj that is the collection

const ProfileSchema = new Schema({
  //need to associate the user with the profile, so we get nae etc from user and reference users
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  groups: {
    type: [String],
    required: true
  },
  location: {
    type: String
  },
  pets: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        species: {
          type: String,
          required: true
        },
        breed: {
          type: String,
          required: true
        },
        photo: {
          type: String // links only.
        },
        description: {
          type: String // limit this!
        }
      }
    ]
  },
  social: {
    youtube: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    website: { type: String }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;

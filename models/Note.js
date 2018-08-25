const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  //ref refers to users collection
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  //name and avatar separate from account
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  //the array has liker's id
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      //comment date
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  //post date
  date: {
    type: Date,
    default: Date.now
  }
});
const Note = mongoose.model('note', NoteSchema);
module.exports = Note;

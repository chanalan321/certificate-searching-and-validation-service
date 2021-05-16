const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  typeOfUser: {
    type: String,
    required: true,
    trim: true
  },schoolId: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  userNumber: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Account', AccountSchema);
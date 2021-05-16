const mongoose = require('mongoose');

const Worker_AdminSchema = new mongoose.Schema({
  workerId: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true
  },
  adminId: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Worker_Admin', Worker_AdminSchema);
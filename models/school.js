const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true
  },
  schoolName: {
    type: String,
    required: true,
    trim: true
  },
  schoolPrik: {
    type: String,
    required: true,
    trim: true
  },
  schoolPk: {
    type: String,
    required: true,
    trim: true
  },
  schoolEthAccount: {
    type: String,
    required: true,
    trim: true
  },
  schoolEthPrik: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('School', SchoolSchema);
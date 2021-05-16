const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentID: {
    type: String,
    required: true,
    trim: true
  },
  studentLName: {
    type: String,
    required: true,
    trim: true
  },
  studentFName: {
    type: String,
    required: true,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  schoolName: {
    type: String,
    required: true,
    trim: true
  },
  courseDate: {
    type: String,
    required: true,
    trim: true
  },
  hash: {
    type: String,
    required: false, //  必填欄位，若缺少此欄位，mongoDB 不會建立此 document 並會回傳 error
    trim: true, //  去除掉不必要的空白
    unique: false //  確認這個 email 是唯一
  },
  hashSignature: {
    type: String,
    required: false, //  必填欄位，若缺少此欄位，mongoDB 不會建立此 document 並會回傳 error
    trim: true, //  去除掉不必要的空白
    unique: false //  確認這個 email 是唯一
  },  
  transationId: {
    type: String,
    required: false, //  必填欄位，若缺少此欄位，mongoDB 不會建立此 document 並會回傳 error
    trim: true, //  去除掉不必要的空白
    unique: false //  確認這個 email 是唯一
  },
  publishDate: {
    type: Date,
    required: false
  },
  createdAt: {
    type: Date,
    required: false ,
    default: Date.now
  },
  schoolId: {
    type: String,
    required: true,
    trim: true
  },  
  createrId: {
    type: String,
    required: true,
    trim: true
  },
  auditorId: {
    type: String,
    required: false,
    trim: true
  },
  publish: {
    type: Boolean,
    required: true,
    trim: true
  },
  modify: {
    type: Boolean,
    required: true,
    trim: true
  },
  modified: {
    type: Boolean,
    required: true,
    trim: true
  },
  modifyComment: {
    type: String,
    required: false,
    trim: true
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
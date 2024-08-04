const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,  // Field to store the API key
    default: null,
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
    default: null,
  },
  devprojectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'devproject',
    default: null,
  },
  desprojectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'desproject',
    default: null,
  },
  certId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cert',
    default: null,
  },
  
});


module.exports = mongoose.model('user', UserSchema);

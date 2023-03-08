const mongoose = require('mongoose');

const DevprojectSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  filename: {
    type: String,
  },
  url: {
    type: String,
  },
  format: {
    type: String,
  },
  link: {
    type: String,
  },
  github: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
  stacks: {
    type: [String],
    
  },
});

module.exports = mongoose.model('devproject', DevprojectSchema);

const mongoose = require('mongoose');

const DesprojectSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },

  link: {
    type: String,
  },
  status: {
    type: String,
  },
  stacks: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('desproject', DesprojectSchema);

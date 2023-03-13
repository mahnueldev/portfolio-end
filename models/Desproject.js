const mongoose = require('mongoose');

const DesprojectSchema = mongoose.Schema(
  {
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
    status: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['ui', 'ux', 'combined'],
    },
    stacks: {
      type: [String],
      default: () => [],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Stacks must be a non-empty array of strings',
      },
      set: (v) => v.split(',').map((s) => s.trim()),
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('desproject', DesprojectSchema);



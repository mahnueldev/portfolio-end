const mongoose = require('mongoose');

const DevprojectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
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
      default: null,
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
      enum: ['web', 'mobile'],
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
module.exports = mongoose.model('devproject', DevprojectSchema);



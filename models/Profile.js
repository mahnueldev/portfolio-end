const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema(
  {
    about: {
      type: String,
      required: true
    },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model('profile', ProfileSchema);



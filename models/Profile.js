const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    about: {
      type: String,
      required: true,
      maxlength: 5000,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('profile', ProfileSchema);



const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema(
  {
    about: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('profile', ProfileSchema);



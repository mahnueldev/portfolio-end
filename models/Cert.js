const mongoose = require('mongoose');

const CertSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    title: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model('cert', CertSchema);

const mongoose = require('mongoose');

const CertSchema = mongoose.Schema(
  {
    title: {
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
    link: {
      type: String,
    },
    
  
  },
  { timestamps: true }
);
module.exports = mongoose.model('cert', CertSchema);



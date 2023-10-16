const multer = require('multer');

const mediaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/media/'); // make sure the directory 'uploads' exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});
const docStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/docs/'); // make sure the directory 'uploads' exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const mediaFilter = function (req, file, cb) {
  const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'video/mp4',
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const docFilter = function (req, file, cb) {
  const allowedFileTypes = ['application/pdf', 'application/msword', 'text/plain']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMedia = multer({
  storage: mediaStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Set the maximum file size to 5 MB
  fileFilter: mediaFilter,
});
const uploadDoc = multer({
  storage: docStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Set the maximum file size to 5 MB
  fileFilter: docFilter,
});

const mediaUpload = (fieldName) => {
  return async (req, res, next) => {
    try {
      await uploadMedia.single(fieldName)(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: 'Failed to upload file: ' + err });
        }

        if (!req.file) {
          return res.status(400).json({ msg: 'No file uploaded' });
        }

        req.body.filename = req.file.filename;
        next();
      });
    } catch (err) {
      res.status(400).json({ msg: 'Failed to upload file: ' + err });
    }
  };
};
const docUpload = (fieldName) => {
  return async (req, res, next) => {
    try {
      await uploadDoc.single(fieldName)(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: 'Failed to upload file: ' + err });
        }

        if (!req.file) {
          return res.status(400).json({ msg: 'No file uploaded' });
        }

        req.body.filename = req.file.filename;
        next();
      });
    } catch (err) {
      res.status(400).json({ msg: 'Failed to upload file: ' + err });
    }
  };
};

module.exports = { mediaUpload, docUpload };

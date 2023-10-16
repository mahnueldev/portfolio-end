const fs = require('fs');
const path = require('path');
const Cert = require('../models/Cert');
const multer = require('multer');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config({ path: '.env.production.local' });
}

const baseUrl = process.env.BASE_URL;

const uploadCert = async (req, res) => {
  try {
    const file = req.file;
    const newCert = new Cert({
      id: req.body.id,
      title: req.body.title,
      filename: file.filename,
      url: baseUrl + 'uploads/' + file.filename,
      link: req.body.link,
    });

    // Save the new cert to the database
    try {
      const savedCert = await newCert.save();
      res.json(savedCert);
    } catch (err) {
      // If there was an error saving the cert , delete the uploaded doc
      fs.unlinkSync(file.path);
      res.status(400).json({ msg: 'Failed to save cert: ' + err });
    }
  } catch (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ msg: 'Doc upload error: ' + err.message });
    } else {
      res.status(400).json({ msg: 'Failed to upload cert: ' + err });
    }
  }
};

const getCertById = async (req, res) => {
  try {
    const cert = await Cert.findById(req.params.id);

    if (!cert) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }

    res.json(cert);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllCerts = async (req, res) => {
  try {
    const certs = await Cert.find();
    res.json(certs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteCertById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const certId = new mongoose.Types.ObjectId(req.params.id);
    const cert = await Cert.findById(certId);

    // Find the cert by ID
    if (!cert) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }

    // Delete the cert from the database
    await Cert.findByIdAndRemove(req.params.id);

    // Delete the file from the uploads folder
    const filePath = path.join(__dirname, '..', 'uploads/docs', cert.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ msg: 'Cert and file deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteAllCert = async (req, res) => {
  try {
    const result = await Cert.deleteMany({});
    const deletedCount = result.deletedCount;

    // Delete all files from the uploads folder
    const dirPath = path.join(__dirname, '..', 'uploads/docs');
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      fs.unlinkSync(path.join(dirPath, file));
    }

    res.json({ msg: `${deletedCount} cert and files deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  uploadCert,
  deleteCertById,
  deleteAllCert,
  getAllCerts,
  getCertById,
};

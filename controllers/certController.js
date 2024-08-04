const Cert = require('../models/Cert');
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
    // Create a new certificate with userId
    const newCert = new Cert({
      title: req.body.title,
      institute: req.body.institute,
      link: req.body.link,
      userId: req.user.id
    });

    // Save the new cert to the database
    const savedCert = await newCert.save();
    res.json(savedCert);
  } catch (err) {
    res.status(400).json({ msg: 'Failed to upload certificate: ' + err });
  }
};

const updateCert = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const certId = req.params.id;
    const cert = await Cert.findOne({ _id: certId, userId: req.user.id });

    // Find the cert by ID and userId
    if (!cert) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }

    // Update the cert
    const { title, institute, link } = req.body;
    cert.title = title;
    cert.institute = institute;
    cert.link = link;

    await cert.save();

    res.json(cert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getCertById = async (req, res) => {
  try {
    const cert = await Cert.findOne({ _id: req.params.id, userId: req.user.id });

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
    const certs = await Cert.find({ userId: req.user.id });
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

    // Find the certificate by ID and userId
    const cert = await Cert.findOne({ _id: req.params.id, userId: req.user.id });

    if (!cert) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }

    // Delete the certificate from the database
    await Cert.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Cert deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteAllCert = async (req, res) => {
  try {
    const result = await Cert.deleteMany({ userId: req.user.id });

    const deletedCount = result.deletedCount;
    res.json({ msg: `${deletedCount} certs deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  uploadCert,
  updateCert,
  deleteCertById,
  deleteAllCert,
  getAllCerts,
  getCertById,
};

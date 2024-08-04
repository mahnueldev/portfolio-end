const express = require('express');
const router = express.Router();
const {uploadCert, updateCert, deleteCertById, deleteAllCert, getAllCerts, getCertById} = require('../controllers/certController');
const verifyAuth = require('../middleware/verifyAuth');
const verifyApiKey= require('../middleware/verifyApiKey');


// Admin
router.post('/admin/cert', verifyAuth,  uploadCert);
router.put('/admin/cert/:id', verifyAuth,  updateCert);
router.get('/admin/certs', verifyAuth, getAllCerts );
router.get('/admin/cert/:id', verifyAuth, getCertById );
router.delete('/admin/certs', verifyAuth, deleteAllCert );
router.delete('/admin/cert/:id', verifyAuth, deleteCertById );

// Public
router.get('/certs', verifyApiKey, getAllCerts );

module.exports = router;

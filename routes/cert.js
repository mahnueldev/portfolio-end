const express = require('express');
const router = express.Router();
const { docUpload } = require('../middleware/multerConn');
const {uploadCert, deleteCertById, deleteAllCert, getAllCerts, getCertById} = require('../controllers/certController');


// Authenticate user & get token
router.post('/cert', docUpload('file'), uploadCert);
router.get('/certs', getAllCerts );
router.get('/cert/:id', getCertById );
router.delete('/certs', deleteAllCert );
router.delete('/cert/:id', deleteCertById );

module.exports = router;

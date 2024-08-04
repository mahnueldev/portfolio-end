// routes/desprojectRoutes.js

const express = require('express');
const router = express.Router();
const { mediaUpload } = require('../middleware/multerConn');
const {createProj, updateProj, getAllProj, getProj, delProj, delAllProj} = require('../controllers/devProjectController');
const verifyAuth = require('../middleware/verifyAuth');
const verifyApiKey= require('../middleware/verifyApiKey');


// Define the routes and their corresponding controller methods
router.post('/admin/devproject',verifyAuth, mediaUpload('file'), createProj);
router.put('/admin/devproject/:id', verifyAuth, updateProj);
router.get('/admin/devproject/:id', verifyAuth, getProj);
router.get('/admin/devprojects', verifyAuth, getAllProj);
router.delete('/admin/devproject/:id',verifyAuth, delProj);
router.delete('/admin/devprojects', verifyAuth, delAllProj);


// Public
router.get('/devprojects', verifyApiKey, getAllProj);


module.exports = router;

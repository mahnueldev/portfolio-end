// routes/desprojectRoutes.js

const express = require('express');
const router = express.Router();
const { mediaUpload } = require('../middleware/multerConn');
const {createProj, updateProj, getAllProj, getProj, delProj, delAllProj} = require('../controllers/desProjectController');
const verifyRole = require('../middleware/verifyRole');
const roleList = require('../config/roleList');
const verifyAuth = require('../middleware/verifyAuth');
const verifyApiKey= require('../middleware/verifyApiKey');

// Define the routes and their corresponding controller methods
router.post('/admin/desproject', verifyAuth, verifyRole(roleList.ADMIN), mediaUpload('file'), createProj);
router.put('/admin/desproject/:id', verifyAuth, verifyRole(roleList.ADMIN), updateProj);
router.get('/admin/desproject/:id', verifyAuth, verifyRole(roleList.ADMIN), getProj);
router.get('/admin/desprojects', verifyAuth, verifyRole(roleList.ADMIN), getAllProj);
router.delete('/admin/desproject/:id', verifyAuth, verifyRole(roleList.ADMIN),delProj);
router.delete('/admin/desprojects', verifyAuth, verifyRole(roleList.ADMIN), delAllProj);

// Public
router.get('/desprojects', verifyApiKey, getAllProj);


module.exports = router;

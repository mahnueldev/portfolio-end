// routes/desprojectRoutes.js

const express = require('express');
const router = express.Router();
const { mediaUpload } = require('../middleware/multerConn');
const {createProj, updateProj, getAllProj, getProj, delProj, delAllProj} = require('../controllers/devProjectController');

// Define the routes and their corresponding controller methods
router.post('/devproject', mediaUpload('file'), createProj);
router.put('/devproject/:id', updateProj);
router.get('/devproject/:id', getProj);
router.get('/devprojects', getAllProj);
router.delete('/devproject/:id',delProj);
router.delete('/devprojects', delAllProj);

module.exports = router;

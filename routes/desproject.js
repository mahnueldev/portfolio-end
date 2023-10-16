// routes/desprojectRoutes.js

const express = require('express');
const router = express.Router();
const { mediaUpload } = require('../middleware/multerConn');
const {createProj, updateProj, getAllProj, getProj, delProj, delAllProj} = require('../controllers/desProjectController');

// Define the routes and their corresponding controller methods
router.post('/desproject', mediaUpload('file'), createProj);
router.put('/desproject/:id', updateProj);
router.get('/desproject/:id', getProj);
router.get('/desprojects', getAllProj);
router.delete('/desproject/:id',delProj);
router.delete('/desprojects', delAllProj);

module.exports = router;

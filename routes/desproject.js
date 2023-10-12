// routes/desprojectRoutes.js

const express = require('express');
const router = express.Router();
const { singleUpload } = require('../middleware/multerConn');
const {createProj, updateProj, getAllProj, getProj, delProj, delAllProj} = require('../controllers/desProjectController');

// Define the routes and their corresponding controller methods
router.post('/', singleUpload('file'), createProj);
router.put('/:id', updateProj);
router.get('/:id', getProj);
router.get('/', getAllProj);
router.delete('/:id',delProj);
router.delete('/', delAllProj);

module.exports = router;

const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');

// Authenticate user & get token
router.post('/',register);

module.exports = router;

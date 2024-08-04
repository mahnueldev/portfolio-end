const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../controllers/authController');


// Authenticate user & get token
router.post('/admin/auth',authenticateUser);


module.exports = router;

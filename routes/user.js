const express = require('express');
const router = express.Router();
const { getUser} = require('../controllers/userController');

// Authenticate user & get token
router.get('/user',getUser);

module.exports = router;

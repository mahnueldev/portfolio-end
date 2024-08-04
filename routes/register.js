const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');
const limitUsers = require('../middleware/limiter');

// Authenticate user & get token
router.post('/admin/register', limitUsers, register);

module.exports = router;

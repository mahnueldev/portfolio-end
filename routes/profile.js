const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const verifyAuth = require('../middleware/verifyAuth');

// Authenticate user & get token
router.get('/profile',getProfile);
router.post('/profile',verifyAuth, createOrUpdateProfile);

module.exports = router;

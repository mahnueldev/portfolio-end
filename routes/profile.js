const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const verifyAuth = require('../middleware/verifyAuth');
const verifyApiKey= require('../middleware/verifyApiKey');

router.get('/admin/profile', verifyAuth, getProfile);
router.post('/admin/profile', verifyAuth, createOrUpdateProfile);

// Public
router.get('/profile',verifyApiKey, getProfile);
module.exports = router;

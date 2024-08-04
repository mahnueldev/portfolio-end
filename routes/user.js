// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const verifyAuth = require('../middleware/verifyAuth');

// Get user information (protected route)
router.get('/admin/user', verifyAuth, getUser);

module.exports = router;

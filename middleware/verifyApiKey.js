const User = require('../models/User');

const verifyApiKey = async (req, res, next) => {
  try {
    // Extract API key from query parameters or headers
    const apiKey = req.query.apiKey || req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({ msg: 'API key is missing' });
    }

    // Find user by API key
    const user = await User.findOne({ apiKey });

    if (!user) {
      return res.status(403).json({ msg: 'Invalid API key' });
    }

    // Attach user information to request object
    req.user = user;

    next();
  } catch (error) {
    console.error('API key verification error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = verifyApiKey;

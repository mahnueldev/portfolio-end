// middleware/limitUsers.js

const User = require('../models/User'); // Adjust the path to your User model

const limitUsers = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments({});
    const USER_LIMIT = 2;

    if (userCount >= USER_LIMIT) {
      return res.status(403).json({ msg: 'User limit reached. No more users can be registered.' });
    }

    next();
  } catch (error) {
    console.error('Error in limitUsers middleware:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = limitUsers;

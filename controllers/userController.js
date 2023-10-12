const User = require('../models/User'); 

const getUser = async (req, res) => {
  try {
    // Retrieve user information based on the user's ID
    const user = await User.findById(req.user.id).select('-password -date');

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return the user information as a JSON response
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getUser };

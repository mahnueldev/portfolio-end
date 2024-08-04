const Profile = require('../models/Profile');
const User = require('../models/User');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config({ path: '.env.production.local' });
}

const createOrUpdateProfile = async (req, res) => {
  try {
    const { about } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile;
    if (!user.profileId) {
      // Create new profile if it doesn't exist
      profile = new Profile({ about, userId: user._id });
      await profile.save();
      user.profileId = profile._id;
      await user.save();
    } else {
      // Update existing profile
      profile = await Profile.findById(user.profileId);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      profile.about = about;
      await profile.save();
    }

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.profileId) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const profile = await Profile.findById(user.profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrUpdateProfile, getProfile };
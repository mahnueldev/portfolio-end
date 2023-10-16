const Profile = require('../models/profile');
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

    // Check if the user already has a profile
    if (!user.profile) {
      const profile = new Profile({ about, user: user._id });
      await profile.save();
      user.profile = profile._id;
      await user.save();
    } else {
      const profile = await Profile.findById(user.profile);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      profile.about = about;
      await profile.save();
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// const getProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!user.profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };const profile = await Profile.findById(user.profile);

//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     res.json({ profile });
//   } 

const getProfile = async (req, res) => {
    try {
      const profile = await Profile.findOne(); // Find the first profile (you may want to specify a condition if you have multiple profiles)
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.json(profile); // Return the profile directly
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { createOrUpdateProfile, getProfile };

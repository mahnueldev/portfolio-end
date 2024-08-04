const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto'); // For generating random API key

const User = require('../models/User');

// Function to generate a random 15-digit API key
const generateApiKey = () => {
  return crypto.randomBytes(8).toString('hex').slice(0, 15).toUpperCase();
};

const register = async (req, res) => {
  check('name', 'Please add name').not().isEmpty();
  check('email', 'Please include a valid email').isEmail();
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate the API key
    const apiKey = generateApiKey();

    user = new User({
      name,
      email,
      password,
      apiKey // Add the API key to the user model
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, apiKey }); // Return the API key in the response
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { register };

const fs = require('fs');
const path = require('path');
const Cert = require('../models/Cert');
const multer = require('multer');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config({ path: '.env.production.local' });
}

const baseUrl = process.env.BASE_URL
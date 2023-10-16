const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config({ path: '.env.production.local' });
}

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS.split(','),
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    preflightContinue: false,
  };
// console.log(process.env.ALLOWED_ORIGINS);

module.exports = corsOptions;

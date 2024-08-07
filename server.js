const path = require('path');
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const {accessLogMiddleware, errorLogMiddleware } = require('./middleware/morganWare');
const verifyAuth = require('./middleware/verifyAuth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

connectDB();
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Use HTTP request logger
app.use(accessLogMiddleware);
app.use(errorLogMiddleware);
// app.use(logger.notFound);
// app.use(logger.errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/devproject'));
app.use('/api', require('./routes/desproject'));
app.use('/api', require('./routes/cert'));
app.use('/api', require('./routes/profile'));
// app.use(verifyAuth);
app.use('/api/admin', require('./routes/user'));
//server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

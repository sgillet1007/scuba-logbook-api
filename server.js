const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
if (process.env.NODE_ENV != 'production') {
  dotenv.config({ path: './config/config.env' });
}

// Connect to mongo database
connectDB();

// Route files
const auth = require('./routes/auth');
const dives = require('./routes/dives');
const divesites = require('./routes/divesites');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// XSS safeguard
app.use(xss());

// Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// HTTP param pollution safeguard
app.use(hpp());

// Enable CORS
app.use(cors({ preflightContinue: true }));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/dives', dives);
app.use('/api/v1/divesites', divesites);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handler for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandeled Rejection Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

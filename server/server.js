require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');

const app = express();

// Security and middleware
app.use(helmet());
const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mock data middleware for development
if (process.env.USE_MOCK_DATA === 'true') {
  const mockDataMiddleware = require('./middleware/mockData');
  app.use(mockDataMiddleware);
}

// Health check
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', env: process.env.NODE_ENV, time: new Date().toISOString() })
);
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Avoid leaking internals
  const statusCode = err.status || 500;
  const message = err.message || 'Server error';
  if (process.env.NODE_ENV !== 'production') {
    // Log full error in dev
    // eslint-disable-next-line no-console
    console.error(err);
  }
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 5000;

// Start server - allow mock mode without DB
if (process.env.USE_MOCK_DATA === 'true') {
  // Run without database in mock mode
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running in MOCK MODE on port ${PORT}`);
  });
} else {
  // Normal mode with DB connection
  connectDB()
    .then(() => {
      // Optional boot-time seed (for dev environments only)
      if (process.env.SEED === 'true') {
        try {
          // Lazy import to avoid cost on prod
          const Product = require('./models/Product');
          const sampleProducts = require('./utils/sampleProducts');
          Product.countDocuments().then((count) => {
            if (count === 0) {
              Product.insertMany(sampleProducts).catch(() => {});
            }
          });
        } catch (_) {}
      }
      app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('DB connection failed', err);
      process.exit(1);
    });
}



import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

import sanitizeRequest from './utils/sanitizeRequest.js';
import toursRouter from './routes/tours.routes.js';
import healthCheckRouter from './routes/health-check.routes.js';
import globalErrorHandler from './controllers/error.controller.js';

export const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middlewares
// Set security HTTP headers
app.use(helmet());
// Rate limiting middleware
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
// body parser, reading data from body into req.body and limit the body size to 10kb
app.use(express.json({ limit: '10kb' }));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// Serving static files
app.use(express.static('public'));
// Data
app.use(sanitizeRequest);
// Prevent parameter pollution
app.use(hpp());
// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use('/api/v1/health-check', healthCheckRouter);
app.use('/api/v1/tours', toursRouter);

// root route
app.get('/', (req, res) => {
  res.send('Welcome to Natours Tours API');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handling middleware
app.use(globalErrorHandler);

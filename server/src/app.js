import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import toursRouter from './routes/tours.routes.js';
import healthCheckRouter from './routes/health-check.routes.js';

export const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse all other incoming requests with JSON payloads
app.use(express.json({ limit: '10kb' }));
app.use(cors());
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

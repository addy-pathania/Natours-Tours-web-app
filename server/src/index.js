import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({
  path: './.env',
});

const port = process.env.PORT || 3001;
let server;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

connectDB()
  .then(() => {
    server = app.listen(port, () => {
      console.log(`✅ Natours Tours App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('DATABASE CONNECTION FAILED! 💥', err);
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

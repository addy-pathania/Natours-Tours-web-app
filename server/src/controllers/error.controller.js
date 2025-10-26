import ResponseApi from '../utils/responseApi.js';

const globalErrorHandler = (err, _req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message || 'Internal Server Error',
      stack: err.stack,
    });
  } else {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return new ResponseApi(err.statusCode, err.status, { message: err.message }).send(res);
    } else {
      // Programming or other unknown error: don't leak error details
      console.error('ERROR 💥', err);
      return new ResponseApi(500, 'error', { message: 'Something went very wrong!' }).send(res);
    }
  }
};

export default globalErrorHandler;

import TourModel from '../models/tour.model.js';
import ErrorApi from '../utils/errorApi.js';
import QueryBuilder from '../utils/queryBuilder.js';
import ResponseApi from '../utils/responseApi.js';
import qs from 'qs';

/**
 * Get all tours
 */
export const getAllTours = async (req, res, next) => {
  try {
    // Parse query parameters
    const queryString = qs.parse(req.url.split('?')[1]);

    // Build the query using QueryBuilder
    const queryBuilder = new QueryBuilder(TourModel.find(), queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute the query
    const tours = await queryBuilder.query;
    return new ResponseApi(200, 'success', { tours }, null, tours.length).send(res);
  } catch (err) {
    next(new ErrorApi(err.message, 500));
  }
};

/**
 * Create a new tour
 */
export const createTour = async (req, res, next) => {
  const { name, price, summary } = req.body;

  const newTour = {
    name,
    price,
    summary,
  };

  try {
    await TourModel.create(newTour);

    return new ResponseApi(201, 'success', { tour: newTour }).send(res);
  } catch (err) {
    if (err.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      return next(new ErrorApi(`Tour with name '${value}' already exists`, 400));
    }
    next(new ErrorApi(err.message, 500));
  }
};

/**
 * Get a tour by ID
 */
export const getTour = async (req, res, next) => {
  const id = req.params.id;
  try {
    const tour = await TourModel.findById(id);

    if (!tour) {
      return next(new ErrorApi(`Tour not found with id ${id}`, 404));
    }

    return new ResponseApi(200, 'success', { tour }).send(res);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorApi(`Invalid ${err.path}: ${err.value}`, 400));
    }

    return next(new ErrorApi(err.message, 500));
  }
};

/**
 * Delete a tour by ID
 */
export const deleteTour = async (req, res, next) => {
  const id = req.params.id;

  try {
    const tour = await TourModel.findByIdAndDelete(id);

    if (!tour) {
      return next(new ErrorApi(`Tour not found with id ${id}`, 404));
    }

    return new ResponseApi(204, 'success', null).send(res);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorApi(`Invalid ${err.path}: ${err.value}`, 400));
    }

    next(new ErrorApi(err.message, 500));
  }
};

/**
 * Update a tour by ID
 */
export const updateTour = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const tour = await TourModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!tour) {
      return next(new ErrorApi(`Tour not found with id ${id}`, 404));
    }

    return new ResponseApi(200, 'success', { tour }).send(res);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorApi(`Invalid ${err.path}: ${err.value}`, 400));
    }
    if (err.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      return next(new ErrorApi(`Tour with name '${value}' already exists`, 400));
    }

    next(new ErrorApi(err.message, 500));
  }
};

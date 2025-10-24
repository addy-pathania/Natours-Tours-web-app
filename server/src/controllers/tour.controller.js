import TourModel from '../models/tour.model.js';

export const getAllTours = async (req, res) => {
  try {
    const tours = await TourModel.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const createTour = async (req, res) => {
  const { name, price, summary } = req.body;
  const newTour = {
    name,
    price,
    summary,
  };

  try {
    await TourModel.create(newTour);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const getTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await TourModel.findById(id);

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await TourModel.findByIdAndDelete(id);

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Tour ${id} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const updateTour = async (req, res) => {
  const { id, name, price, summary } = req.params;

  try {
    const tour = await TourModel.findByIdAndUpdate(id, { name, price, summary }, { new: true });

    if (!tour) {
      throw new Error('Tour not found');
    }

    res.status(200).json({
      status: 'success',
      message: `Tour ${id} updated successfully.`,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

import { Router } from 'express';

import {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
} from '../controllers/tour.controller.js';

const router = Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export default router;

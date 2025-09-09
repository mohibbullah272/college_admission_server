import express from 'express';
import { body } from 'express-validator';
import {
  createReviewHandler,
  getCollegeReviewsHandler,
  getAllReviewsHandler,
  getFeaturedReviewsHandler,
} from '../controllers/ReviewController';
import { protect } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().withMessage('Comment is required'),
    body('college').notEmpty().withMessage('College is required'),
  ],
  handleValidationErrors,
  createReviewHandler
);

router.get('/college/:collegeId', getCollegeReviewsHandler);
router.get('/all', getAllReviewsHandler);
router.get('/featured', getFeaturedReviewsHandler);


const reviewRoute = router

export default reviewRoute;
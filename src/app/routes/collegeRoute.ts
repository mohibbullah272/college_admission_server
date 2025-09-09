import express from 'express';
import {
  createCollegeHandler,
  getColleges,
  getCollege,
  updateCollegeHandler,
  deleteCollegeHandler,
  getFeaturedCollegesHandler,
} from '../controllers/CollegeController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .post(protect, createCollegeHandler)
  .get(getColleges);

router.get('/featured', getFeaturedCollegesHandler);

router.route('/:id')
  .get(getCollege)
  .put(protect, updateCollegeHandler)
  .delete(protect, deleteCollegeHandler);
const collegeRoute = router
export default collegeRoute;
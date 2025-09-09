import express from 'express';
import { body } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controllers/AuthController';
import { protect } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  handleValidationErrors,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  handleValidationErrors,
  login
);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
const authRoute = router
export default authRoute;
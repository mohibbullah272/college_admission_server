import express from 'express';
import { body } from 'express-validator';
import {
  createAdmissionHandler,
  getMyAdmissions,
  getAllAdmissionsHandler,
  updateAdmissionStatusHandler,
} from '../controllers/AdmissionController';
import { protect } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('candidateName').notEmpty().withMessage('Candidate name is required'),
    body('candidateEmail').isEmail().withMessage('Please include a valid email'),
    body('candidatePhone').notEmpty().withMessage('Phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('college').notEmpty().withMessage('College is required'),
  ],
  handleValidationErrors,
  createAdmissionHandler
);

router.get('/my', protect, getMyAdmissions);
router.get('/all', protect, getAllAdmissionsHandler);
router.put('/:id/status', protect, updateAdmissionStatusHandler);


const admissionRoute = router
export default admissionRoute;
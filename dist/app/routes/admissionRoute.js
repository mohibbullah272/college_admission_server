"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const AdmissionController_1 = require("../controllers/AdmissionController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/', auth_1.protect, [
    (0, express_validator_1.body)('candidateName').notEmpty().withMessage('Candidate name is required'),
    (0, express_validator_1.body)('candidateEmail').isEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('candidatePhone').notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
    (0, express_validator_1.body)('subject').notEmpty().withMessage('Subject is required'),
    (0, express_validator_1.body)('college').notEmpty().withMessage('College is required'),
], validation_1.handleValidationErrors, AdmissionController_1.createAdmissionHandler);
router.get('/my', auth_1.protect, AdmissionController_1.getMyAdmissions);
router.get('/all', auth_1.protect, AdmissionController_1.getAllAdmissionsHandler);
router.put('/:id/status', auth_1.protect, AdmissionController_1.updateAdmissionStatusHandler);
const admissionRoute = router;
exports.default = admissionRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ReviewController_1 = require("../controllers/ReviewController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/', auth_1.protect, [
    (0, express_validator_1.body)('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    (0, express_validator_1.body)('comment').notEmpty().withMessage('Comment is required'),
    (0, express_validator_1.body)('college').notEmpty().withMessage('College is required'),
], validation_1.handleValidationErrors, ReviewController_1.createReviewHandler);
router.get('/college/:collegeId', ReviewController_1.getCollegeReviewsHandler);
router.get('/all', ReviewController_1.getAllReviewsHandler);
router.get('/featured', ReviewController_1.getFeaturedReviewsHandler);
const reviewRoute = router;
exports.default = reviewRoute;

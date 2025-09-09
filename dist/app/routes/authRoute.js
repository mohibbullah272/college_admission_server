"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validation_1.handleValidationErrors, AuthController_1.register);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('password').exists().withMessage('Password is required'),
], validation_1.handleValidationErrors, AuthController_1.login);
router.get('/profile', auth_1.protect, AuthController_1.getProfile);
router.put('/profile', auth_1.protect, AuthController_1.updateProfile);
const authRoute = router;
exports.default = authRoute;

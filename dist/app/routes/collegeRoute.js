"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CollegeController_1 = require("../controllers/CollegeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .post(CollegeController_1.createCollegeHandler)
    .get(CollegeController_1.getColleges);
router.get('/featured', CollegeController_1.getFeaturedCollegesHandler);
router.route('/:id')
    .get(CollegeController_1.getCollege)
    .put(auth_1.protect, CollegeController_1.updateCollegeHandler)
    .delete(auth_1.protect, CollegeController_1.deleteCollegeHandler);
const collegeRoute = router;
exports.default = collegeRoute;

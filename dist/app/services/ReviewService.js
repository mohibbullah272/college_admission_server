"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedReviews = exports.getAllReviews = exports.getCollegeReviews = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user has already reviewed this college
    const existingReview = yield Review_1.default.findOne({
        college: reviewData.college,
        user: reviewData.user,
    });
    if (existingReview) {
        throw new Error('You have already reviewed this college');
    }
    const review = yield Review_1.default.create(reviewData);
    yield review.populate('user', 'name');
    yield review.populate('college', 'name');
    return review;
});
exports.createReview = createReview;
const getCollegeReviews = (collegeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Review_1.default.find({ college: collegeId })
        .populate('user', 'name')
        .sort({ createdAt: -1 });
});
exports.getCollegeReviews = getCollegeReviews;
const getAllReviews = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const reviews = yield Review_1.default.find()
        .populate('user', 'name')
        .populate('college', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const total = yield Review_1.default.countDocuments();
    const pages = Math.ceil(total / limit);
    return { reviews, total, pages };
});
exports.getAllReviews = getAllReviews;
const getFeaturedReviews = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 5) {
    return yield Review_1.default.find()
        .populate('user', 'name')
        .populate('college', 'name')
        .sort({ rating: -1, createdAt: -1 })
        .limit(limit);
});
exports.getFeaturedReviews = getFeaturedReviews;

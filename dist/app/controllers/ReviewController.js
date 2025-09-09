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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedReviewsHandler = exports.getAllReviewsHandler = exports.getCollegeReviewsHandler = exports.createReviewHandler = void 0;
const ReviewService_1 = require("../services/ReviewService");
const createReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewData = Object.assign(Object.assign({}, req.body), { user: req.user._id });
        const review = yield (0, ReviewService_1.createReview)(reviewData);
        res.status(201).json({
            success: true,
            data: review,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createReviewHandler = createReviewHandler;
const getCollegeReviewsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield (0, ReviewService_1.getCollegeReviews)(req.params.collegeId);
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getCollegeReviewsHandler = getCollegeReviewsHandler;
const getAllReviewsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield (0, ReviewService_1.getAllReviews)(page, limit);
        res.status(200).json({
            success: true,
            data: result.reviews,
            pagination: {
                page,
                limit,
                total: result.total,
                pages: result.pages,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllReviewsHandler = getAllReviewsHandler;
const getFeaturedReviewsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const reviews = yield (0, ReviewService_1.getFeaturedReviews)(limit);
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getFeaturedReviewsHandler = getFeaturedReviewsHandler;

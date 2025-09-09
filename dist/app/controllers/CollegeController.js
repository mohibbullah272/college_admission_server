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
exports.getFeaturedCollegesHandler = exports.deleteCollegeHandler = exports.updateCollegeHandler = exports.getCollege = exports.getColleges = exports.createCollegeHandler = void 0;
const CollegeService_1 = require("../services/CollegeService");
const createCollegeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collegeData = req.body;
        const college = yield (0, CollegeService_1.createCollege)(collegeData);
        res.status(201).json({
            success: true,
            data: college,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createCollegeHandler = createCollegeHandler;
const getColleges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const result = yield (0, CollegeService_1.getAllColleges)(page, limit, search);
        res.status(200).json({
            success: true,
            data: result.colleges,
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
exports.getColleges = getColleges;
const getCollege = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const college = yield (0, CollegeService_1.getCollegeById)(req.params.id);
        res.status(200).json({
            success: true,
            data: college,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getCollege = getCollege;
const updateCollegeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const college = yield (0, CollegeService_1.updateCollege)(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: college,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateCollegeHandler = updateCollegeHandler;
const deleteCollegeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, CollegeService_1.deleteCollege)(req.params.id);
        res.status(200).json({
            success: true,
            message: 'College deleted successfully',
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteCollegeHandler = deleteCollegeHandler;
const getFeaturedCollegesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const colleges = yield (0, CollegeService_1.getFeaturedColleges)(limit);
        res.status(200).json({
            success: true,
            data: colleges,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getFeaturedCollegesHandler = getFeaturedCollegesHandler;

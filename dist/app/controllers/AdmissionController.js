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
exports.updateAdmissionStatusHandler = exports.getAllAdmissionsHandler = exports.getMyAdmissions = exports.createAdmissionHandler = void 0;
const AdmissionService_1 = require("../services/AdmissionService");
const createAdmissionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admissionData = Object.assign(Object.assign({}, req.body), { user: req.user._id });
        const admission = yield (0, AdmissionService_1.createAdmission)(admissionData);
        yield admission.populate('college');
        res.status(201).json({
            success: true,
            data: admission,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createAdmissionHandler = createAdmissionHandler;
const getMyAdmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admissions = yield (0, AdmissionService_1.getUserAdmissions)(req.user._id);
        res.status(200).json({
            success: true,
            data: admissions,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getMyAdmissions = getMyAdmissions;
const getAllAdmissionsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield (0, AdmissionService_1.getAllAdmissions)(page, limit);
        res.status(200).json({
            success: true,
            data: result.admissions,
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
exports.getAllAdmissionsHandler = getAllAdmissionsHandler;
const updateAdmissionStatusHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const admission = yield (0, AdmissionService_1.updateAdmissionStatus)(req.params.id, status);
        res.status(200).json({
            success: true,
            data: admission,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateAdmissionStatusHandler = updateAdmissionStatusHandler;

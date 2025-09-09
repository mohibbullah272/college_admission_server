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
exports.updateAdmissionStatus = exports.getAllAdmissions = exports.getUserAdmissions = exports.createAdmission = void 0;
const Admission_1 = __importDefault(require("../models/Admission"));
const createAdmission = (admissionData) => __awaiter(void 0, void 0, void 0, function* () {
    const admission = yield Admission_1.default.create(admissionData);
    return admission;
});
exports.createAdmission = createAdmission;
const getUserAdmissions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admission_1.default.find({ user: userId }).populate('college');
});
exports.getUserAdmissions = getUserAdmissions;
const getAllAdmissions = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const admissions = yield Admission_1.default.find()
        .populate('college')
        .populate('user', 'name email')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const total = yield Admission_1.default.countDocuments();
    const pages = Math.ceil(total / limit);
    return { admissions, total, pages };
});
exports.getAllAdmissions = getAllAdmissions;
const updateAdmissionStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const admission = yield Admission_1.default.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).populate('college').populate('user', 'name email');
    if (!admission) {
        throw new Error('Admission not found');
    }
    return admission;
});
exports.updateAdmissionStatus = updateAdmissionStatus;

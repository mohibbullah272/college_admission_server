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
exports.getFeaturedColleges = exports.deleteCollege = exports.updateCollege = exports.getCollegeById = exports.getAllColleges = exports.createCollege = void 0;
const College_1 = __importDefault(require("../models/College"));
const createCollege = (collegeData) => __awaiter(void 0, void 0, void 0, function* () {
    const college = yield College_1.default.create(collegeData);
    return college;
});
exports.createCollege = createCollege;
const getAllColleges = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, search = '') {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const colleges = yield College_1.default.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const total = yield College_1.default.countDocuments(query);
    const pages = Math.ceil(total / limit);
    return { colleges, total, pages };
});
exports.getAllColleges = getAllColleges;
const getCollegeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const college = yield College_1.default.findById(id);
    if (!college) {
        throw new Error('College not found');
    }
    return college;
});
exports.getCollegeById = getCollegeById;
const updateCollege = (id, collegeData) => __awaiter(void 0, void 0, void 0, function* () {
    const college = yield College_1.default.findByIdAndUpdate(id, collegeData, { new: true, runValidators: true });
    if (!college) {
        throw new Error('College not found');
    }
    return college;
});
exports.updateCollege = updateCollege;
const deleteCollege = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const college = yield College_1.default.findById(id);
    if (!college) {
        throw new Error('College not found');
    }
    yield College_1.default.findByIdAndDelete(id);
});
exports.deleteCollege = deleteCollege;
const getFeaturedColleges = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 3) {
    return yield College_1.default.find().sort({ rating: -1 }).limit(limit);
});
exports.getFeaturedColleges = getFeaturedColleges;

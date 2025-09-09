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
exports.getUserProfile = exports.updateUserProfile = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    if (!id) {
        return ('id is required');
    }
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
        expiresIn: "7d"
    });
};
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, avatar } = userData;
    // Check if user exists
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    // Create user
    const user = yield User_1.default.create({
        name,
        email,
        password,
        avatar,
    });
    const token = generateToken(user === null || user === void 0 ? void 0 : user._id);
    return { user, token };
});
exports.registerUser = registerUser;
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    // Check for user
    const user = yield User_1.default.findOne({ email }).select('+password');
    if (!user || !(yield user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(user === null || user === void 0 ? void 0 : user._id);
    return { user, token };
});
exports.loginUser = loginUser;
const updateUserProfile = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.updateUserProfile = updateUserProfile;
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.getUserProfile = getUserProfile;

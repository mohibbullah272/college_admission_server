"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(success, message, data, pagination) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.pagination = pagination;
    }
}
exports.ApiResponse = ApiResponse;

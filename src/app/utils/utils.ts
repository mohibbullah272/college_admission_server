export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  
    constructor(success: boolean, message: string, data?: T, pagination?: any) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.pagination = pagination;
    }
  }
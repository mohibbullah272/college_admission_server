import { Request, Response } from 'express';
import {
  createReview,
  getCollegeReviews,
  getAllReviews,
  getFeaturedReviews,
} from '../services/ReviewService';
import { IReviewInput } from '../interfaces/ReviewInterface';

export const createReviewHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviewData: IReviewInput = {
      ...req.body,
      user: req.user._id,
    };
    
    const review = await createReview(reviewData);
    
    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCollegeReviewsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await getCollegeReviews(req.params.collegeId);
    
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReviewsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getAllReviews(page, limit);
    
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedReviewsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const reviews = await getFeaturedReviews(limit);
    
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
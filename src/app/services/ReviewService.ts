import Review from '../models/Review';
import { IReview, IReviewInput } from '../interfaces/ReviewInterface';

export const createReview = async (reviewData: IReviewInput): Promise<IReview> => {
  // Check if user has already reviewed this college
  const existingReview = await Review.findOne({
    college: reviewData.college,
    user: reviewData.user,
  });
  
  if (existingReview) {
    throw new Error('You have already reviewed this college');
  }
  
  const review = await Review.create(reviewData);
  await review.populate('user', 'name');
  await review.populate('college', 'name');
  
  return review;
};

export const getCollegeReviews = async (collegeId: string): Promise<IReview[]> => {
  return await Review.find({ college: collegeId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
};

export const getAllReviews = async (page: number = 1, limit: number = 10): Promise<{ reviews: IReview[]; total: number; pages: number }> => {
  const reviews = await Review.find()
    .populate('user', 'name')
    .populate('college', 'name')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  
  const total = await Review.countDocuments();
  const pages = Math.ceil(total / limit);
  
  return { reviews, total, pages };
};

export const getFeaturedReviews = async (limit: number = 5): Promise<IReview[]> => {
  return await Review.find()
    .populate('user', 'name')
    .populate('college', 'name')
    .sort({ rating: -1, createdAt: -1 })
    .limit(limit);
};
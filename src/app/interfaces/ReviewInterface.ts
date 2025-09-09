import { Document, Types } from 'mongoose';

export interface IReview extends Document {
  rating: number;
  comment: string;
  college: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewInput {
  rating: number;
  comment: string;
  college: string;
  user: string;
}
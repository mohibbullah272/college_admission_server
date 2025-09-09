import mongoose, { Schema, Types } from 'mongoose';
import { IReview } from '../interfaces/ReviewInterface';

const reviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per college
reviewSchema.index({ college: 1, user: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', reviewSchema);
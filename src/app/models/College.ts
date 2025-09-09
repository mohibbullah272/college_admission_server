import mongoose, { Schema } from 'mongoose';
import { ICollege } from '../interfaces/CollegeInterface';

const collegeSchema = new Schema<ICollege>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    researchCount: {
      type: Number,
      required: true,
      min: 0,
    },
    events: [{
      type: String,
    }],
    sports: [{
      type: String,
    }],
    researchHistory: [{
      type: String,
    }],
    gallery: [{
      type: String,
    }],
    admissionProcess: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICollege>('College', collegeSchema);
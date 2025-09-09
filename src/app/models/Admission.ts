import mongoose, { Schema, Types } from 'mongoose';
import { IAdmission } from '../interfaces/AdmissionInterface';

const admissionSchema = new Schema<IAdmission>(
  {
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    candidateEmail: {
      type: String,
      required: true,
      trim: true,
    },
    candidatePhone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
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
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAdmission>('Admission', admissionSchema);
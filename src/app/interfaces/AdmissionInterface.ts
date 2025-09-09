import { Document, Types } from 'mongoose';

export interface IAdmission extends Document {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  address: string;
  dateOfBirth: Date;
  subject: string;
  image: string;
  college: Types.ObjectId;
  user: Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdmissionInput {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  address: string;
  dateOfBirth: Date;
  subject: string;
  image: string;
  college: string;
  user: string;
}
import { Document } from 'mongoose';

export interface ICollege extends Document {
  name: string;
  image: string;
  rating: number;
  admissionDate: Date;
  researchCount: number;
  events: string[];
  sports: string[];
  researchHistory: string[];
  gallery: string[];
  admissionProcess: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollegeInput {
  name: string;
  image: string;
  rating: number;
  admissionDate: Date;
  researchCount: number;
  events: string[];
  sports: string[];
  researchHistory: string[];
  gallery: string[];
  admissionProcess: string;
}
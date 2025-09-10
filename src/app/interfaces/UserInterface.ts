import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  address?: string;
  university?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUpdateUserInput {
  name?: string;
  email?: string;
  address?: string;
  university?: string;
  avatar?: string;
}
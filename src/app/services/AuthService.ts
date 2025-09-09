import User from '../models/User';
import { IUserInput, ILoginInput, IUpdateUserInput, IUser } from '../interfaces/UserInterface';
import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    if(!id){
        return  ('id is required')
    }
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: "7d"
  });
};

export const registerUser = async (userData: IUserInput): Promise<{ user: IUser; token: string }> => {
  const { name, email, password, avatar } = userData;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  const token = generateToken(user?._id as string);

  return { user, token };
};

export const loginUser = async (loginData: ILoginInput): Promise<{ user: IUser; token: string }> => {
  const { email, password } = loginData;

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user?._id as string);

  return { user, token };
};

export const updateUserProfile = async (userId: string, updateData: IUpdateUserInput): Promise<IUser> => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const getUserProfile = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
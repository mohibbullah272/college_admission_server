import { Request, Response } from 'express';
import { registerUser, loginUser, updateUserProfile, getUserProfile } from '../services/AuthService';
import { IUserInput, ILoginInput, IUpdateUserInput } from '../interfaces/UserInterface';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, avatar } = req.body;
    
    const userData: IUserInput = { name, email, password, avatar };
    const { user, token } = await registerUser(userData);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const loginData: ILoginInput = { email, password };
    const { user, token } = await loginUser(loginData);
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserProfile(req.user._id);
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
        university: user.university,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, address, university, avatar } = req.body;
    
    const updateData: IUpdateUserInput = { name, email, address, university, avatar };
    const user = await updateUserProfile(req.user._id, updateData);
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
        university: user.university,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
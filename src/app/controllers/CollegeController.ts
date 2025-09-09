import { Request, Response } from 'express';
import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
  getFeaturedColleges,
} from '../services/CollegeService';
import { ICollegeInput } from '../interfaces/CollegeInterface';

export const createCollegeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const collegeData: ICollegeInput = req.body;
    const college = await createCollege(collegeData);
    
    res.status(201).json({
      success: true,
      data: college,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    
    const result = await getAllColleges(page, limit, search);
    
    res.status(200).json({
      success: true,
      data: result.colleges,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const college = await getCollegeById(req.params.id);
    
    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCollegeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const college = await updateCollege(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCollegeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteCollege(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'College deleted successfully',
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedCollegesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 3;
    const colleges = await getFeaturedColleges(limit);
    
    res.status(200).json({
      success: true,
      data: colleges,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
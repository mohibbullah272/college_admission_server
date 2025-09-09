import { Request, Response } from 'express';
import {
  createAdmission,
  getUserAdmissions,
  getAllAdmissions,
  updateAdmissionStatus,
} from '../services/AdmissionService';
import { IAdmissionInput } from '../interfaces/AdmissionInterface';

export const createAdmissionHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admissionData: IAdmissionInput = {
      ...req.body,
      user: req.user._id,
    };
    
    const admission = await createAdmission(admissionData);
    await admission.populate('college');
    
    res.status(201).json({
      success: true,
      data: admission,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyAdmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const admissions = await getUserAdmissions(req.user._id);
    
    res.status(200).json({
      success: true,
      data: admissions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAdmissionsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getAllAdmissions(page, limit);
    
    res.status(200).json({
      success: true,
      data: result.admissions,
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

export const updateAdmissionStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const admission = await updateAdmissionStatus(req.params.id, status);
    
    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
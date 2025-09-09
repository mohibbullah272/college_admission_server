import Admission from '../models/Admission';
import { IAdmission, IAdmissionInput } from '../interfaces/AdmissionInterface';

export const createAdmission = async (admissionData: IAdmissionInput): Promise<IAdmission> => {
  const admission = await Admission.create(admissionData);
  return admission;
};

export const getUserAdmissions = async (userId: string): Promise<IAdmission[]> => {
  return await Admission.find({ user: userId }).populate('college');
};

export const getAllAdmissions = async (page: number = 1, limit: number = 10): Promise<{ admissions: IAdmission[]; total: number; pages: number }> => {
  const admissions = await Admission.find()
    .populate('college')
    .populate('user', 'name email')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  
  const total = await Admission.countDocuments();
  const pages = Math.ceil(total / limit);
  
  return { admissions, total, pages };
};

export const updateAdmissionStatus = async (id: string, status: 'pending' | 'approved' | 'rejected'): Promise<IAdmission> => {
  const admission = await Admission.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('college').populate('user', 'name email');
  
  if (!admission) {
    throw new Error('Admission not found');
  }
  
  return admission;
};
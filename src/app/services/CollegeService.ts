import College from '../models/College';
import { ICollege, ICollegeInput } from '../interfaces/CollegeInterface';

export const createCollege = async (collegeData: ICollegeInput): Promise<ICollege> => {
  const college = await College.create(collegeData);
  return college;
};

export const getAllColleges = async (page: number = 1, limit: number = 10, search: string = ''): Promise<{ colleges: ICollege[]; total: number; pages: number }> => {
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};
  
  const colleges = await College.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  
  const total = await College.countDocuments(query);
  const pages = Math.ceil(total / limit);
  
  return { colleges, total, pages };
};

export const getCollegeById = async (id: string): Promise<ICollege> => {
  const college = await College.findById(id);
  
  if (!college) {
    throw new Error('College not found');
  }
  
  return college;
};

export const updateCollege = async (id: string, collegeData: Partial<ICollegeInput>): Promise<ICollege> => {
  const college = await College.findByIdAndUpdate(
    id,
    collegeData,
    { new: true, runValidators: true }
  );
  
  if (!college) {
    throw new Error('College not found');
  }
  
  return college;
};

export const deleteCollege = async (id: string): Promise<void> => {
  const college = await College.findById(id);
  
  if (!college) {
    throw new Error('College not found');
  }
  
  await College.findByIdAndDelete(id);
};

export const getFeaturedColleges = async (limit: number = 3): Promise<ICollege[]> => {
  return await College.find().sort({ rating: -1 }).limit(limit);
};
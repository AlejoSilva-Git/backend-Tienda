import { ObjectId } from 'mongodb';

export interface Category {
  _id?: ObjectId;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export {};
import { ObjectId } from 'mongodb';

export interface Review {
  _id?: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  rating: number;
  comment: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export {};
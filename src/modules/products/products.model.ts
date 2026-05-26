import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  categoryId: ObjectId;
  sizes: string[];
  colors: string[];
  stock: Record<string, number>;  // ✅ Cambiar de Map a objeto plano
  images: string[];
  rating: number;
  numReviews: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export {};
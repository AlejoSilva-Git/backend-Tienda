import { ObjectId } from 'mongodb';

export interface CartItem {
  productId: ObjectId;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Cart {
  _id?: ObjectId;
  userId: ObjectId;
  items: CartItem[];
  total: number;
  updatedAt: Date;
}

// Exportar vacío para que sea un módulo
export {};
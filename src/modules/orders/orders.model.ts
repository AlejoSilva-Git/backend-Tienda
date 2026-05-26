import { ObjectId } from 'mongodb';

export interface OrderItem {
  productId: ObjectId;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface Order {
  _id?: ObjectId;
  userId: ObjectId;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: "card" | "paypal" | "cash";
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export {};
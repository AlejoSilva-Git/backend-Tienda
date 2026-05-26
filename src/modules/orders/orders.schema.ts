import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string(),
  size: z.string(),
  color: z.string(),
  quantity: z.number().int().min(1),
  price: z.number().positive(),
});

export const shippingAddressSchema = z.object({
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().min(8),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(["card", "paypal", "cash"]),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
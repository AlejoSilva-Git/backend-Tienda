import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "El nombre debe tener mínimo 3 caracteres").max(100),
  description: z.string().min(10, "La descripción debe tener mínimo 10 caracteres").max(1000),
  price: z.number().positive("El precio debe ser positivo"),
  categoryId: z.string().min(1, "La categoría es requerida"),
  sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])),
  colors: z.array(z.string()),
  stock: z.record(z.string(), z.number().int().min(0)),  // ✅ Corregido: especificar key y value
  images: z.array(z.string()).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
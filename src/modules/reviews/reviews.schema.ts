import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3, "El comentario debe tener mínimo 3 caracteres"),
  images: z.array(z.string()).optional(),
});

export type CreateReviewDto = z.infer<typeof createReviewSchema>;
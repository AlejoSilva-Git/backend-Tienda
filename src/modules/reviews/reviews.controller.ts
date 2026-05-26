import { Request, Response, NextFunction } from "express";
import { ReviewsService } from "./reviews.service";
import { createReviewSchema } from "./reviews.schema";

export class ReviewsController {
  private readonly reviewsService = new ReviewsService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createReviewSchema.parse(req.body);
      // ✅ Convertir params a string correctamente
      const productId = typeof req.params.productId === 'string' 
        ? req.params.productId 
        : Array.isArray(req.params.productId) 
          ? req.params.productId[0] 
          : '';
      
      if (!productId) {
        return res.status(400).json({ success: false, message: "ProductId es requerido" });
      }
      
      const userId = (req as any).user?.sub;
      const review = await this.reviewsService.create(data, productId, userId);
      res.status(201).json({ success: true, data: review });
    } catch (error) {
      next(error);
    }
  };

  findByProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ✅ Convertir params a string correctamente
      const productId = typeof req.params.productId === 'string' 
        ? req.params.productId 
        : Array.isArray(req.params.productId) 
          ? req.params.productId[0] 
          : '';
      
      if (!productId) {
        return res.status(400).json({ success: false, message: "ProductId es requerido" });
      }
      
      const reviews = await this.reviewsService.findByProduct(productId);
      res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ✅ Convertir params a string correctamente
      const id = typeof req.params.id === 'string' 
        ? req.params.id 
        : Array.isArray(req.params.id) 
          ? req.params.id[0] 
          : '';
      
      if (!id) {
        return res.status(400).json({ success: false, message: "Id es requerido" });
      }
      
      const userId = (req as any).user?.sub;
      const isAdmin = (req as any).user?.role === "admin";
      await this.reviewsService.delete(id, userId, isAdmin);
      res.status(200).json({ success: true, message: "Reseña eliminada" });
    } catch (error) {
      next(error);
    }
  };
}
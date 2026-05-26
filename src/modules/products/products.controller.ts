import { Request, Response, NextFunction } from "express";
import { ProductsService } from "./products.service";
import { createProductSchema, updateProductSchema } from "./products.schema";

export class ProductsController {
  private readonly productsService = new ProductsService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createProductSchema.parse(req.body);
      const product = await this.productsService.create(data);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const filters = {
        categoryId: req.query.categoryId ? String(req.query.categoryId) : undefined,
        minPrice: req.query.minPrice ? parseFloat(String(req.query.minPrice)) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(String(req.query.maxPrice)) : undefined,
        search: req.query.search ? String(req.query.search) : undefined,
      };
      
      const result = await this.productsService.findAll(page, limit, filters);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      const product = await this.productsService.findById(id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      const data = updateProductSchema.parse(req.body);
      await this.productsService.update(id, data);
      res.status(200).json({ success: true, message: "Producto actualizado" });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      await this.productsService.delete(id);
      res.status(200).json({ success: true, message: "Producto eliminado" });
    } catch (error) {
      next(error);
    }
  };
}
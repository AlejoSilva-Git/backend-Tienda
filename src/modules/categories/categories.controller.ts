import { Request, Response, NextFunction } from "express";
import { CategoriesService } from "./categories.service";
import { createCategorySchema, updateCategorySchema } from "./categories.schema";

export class CategoriesController {
  private readonly categoriesService = new CategoriesService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createCategorySchema.parse(req.body);
      const category = await this.categoriesService.create(data);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoriesService.findAll();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await this.categoriesService.findById(Array.isArray(id) ? id[0] : id);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idParam = Array.isArray(id) ? id[0] : id;
      const data = updateCategorySchema.parse(req.body);
      await this.categoriesService.update(idParam, data);
      res.status(200).json({ success: true, message: "Categoría actualizada" });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idParam = Array.isArray(id) ? id[0] : id;
      await this.categoriesService.delete(idParam);
      res.status(200).json({ success: true, message: "Categoría eliminada" });
    } catch (error) {
      next(error);
    }
  };
}
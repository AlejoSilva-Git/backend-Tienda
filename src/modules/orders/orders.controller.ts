import { Request, Response, NextFunction } from "express";
import { OrdersService } from "./orders.service";
import { createOrderSchema } from "./orders.schema";

export class OrdersController {
  private readonly ordersService = new OrdersService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createOrderSchema.parse(req.body);
      const userId = (req as any).user?.sub;
      const order = await this.ordersService.create(data, userId);
      res.status(201).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      const userId = (req as any).user?.sub;
      const isAdmin = (req as any).user?.role === "admin";
      const order = await this.ordersService.findById(id, userId, isAdmin);
      res.status(200).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  findByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.sub;
      const orders = await this.ordersService.findByUser(userId);
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(String(req.query.page)) : 1;
      const limit = req.query.limit ? parseInt(String(req.query.limit)) : 10;
      const result = await this.ordersService.findAll(page, limit);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      const { status } = req.body;
      await this.ordersService.updateStatus(id, status);
      res.status(200).json({ success: true, message: "Estado actualizado" });
    } catch (error) {
      next(error);
    }
  };
}
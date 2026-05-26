import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authMiddleware, adminMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createOrderSchema } from "./orders.schema";

const router = Router();
const ordersController = new OrdersController();

router.post("/", authMiddleware, validate(createOrderSchema), ordersController.create);
router.get("/my-orders", authMiddleware, ordersController.findByUser);
router.get("/:id", authMiddleware, ordersController.findById);
router.get("/", authMiddleware, adminMiddleware, ordersController.findAll);
router.put("/:id/status", authMiddleware, adminMiddleware, ordersController.updateStatus);

export default router;
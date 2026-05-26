import { Router } from "express";
import { ProductsController } from "./products.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./products.schema";

const router = Router();
const productsController = new ProductsController();

router.get("/", productsController.findAll);
router.get("/:id", productsController.findById);
router.post("/", authMiddleware, validate(createProductSchema), productsController.create);
router.put("/:id", authMiddleware, validate(updateProductSchema), productsController.update);
router.delete("/:id", authMiddleware, productsController.delete);

export default router;
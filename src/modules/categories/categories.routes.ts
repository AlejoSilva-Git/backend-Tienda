import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "./categories.schema";

const router = Router();
const categoriesController = new CategoriesController();

router.get("/", categoriesController.findAll);
router.get("/:id", categoriesController.findById);
router.post("/", authMiddleware, validate(createCategorySchema), categoriesController.create);
router.put("/:id", authMiddleware, validate(updateCategorySchema), categoriesController.update);
router.delete("/:id", authMiddleware, categoriesController.delete);

export default router;
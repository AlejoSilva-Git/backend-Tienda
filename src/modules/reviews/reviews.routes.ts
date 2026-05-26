import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createReviewSchema } from "./reviews.schema";

const router = Router();
const reviewsController = new ReviewsController();

router.get("/product/:productId", reviewsController.findByProduct);
router.post("/product/:productId", authMiddleware, validate(createReviewSchema), reviewsController.create);
router.delete("/:id", authMiddleware, reviewsController.delete);

export default router;
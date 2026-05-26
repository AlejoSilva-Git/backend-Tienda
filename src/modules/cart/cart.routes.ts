import { Router } from "express";
import { CartController } from "./cart.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { addToCartSchema, updateCartItemSchema } from "./cart.schema";

const router = Router();
const cartController = new CartController();

router.get("/", authMiddleware, cartController.getCart);
router.post("/", authMiddleware, validate(addToCartSchema), cartController.addToCart);
router.put("/:productId/:size/:color", authMiddleware, validate(updateCartItemSchema), cartController.updateQuantity);
router.delete("/:productId/:size/:color", authMiddleware, cartController.removeFromCart);
router.delete("/", authMiddleware, cartController.clearCart);

export default router;
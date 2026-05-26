import { Request, Response, NextFunction } from "express";
import { CartService } from "./cart.service";
import { addToCartSchema, updateCartItemSchema } from "./cart.schema";

export class CartController {
  private readonly cartService = new CartService();

  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.sub;
      const cart = await this.cartService.getCart(userId);
      res.status(200).json({ success: true, data: cart || { items: [], total: 0 } });
    } catch (error) {
      next(error);
    }
  };

  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = addToCartSchema.parse(req.body);
      const userId = (req as any).user?.sub;
      const cart = await this.cartService.addToCart(userId, data);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, size, color } = req.params;
      const { quantity } = updateCartItemSchema.parse(req.body);
      const userId = (req as any).user?.sub;
      const cart = await this.cartService.updateQuantity(userId, String(productId), String(size), String(color), quantity);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, size, color } = req.params;
      const userId = (req as any).user?.sub;
      const cart = await this.cartService.removeFromCart(
        userId,
        String(productId),
        String(size),
        String(color)
      );
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.sub;
      await this.cartService.clearCart(userId);
      res.status(200).json({ success: true, message: "Carrito vaciado" });
    } catch (error) {
      next(error);
    }
  };
}

// ✅ Exportación por defecto también (por si acaso)
export default CartController;
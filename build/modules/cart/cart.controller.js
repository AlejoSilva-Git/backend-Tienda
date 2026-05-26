"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_service_1 = require("./cart.service");
const cart_schema_1 = require("./cart.schema");
class CartController {
    constructor() {
        this.cartService = new cart_service_1.CartService();
        this.getCart = async (req, res, next) => {
            try {
                const userId = req.user?.sub;
                const cart = await this.cartService.getCart(userId);
                res.status(200).json({ success: true, data: cart || { items: [], total: 0 } });
            }
            catch (error) {
                next(error);
            }
        };
        this.addToCart = async (req, res, next) => {
            try {
                const data = cart_schema_1.addToCartSchema.parse(req.body);
                const userId = req.user?.sub;
                const cart = await this.cartService.addToCart(userId, data);
                res.status(200).json({ success: true, data: cart });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateQuantity = async (req, res, next) => {
            try {
                const { productId, size, color } = req.params;
                const { quantity } = cart_schema_1.updateCartItemSchema.parse(req.body);
                const userId = req.user?.sub;
                const cart = await this.cartService.updateQuantity(userId, String(productId), String(size), String(color), quantity);
                res.status(200).json({ success: true, data: cart });
            }
            catch (error) {
                next(error);
            }
        };
        this.removeFromCart = async (req, res, next) => {
            try {
                const { productId, size, color } = req.params;
                const userId = req.user?.sub;
                const cart = await this.cartService.removeFromCart(userId, String(productId), String(size), String(color));
                res.status(200).json({ success: true, data: cart });
            }
            catch (error) {
                next(error);
            }
        };
        this.clearCart = async (req, res, next) => {
            try {
                const userId = req.user?.sub;
                await this.cartService.clearCart(userId);
                res.status(200).json({ success: true, message: "Carrito vaciado" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CartController = CartController;
// ✅ Exportación por defecto también (por si acaso)
exports.default = CartController;

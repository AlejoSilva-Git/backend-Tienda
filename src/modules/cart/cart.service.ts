import { ObjectId } from "mongodb";
import { CartRepository } from "./cart.repository";
import { ProductsRepository } from "../products/products.repository";
import { Cart, CartItem } from "./cart.model";
import { AddToCartDto } from "./cart.schema";

export class CartService {
  private readonly repository = new CartRepository();
  private readonly productsRepository = new ProductsRepository();

  async getCart(userId: string): Promise<Cart | null> {
    return await this.repository.findByUser(userId);
  }

  async addToCart(userId: string, data: AddToCartDto): Promise<Cart> {
    const product = await this.productsRepository.findById(data.productId);
    if (!product) throw new Error("Producto no encontrado");
    
    let cart = await this.repository.findByUser(userId);
    
    const newItem: CartItem = {
      productId: new ObjectId(data.productId),
      name: product.name,
      size: data.size,
      color: data.color,
      quantity: data.quantity,
      price: product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : "",
    };
    
    if (!cart) {
      cart = {
        userId: new ObjectId(userId),
        items: [newItem],
        total: newItem.price * newItem.quantity,
        updatedAt: new Date(),
      };
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item: CartItem) => item.productId.toString() === data.productId &&
                item.size === data.size &&
                item.color === data.color
      );
      
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += data.quantity;
      } else {
        cart.items.push(newItem);
      }
      
      cart.total = cart.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      cart.updatedAt = new Date();
    }
    
    return await this.repository.createOrUpdate(cart);
  }

  async updateQuantity(userId: string, productId: string, size: string, color: string, quantity: number): Promise<Cart> {
    const cart = await this.repository.findByUser(userId);
    if (!cart) throw new Error("Carrito no encontrado");
    
    const itemIndex = cart.items.findIndex(
      (item: CartItem) => item.productId.toString() === productId && item.size === size && item.color === color
    );
    
    if (itemIndex === -1) throw new Error("Producto no encontrado en el carrito");
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.total = cart.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    cart.updatedAt = new Date();
    
    return await this.repository.createOrUpdate(cart);
  }

  async removeFromCart(userId: string, productId: string, size: string, color: string): Promise<Cart> {
    return await this.updateQuantity(userId, productId, size, color, 0);
  }

  async clearCart(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }
}
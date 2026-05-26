import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Cart, CartItem } from "./cart.model";

export class CartRepository {
  private collection() {
    return getDb().collection<Cart>("carts");
  }

  async findByUser(userId: string): Promise<Cart | null> {
    return await this.collection().findOne({ userId: new ObjectId(userId) });
  }

  async createOrUpdate(cart: Cart): Promise<Cart> {
    const result = await this.collection().findOneAndUpdate(
      { userId: cart.userId },
      { $set: cart },
      { upsert: true, returnDocument: "after" }
    );
    return result as Cart;
  }

  async delete(userId: string): Promise<void> {
    await this.collection().deleteOne({ userId: new ObjectId(userId) });
  }
}
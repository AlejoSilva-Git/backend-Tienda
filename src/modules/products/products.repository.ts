import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Product } from "./products.model";

export class ProductsRepository {
  private collection() {
    return getDb().collection<Product>("products");
  }

  async create(data: Product): Promise<Product> {
    const result = await this.collection().insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findAll(filter: any = {}, page: number = 1, limit: number = 10): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.collection().find({ isActive: true, ...filter }).skip(skip).limit(limit).toArray(),
      this.collection().countDocuments({ isActive: true, ...filter })
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<Product | null> {
    return await this.collection().findOne({ _id: new ObjectId(id), isActive: true });
  }

  async update(id: string, data: Partial<Product>): Promise<void> {
    // ✅ Convertir Map a objeto plano para MongoDB
    const updateData: any = { ...data, updatedAt: new Date() };
    if (data.stock && data.stock instanceof Map) {
      updateData.stock = Object.fromEntries(data.stock);
    }
    
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  }

  async delete(id: string): Promise<void> {
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } }
    );
  }

  async updateStock(id: string, size: string, color: string, quantity: number): Promise<void> {
    const stockKey = `${size}-${color}`;
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $inc: { [`stock.${stockKey}`]: -quantity } }
    );
  }
}
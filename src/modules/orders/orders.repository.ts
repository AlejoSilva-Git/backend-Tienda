import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Order } from "./orders.model";

export class OrdersRepository {
  private collection() {
    return getDb().collection<Order>("orders");
  }

  async create(data: Order): Promise<Order> {
    const result = await this.collection().insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findById(id: string): Promise<Order | null> {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await this.collection()
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Order[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.collection().find().skip(skip).limit(limit).sort({ createdAt: -1 }).toArray(),
      this.collection().countDocuments()
    ]);
    return { data, total };
  }

  async updateStatus(id: string, status: Order["status"]): Promise<void> {
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
  }
}
import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Review } from "./reviews.model";

export class ReviewsRepository {
  private collection() {
    return getDb().collection<Review>("reviews");
  }

  async create(data: Review): Promise<Review> {
    const result = await this.collection().insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return await this.collection()
      .find({ productId: new ObjectId(productId), isActive: true })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async findById(id: string): Promise<Review | null> {
    return await this.collection().findOne({ _id: new ObjectId(id), isActive: true });
  }

  async findByUserAndProduct(userId: string, productId: string): Promise<Review | null> {
    return await this.collection().findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      isActive: true
    });
  }

  async delete(id: string): Promise<void> {
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } }
    );
  }

  async getAverageRating(productId: string): Promise<number> {
    const result = await this.collection().aggregate([
      { $match: { productId: new ObjectId(productId), isActive: true } },
      { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]).toArray();
    return result[0]?.avgRating || 0;
  }
}
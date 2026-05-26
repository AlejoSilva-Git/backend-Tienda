"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../../config/database");
class CartRepository {
    collection() {
        return (0, database_1.getDb)().collection("carts");
    }
    async findByUser(userId) {
        return await this.collection().findOne({ userId: new mongodb_1.ObjectId(userId) });
    }
    async createOrUpdate(cart) {
        const result = await this.collection().findOneAndUpdate({ userId: cart.userId }, { $set: cart }, { upsert: true, returnDocument: "after" });
        return result;
    }
    async delete(userId) {
        await this.collection().deleteOne({ userId: new mongodb_1.ObjectId(userId) });
    }
}
exports.CartRepository = CartRepository;

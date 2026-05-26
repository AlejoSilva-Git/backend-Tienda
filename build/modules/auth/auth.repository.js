"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const database_1 = require("../../config/database");
class AuthRepository {
    collection() {
        return (0, database_1.getDb)().collection('users');
    }
    async findEmail(email) {
        return this.collection().findOne({ email });
    }
    async create(user) {
        const result = await this.collection().insertOne(user);
        return { _id: result.insertedId, ...user };
    }
}
exports.AuthRepository = AuthRepository;

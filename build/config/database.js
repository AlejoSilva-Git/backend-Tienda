"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const env_1 = require("./env");
let client;
let db;
const connectDB = async () => {
    try {
        console.log(`🔌 Conectando a MongoDB: ${env_1.env.mongoUri}`);
        client = new mongodb_1.MongoClient(env_1.env.mongoUri);
        await client.connect();
        db = client.db(env_1.env.mongoDbName);
        console.log('✅ MongoDB conectado exitosamente');
        console.log(`📚 Base de datos: ${env_1.env.mongoDbName}`);
    }
    catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        throw error;
    }
};
exports.connectDB = connectDB;
const getDb = () => {
    if (!db) {
        throw new Error('❌ La base de datos no ha sido inicializada. Llama a connectDB() primero.');
    }
    return db;
};
exports.getDb = getDb;

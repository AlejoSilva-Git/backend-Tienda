import { MongoClient, Db } from "mongodb";
import { env } from "./env";

let client: MongoClient;
let db: Db;

export const connectDB = async (): Promise<void> => {
    try {
        console.log(`🔌 Conectando a MongoDB: ${env.mongoUri}`);
        
        client = new MongoClient(env.mongoUri);
        await client.connect();
        db = client.db(env.mongoDbName);
        console.log('✅ MongoDB conectado exitosamente');
        console.log(`📚 Base de datos: ${env.mongoDbName}`);
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        throw error;
    }
}

export const getDb = (): Db => {
    if (!db) {
        throw new Error('❌ La base de datos no ha sido inicializada. Llama a connectDB() primero.');
    }
    return db;
}
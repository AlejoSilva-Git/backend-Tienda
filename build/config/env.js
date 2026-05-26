"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// ✅ Cargar variables de entorno
dotenv_1.default.config();
exports.env = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://Alejo:<db_password>@cluster0.jmc67vm.mongodb.net://atlas-sql-69bca21a2396cf9a97602d72-vjcy3r.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin',
    mongoDbName: process.env.MONGO_DB_NAME || 'tienda_ropa',
    jwtSecret: process.env.JWT_SECRET || 'mi_clave_secreta_por_defecto',
    jwtExpiration: process.env.JWT_EXPIRATION || '10h'
};
// ✅ Validar que MONGO_URI existe
if (!process.env.MONGO_URI && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️  MONGO_URI no está definida en .env, usando valor por defecto: mongodb://localhost:27017/tienda_ropa');
}

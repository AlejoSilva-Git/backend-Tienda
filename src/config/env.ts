import dotenv from 'dotenv';

// ✅ Cargar variables de entorno
dotenv.config();

export const env = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://Alejo:<db_password>@cluster0.jmc67vm.mongodb.net://atlas-sql-69bca21a2396cf9a97602d72-vjcy3r.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin',
    mongoDbName: process.env.MONGO_DB_NAME || 'tienda_ropa',
    jwtSecret: process.env.JWT_SECRET || 'mi_clave_secreta_por_defecto',
    jwtExpiration: process.env.JWT_EXPIRATION || '10h'
}

// ✅ Validar que MONGO_URI existe
if (!process.env.MONGO_URI && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️  MONGO_URI no está definida en .env, usando valor por defecto: mongodb://localhost:27017/tienda_ropa');
}
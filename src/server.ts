import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const bootstrap = async () => {
  try {
    await connectDB();
    
    app.listen(env.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${env.port}`);
      console.log(`📚 Documentación: http://localhost:${env.port}/api/v1/docs`);
      console.log(`✅ API de Tienda de Ropa funcionando correctamente`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

bootstrap();
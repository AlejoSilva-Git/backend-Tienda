import { connectDB, getDb } from "./config/database";
import { ObjectId } from "mongodb";

const seed = async () => {
  await connectDB();
  const db = getDb();

  // Limpiar colecciones existentes
  await db.collection("categories").deleteMany({});
  await db.collection("products").deleteMany({});

  // Crear categorías
  const categories = [
    { name: "Camisas", description: "Camisas de vestir y casuales", image: "https://example.com/camisas.jpg", isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { name: "Pantalones", description: "Jeans, chupines, cargo", image: "https://example.com/pantalones.jpg", isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { name: "Vestidos", description: "Vestidos largos y cortos", image: "https://example.com/vestidos.jpg", isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { name: "Accesorios", description: "Bolsos, cinturones, joyas", image: "https://example.com/accesorios.jpg", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  ];

  const categoryResult = await db.collection("categories").insertMany(categories);
  const categoryIds = Object.values(categoryResult.insertedIds);

  // Crear productos
  const products = [
    {
      name: "Camisa Blanca Slim Fit",
      description: "Camisa blanca de algodón, corte slim fit",
      price: 39.99,
      categoryId: categoryIds[0],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blanco", "Negro", "Azul"],
      stock: new Map([["S-Blanco", 10], ["M-Blanco", 15], ["L-Blanco", 8]]),
      images: ["https://example.com/camisa-blanca.jpg"],
      rating: 0,
      numReviews: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Jeans Azul Claro",
      description: "Jeans ajustados de mezclilla azul claro",
      price: 59.99,
      categoryId: categoryIds[1],
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Azul Claro", "Azul Oscuro", "Negro"],
      stock: new Map([["28-Azul Claro", 5], ["30-Azul Claro", 8], ["32-Azul Claro", 12]]),
      images: ["https://example.com/jeans-azul.jpg"],
      rating: 0,
      numReviews: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const product of products) {
    await db.collection("products").insertOne(product);
  }

  console.log("✅ Seed completado");
  process.exit(0);
};

seed().catch(console.error);
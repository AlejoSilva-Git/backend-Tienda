import { ObjectId } from "mongodb";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.model";
import { CreateProductDto } from "./products.schema";

export class ProductsService {
  private readonly repository = new ProductsRepository();

  async create(data: CreateProductDto): Promise<Product> {
    const now = new Date();
    
    // ✅ Asegurar que stock es un objeto, no un Map
    const stockObject: Record<string, number> = {};
    if (data.stock) {
      Object.entries(data.stock).forEach(([key, value]) => {
        stockObject[key] = value;
      });
    }
    
    const product: Product = {
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: new ObjectId(data.categoryId),
      sizes: data.sizes,
      colors: data.colors,
      stock: stockObject,  // ✅ Usar objeto, no Map
      images: data.images || [],
      rating: 0,
      numReviews: 0,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    return await this.repository.create(product);
  }

  async findAll(page: number = 1, limit: number = 10, filters: any = {}) {
    const filter: any = {};
    if (filters.categoryId) filter.categoryId = new ObjectId(filters.categoryId);
    if (filters.minPrice) filter.price = { ...filter.price, $gte: filters.minPrice };
    if (filters.maxPrice) filter.price = { ...filter.price, $lte: filters.maxPrice };
    if (filters.search) {
      filter.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } }
      ];
    }
    return await this.repository.findAll(filter, page, limit);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async update(id: string, data: Partial<CreateProductDto>): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    
    // ✅ Si viene stock, asegurar que es objeto
    const updateData: any = { ...data };
    if (data.stock) {
      const stockObject: Record<string, number> = {};
      Object.entries(data.stock).forEach(([key, value]) => {
        stockObject[key] = value;
      });
      updateData.stock = stockObject;
    }
    
    await this.repository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    await this.repository.delete(id);
  }
}
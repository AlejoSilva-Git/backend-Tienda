import { ObjectId } from "mongodb";
import { OrdersRepository } from "./orders.repository";
import { ProductsRepository } from "../products/products.repository";
import { Order, OrderItem, OrderStatus } from "./orders.model";
import { CreateOrderDto } from "./orders.schema";

export class OrdersService {
  private readonly repository = new OrdersRepository();
  private readonly productsRepository = new ProductsRepository();

  async create(data: CreateOrderDto, userId: string): Promise<Order> {
    const now = new Date();
    
    // Verificar stock y obtener nombres de productos
    const items: OrderItem[] = [];
    let total = 0;
    
    for (const item of data.items) {
      const product = await this.productsRepository.findById(item.productId);
      if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
      
      const stockKey = `${item.size}-${item.color}`;
      const stockObj = product.stock instanceof Map 
        ? Object.fromEntries(product.stock) 
        : product.stock;
      const stock = (stockObj as any)[stockKey] || 0;
      
      if (stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name} (${item.size}-${item.color})`);
      }
      
      items.push({
        productId: new ObjectId(item.productId),
        name: product.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      });
      total += item.price * item.quantity;
    }
    
    // ✅ Crear orden con status tipado
    const order: Order = {
      userId: new ObjectId(userId),
      items,
      total,
      status: "pending", // ✅ Usar valor válido del tipo OrderStatus
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      createdAt: now,
      updatedAt: now,
    };
    
    const createdOrder = await this.repository.create(order);
    
    // Actualizar stock
    for (const item of data.items) {
      await this.productsRepository.updateStock(item.productId, item.size, item.color, item.quantity);
    }
    
    return createdOrder;
  }

  async findById(id: string, userId: string, isAdmin: boolean = false): Promise<Order> {
    const order = await this.repository.findById(id);
    if (!order) throw new Error("Orden no encontrada");
    if (!isAdmin && order.userId.toString() !== userId) {
      throw new Error("No autorizado para ver esta orden");
    }
    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await this.repository.findByUser(userId);
  }

  async findAll(page: number, limit: number) {
    return await this.repository.findAll(page, limit);
  }

  // ✅ Asegurar que status sea del tipo OrderStatus
  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new Error("Orden no encontrada");
    
    // Validar que el status sea válido
    const validStatuses: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Estado inválido: ${status}. Debe ser uno de: ${validStatuses.join(", ")}`);
    }
    
    await this.repository.updateStatus(id, status);
  }
}
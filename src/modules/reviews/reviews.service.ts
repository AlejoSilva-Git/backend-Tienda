import { ObjectId } from "mongodb";
import { ReviewsRepository } from "./reviews.repository";
import { ProductsRepository } from "../products/products.repository";
import { OrdersRepository } from "../orders/orders.repository";
import { Review } from "./reviews.model";
import { CreateReviewDto } from "./reviews.schema";

export class ReviewsService {
  private readonly repository = new ReviewsRepository();
  private readonly productsRepository = new ProductsRepository();
  private readonly ordersRepository = new OrdersRepository();

  async create(data: CreateReviewDto, productId: string, userId: string): Promise<Review> {
    // Verificar si el usuario compró el producto
    const userOrders = await this.ordersRepository.findByUser(userId);
    const hasPurchased = userOrders.some(order =>
      order.items.some(item => item.productId.toString() === productId) &&
      order.status === "delivered"
    );
    
    if (!hasPurchased) {
      throw new Error("Debes comprar el producto para poder reseñarlo");
    }
    
    // Verificar si ya reseñó
    const existingReview = await this.repository.findByUserAndProduct(userId, productId);
    if (existingReview) {
      throw new Error("Ya has reseñado este producto");
    }
    
    const now = new Date();
    const review: Review = {
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
      rating: data.rating,
      comment: data.comment,
      images: data.images || [],
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    
    const createdReview = await this.repository.create(review);
    
    // Actualizar rating promedio del producto
    const avgRating = await this.repository.getAverageRating(productId);
    const reviews = await this.repository.findByProduct(productId);
    await this.productsRepository.update(productId, {
      rating: avgRating,
      numReviews: reviews.length
    });
    
    return createdReview;
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return await this.repository.findByProduct(productId);
  }

  async delete(id: string, userId: string, isAdmin: boolean = false): Promise<void> {
    const review = await this.repository.findById(id);
    if (!review) throw new Error("Reseña no encontrada");
    
    if (!isAdmin && review.userId.toString() !== userId) {
      throw new Error("No autorizado para eliminar esta reseña");
    }
    
    const productId = review.productId.toString();
    await this.repository.delete(id);
    
    // Recalcular rating después de eliminar
    const avgRating = await this.repository.getAverageRating(productId);
    const reviews = await this.repository.findByProduct(productId);
    await this.productsRepository.update(productId, {
      rating: avgRating,
      numReviews: reviews.length
    });
  }
}
import { CategoriesRepository } from "./categories.repository";
import { Category } from "./categories.model";
import { CreateCategoryDto } from "./categories.schema";

export class CategoriesService {
  private readonly repository = new CategoriesRepository();

  async create(data: CreateCategoryDto): Promise<Category> {
    const now = new Date();
    const category: Category = {
      name: data.name,
      description: data.description || "",
      image: data.image || "",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    return await this.repository.create(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findById(id);
    if (!category) throw new Error("Categoría no encontrada");
    return category;
  }

  async update(id: string, data: Partial<CreateCategoryDto>): Promise<void> {
    const category = await this.repository.findById(id);
    if (!category) throw new Error("Categoría no encontrada");
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const category = await this.repository.findById(id);
    if (!category) throw new Error("Categoría no encontrada");
    await this.repository.delete(id);
  }
}
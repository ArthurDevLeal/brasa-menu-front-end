import { Product } from "./product-type";

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  description: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface createCategoryProps {
  restaurantId: string;
  name: string;
  description?: string;
  orderIndex: number;
}

export interface createCategoryPropsReturn {
  message: string;
  data: Category;
}

export interface updateCategoryProps {
  restaurantId: string;
  categoryId: string;
  name?: string;
  description?: string;
  orderIndex?: number;
}

export interface updateCategoryPropsReturn {
  message: string;
  data: Category;
}

export interface getCategoryByIdProps {
  categoryId: string;
}

export interface getCategoryByIdPropsReturn {
  data: Category;
}

export interface getRestaurantCategoriesProps {
  restaurantId: string;
}

export interface getRestaurantCategoriesPropsReturn {
  data: Category[];
}

export interface CategoryWithProductCount extends Category {
  productCount: number;
  products: Product[];
  totalViews: number;
}

export interface getRestaurantCategoriesWithProductCountProps {
  restaurantId: string;
}

export interface getRestaurantCategoriesWithProductCountPropsReturn {
  data: CategoryWithProductCount[];
}

export interface toggleCategoryStatusProps {
  restaurantId: string;
  categoryId: string;
}

export interface toggleCategoryStatusPropsReturn {
  message: string;
  data: Category;
}

export interface deleteCategoryProps {
  restaurantId: string;
  categoryId: string;
}

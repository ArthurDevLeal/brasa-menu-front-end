export interface Product {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface createProductProps {
  restaurantId: string;
  categoryId: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface createProductPropsReturn {
  message: string;
  data: Product;
}

export interface updateProductProps {
  restaurantId: string;
  productId: string;
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export interface updateProductPropsReturn {
  message: string;
  data: Product;
}

export interface getProductByIdProps {
  productId: string;
}

export interface getProductByIdPropsReturn {
  data: Product;
}

export interface getCategoryProductsProps {
  categoryId: string;
}

export interface getCategoryProductsPropsReturn {
  data: Product[];
}

export interface getRestaurantProductsProps {
  restaurantId: string;
}

export interface getRestaurantProductsPropsReturn {
  data: ProductWithRelations[];
}

export interface toggleProductStatusProps {
  restaurantId: string;
  productId: string;
}

export interface toggleProductStatusPropsReturn {
  message: string;
  data: Product;
}

export interface deleteProductProps {
  restaurantId: string;
  productId: string;
}

export interface VariantOption {
  id: string;
  variantCategoryId: string;
  name: string;
  priceModifier: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantCategoryWithVariants {
  id: string;
  productId: string;
  name: string;
  isRequired: boolean;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  variants: VariantOption[];
}

export interface AddOnOption {
  id: string;
  addOnCategoryId: string;
  name: string;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddOnCategoryWithAddOns {
  id: string;
  productId: string;
  name: string;
  isRequired: boolean;
  minSelections: number;
  maxSelections: number | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  addOns: AddOnOption[];
}

export interface ProductMetricData {
  id: string;
  productId: string;
  restaurantId: string;
  views: number;
  addedToCart: number;
  conversionRate: number;
  lastViewedAt: Date | null;
  lastAddedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategorySimple {
  id: string;
  restaurantId: string;
  name: string;
  description: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithRelations extends Product {
  category: CategorySimple;
  variantCategories: VariantCategoryWithVariants[];
  addOnCategories: AddOnCategoryWithAddOns[];
  metrics: ProductMetricData | null;
}

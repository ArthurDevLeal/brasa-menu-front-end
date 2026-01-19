import { Product } from "./product-type";

export interface ProductMetric {
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

export interface getProductMetricsProps {
  productId: string;
}

export interface getProductMetricsPropsReturn {
  data: ProductMetric;
}

export interface getRestaurantMetricsProps {
  restaurantId: string;
}

export interface getRestaurantMetricsPropsReturn {
  data: ProductMetric[];
}

export interface TopProductByViews {
  id: string;
  views: number;
  addedToCart: number;
  conversionRate: number;
  product:Product
}

export interface getTopProductsByViewsProps {
  restaurantId: string;
  limit?: number;
}

export interface getTopProductsByViewsPropsReturn {
  data: TopProductByViews[];
}

export interface getTopProductsByAddedToCartProps {
  restaurantId: string;
  limit?: number;
}

export interface getTopProductsByAddedToCartPropsReturn {
  data: TopProductByViews[];
}

export interface recordProductViewProps {
  productId: string;
  restaurantId: string;
}

export interface recordProductViewPropsReturn {
  message: string;
  data: ProductMetric;
}

export interface recordAddToCartProps {
  productId: string;
  restaurantId: string;
}

export interface recordAddToCartPropsReturn {
  message: string;
  data: ProductMetric;
}

export interface getConversionRateProps {
  productId: string;
}

export interface getConversionRatePropsReturn {
  data: number;
}

export interface MetricsOverview {
  totalProducts: number;
  totalViews: number;
  totalAddedToCart: number;
  averageConversionRate: number;
  topProductByViews: TopProductByViews | null;
  topProductByAddedToCart: TopProductByViews | null;
}

export interface getRestaurantMetricsOverviewProps {
  restaurantId: string;
}

export interface getRestaurantMetricsOverviewPropsReturn {
  data: MetricsOverview;
}
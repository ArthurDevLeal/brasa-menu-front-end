export interface createVariantCategoryProps {
  restaurantId: string;
  productId: string;
  name: string;
  orderIndex?: number;
  isRequired?: boolean;
}

export interface createVariantCategoryPropsReturn {
  message: string;
  data: {
    id: string;
    productId: string;
    name: string;
    orderIndex: number;
    isRequired: boolean;
    isActive: boolean;
    variants: any[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface updateVariantCategoryProps {
  restaurantId: string;
  productId: string;
  variantCategoryId: string;
  name?: string;
  orderIndex?: number;
  isRequired?: boolean;
}

export interface updateVariantCategoryPropsReturn {
  message: string;
  data: {
    id: string;
    productId: string;
    name: string;
    orderIndex: number;
    isRequired: boolean;
    isActive: boolean;
    variants: any[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface deleteVariantCategoryProps {
  restaurantId: string;
  productId: string;
  variantCategoryId: string;
}

// ============================================================================
// VARIANT TYPES
// ============================================================================

export interface createVariantProps {
  restaurantId: string;
  productId: string;
  variantCategoryId: string;
  name: string;
  priceModifier: number;
}

export interface createVariantPropsReturn {
  message: string;
  data: {
    id: string;
    variantCategoryId: string;
    name: string;
    priceModifier: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface updateVariantProps {
  restaurantId: string;
  productId: string;
  variantCategoryId: string;
  variantId: string;
  name?: string;
  priceModifier?: number;
}

export interface updateVariantPropsReturn {
  message: string;
  data: {
    id: string;
    variantCategoryId: string;
    name: string;
    priceModifier: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface deleteVariantProps {
  restaurantId: string;
  productId: string;
  variantCategoryId: string;
  variantId: string;
}
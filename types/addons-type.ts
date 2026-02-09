export interface createAddOnCategoryProps {
  restaurantId: string;
  productId: string;
  name: string;
  orderIndex?: number;
  isRequired?: boolean;
  minSelections?: number;
  maxSelections?: number | null;
}

export interface createAddOnCategoryPropsReturn {
  message: string;
  data: {
    id: string;
    productId: string;
    name: string;
    isRequired: boolean;
    minSelections: number;
    maxSelections: number | null;
    orderIndex: number;
    isActive: boolean;
    addOns: any[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface updateAddOnCategoryProps {
  restaurantId: string;
  productId: string;
  addOnCategoryId: string;
  name?: string;
  orderIndex?: number;
  isRequired?: boolean;
  minSelections?: number;
  maxSelections?: number | null;
}

export interface updateAddOnCategoryPropsReturn {
  message: string;
  data: {
    id: string;
    productId: string;
    name: string;
    isRequired: boolean;
    minSelections: number;
    maxSelections: number | null;
    orderIndex: number;
    isActive: boolean;
    addOns: any[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface deleteAddOnCategoryProps {
  restaurantId: string;
  productId: string;
  addOnCategoryId: string;
}

// ============================================================================
// ADD-ON TYPES
// ============================================================================

export interface createAddOnProps {
  restaurantId: string;
  productId: string;
  addOnCategoryId: string;
  name: string;
  price: number;
}

export interface createAddOnPropsReturn {
  message: string;
  data: {
    id: string;
    addOnCategoryId: string;
    name: string;
    price: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface updateAddOnProps {
  restaurantId: string;
  productId: string;
  addOnCategoryId: string;
  addOnId: string;
  name?: string;
  price?: number;
}

export interface updateAddOnPropsReturn {
  message: string;
  data: {
    id: string;
    addOnCategoryId: string;
    name: string;
    price: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface deleteAddOnProps {
  restaurantId: string;
  productId: string;
  addOnCategoryId: string;
  addOnId: string;
}
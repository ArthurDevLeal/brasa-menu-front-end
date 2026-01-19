import apiPublic from "@/api/api-public";
import apiToken from "@/api/api-token";
import {
  createProductProps,
  createProductPropsReturn,
  deleteProductProps,
  getCategoryProductsProps,
  getCategoryProductsPropsReturn,
  getProductByIdProps,
  getProductByIdPropsReturn,
  getRestaurantProductsProps,
  getRestaurantProductsPropsReturn,
  ProductWithRelations,
  toggleProductStatusProps,
  toggleProductStatusPropsReturn,
  updateProductProps,
  updateProductPropsReturn,
} from "@/types/product-type";

export async function createProduct({
  restaurantId,
  categoryId,
  name,
  price,
  description,
  imageUrl,
}: createProductProps): Promise<createProductPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!categoryId || categoryId.trim().length === 0) {
    throw new Error("Category ID is required");
  }

  if (!name || name.trim().length < 2) {
    throw new Error("Product name must be at least 2 characters long");
  }

  if (price === undefined || price === null || price < 0) {
    throw new Error("Product price must be a valid positive number");
  }

  try {
    const res = await apiToken.post(`/restaurants/${restaurantId}/categories/${categoryId}/products`, {
      name: name.trim(),
      price,
      description: description?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
    });

    const data: createProductPropsReturn = res.data;

    if (!data.data || !data.data.id) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function updateProduct({
  restaurantId,
  productId,
  name,
  price,
  description,
  imageUrl,
}: updateProductProps): Promise<updateProductPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Product name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (price !== undefined) {
    if (price < 0) {
      throw new Error("Product price must be a valid positive number");
    }
    updateData.price = price;
  }

  if (description !== undefined) {
    updateData.description = description?.trim() || null;
  }

  if (imageUrl !== undefined) {
    updateData.imageUrl = imageUrl?.trim() || null;
  }

  try {
    const res = await apiToken.patch(`/restaurants/${restaurantId}/products/${productId}`, updateData);

    const data: updateProductPropsReturn = res.data;

    if (!data.data || !data.data.id) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getProductById({ productId }: getProductByIdProps): Promise<getProductByIdPropsReturn> {
  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  try {
    const res = await apiPublic.get(`/products/${productId}`);

    const data: getProductByIdPropsReturn = res.data;

    if (!data.data || !data.data.id) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getCategoryProducts({
  categoryId,
}: getCategoryProductsProps): Promise<getCategoryProductsPropsReturn> {
  if (!categoryId || categoryId.trim().length === 0) {
    throw new Error("Category ID is required");
  }

  try {
    const res = await apiPublic.get(`/categories/${categoryId}/products`);

    const data: getCategoryProductsPropsReturn = res.data;

    if (!Array.isArray(data.data)) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getRestaurantProducts({
  restaurantId,
}: getRestaurantProductsProps): Promise<getRestaurantProductsPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.get(`/restaurants/${restaurantId}/products`);

    const data: getRestaurantProductsPropsReturn = res.data;

    if (!Array.isArray(data.data)) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function toggleProductStatus({
  restaurantId,
  productId,
}: toggleProductStatusProps): Promise<toggleProductStatusPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  try {
    const res = await apiToken.patch(`/restaurants/${restaurantId}/products/${productId}/toggle-status`);

    const data: toggleProductStatusPropsReturn = res.data;

    if (!data.data || !data.data.id) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function deleteProduct({ restaurantId, productId }: deleteProductProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  try {
    await apiToken.delete(`/restaurants/${restaurantId}/products/${productId}`);
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

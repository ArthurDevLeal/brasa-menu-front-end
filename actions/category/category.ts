import apiPublic from "@/api/api-public";
import apiToken from "@/api/api-token";
import {
  createCategoryProps,
  createCategoryPropsReturn,
  deleteCategoryProps,
  getCategoryByIdProps,
  getCategoryByIdPropsReturn,
  getRestaurantCategoriesProps,
  getRestaurantCategoriesPropsReturn,
  getRestaurantCategoriesWithProductCountProps,
  getRestaurantCategoriesWithProductCountPropsReturn,
  toggleCategoryStatusProps,
  toggleCategoryStatusPropsReturn,
  updateCategoryProps,
  updateCategoryPropsReturn,
} from "@/types/category-type";

export async function createCategory({
  restaurantId,
  name,
  description,
  orderIndex,
}: createCategoryProps): Promise<createCategoryPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!name || name.trim().length < 2) {
    throw new Error("Category name must be at least 2 characters long");
  }

  if (orderIndex === undefined || orderIndex === null || orderIndex < 0) {
    throw new Error("Order index must be a valid positive number");
  }

  try {
    const res = await apiToken.post(`/restaurants/${restaurantId}/categories`, {
      name: name.trim(),
      description: description?.trim() || null,
      orderIndex,
    });

    const data: createCategoryPropsReturn = res.data;

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

export async function updateCategory({
  restaurantId,
  categoryId,
  name,
  description,
  orderIndex,
}: updateCategoryProps): Promise<updateCategoryPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!categoryId || categoryId.trim().length === 0) {
    throw new Error("Category ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Category name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (description !== undefined) {
    updateData.description = description?.trim() || null;
  }

  if (orderIndex !== undefined) {
    if (orderIndex < 0) {
      throw new Error("Order index must be a valid positive number");
    }
    updateData.orderIndex = orderIndex;
  }

  try {
    const res = await apiToken.put(`/restaurants/${restaurantId}/categories/${categoryId}`, updateData);

    const data: updateCategoryPropsReturn = res.data;

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

export async function getCategoryById({
  categoryId,
}: getCategoryByIdProps): Promise<getCategoryByIdPropsReturn> {
  if (!categoryId || categoryId.trim().length === 0) {
    throw new Error("Category ID is required");
  }

  try {
    const res = await apiPublic.get(`/categories/${categoryId}`);

    const data: getCategoryByIdPropsReturn = res.data;

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

export async function getRestaurantCategories({
  restaurantId,
}: getRestaurantCategoriesProps): Promise<getRestaurantCategoriesPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.get(`/restaurants/${restaurantId}/categories`);

    const data: getRestaurantCategoriesPropsReturn = res.data;

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

export async function getRestaurantCategoriesWithProductCount({
  restaurantId,
}: getRestaurantCategoriesWithProductCountProps): Promise<getRestaurantCategoriesWithProductCountPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.get(`/restaurants/${restaurantId}/categories/with-product-count`);

    const data: getRestaurantCategoriesWithProductCountPropsReturn = res.data;

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

export async function toggleCategoryStatus({
  restaurantId,
  categoryId,
}: toggleCategoryStatusProps): Promise<toggleCategoryStatusPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!categoryId || categoryId.trim().length === 0) {
    throw new Error("Category ID is required");
  }

  try {
    const res = await apiToken.patch(`/restaurants/${restaurantId}/categories/${categoryId}/toggle-status`);

    const data: toggleCategoryStatusPropsReturn = res.data;

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

export async function deleteCategory({ restaurantId, categoryId }: deleteCategoryProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!categoryId || categoryId.trim().length === 0) {
    throw new Error("Category ID is required");
  }

  try {
    await apiToken.delete(`/restaurants/${restaurantId}/categories/${categoryId}`);
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

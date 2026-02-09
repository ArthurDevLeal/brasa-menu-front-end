import apiToken from "@/api/api-token";
import {
  createAddOnCategoryProps,
  createAddOnCategoryPropsReturn,
  createAddOnProps,
  createAddOnPropsReturn,
  deleteAddOnCategoryProps,
  deleteAddOnProps,
  updateAddOnCategoryProps,
  updateAddOnCategoryPropsReturn,
  updateAddOnProps,
  updateAddOnPropsReturn,
} from "@/types/addons-type";

export async function createAddOnCategory({
  restaurantId,
  productId,
  name,
  orderIndex,
  isRequired,
  minSelections,
  maxSelections,
}: createAddOnCategoryProps): Promise<createAddOnCategoryPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!name || name.trim().length < 2) {
    throw new Error("Add-on category name must be at least 2 characters long");
  }

  if (minSelections !== undefined && minSelections < 0) {
    throw new Error("Minimum selections must be a non-negative number");
  }

  if (maxSelections !== undefined && maxSelections !== null && maxSelections < 0) {
    throw new Error("Maximum selections must be a non-negative number");
  }

  try {
    const res = await apiToken.post(`/restaurants/${restaurantId}/products/${productId}/addon-categories`, {
      name: name.trim(),
      orderIndex: orderIndex ?? 0,
      isRequired: isRequired ?? false,
      minSelections: minSelections ?? 0,
      maxSelections: maxSelections ?? null,
    });

    const data: createAddOnCategoryPropsReturn = res.data;

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

export async function updateAddOnCategory({
  restaurantId,
  productId,
  addOnCategoryId,
  name,
  orderIndex,
  isRequired,
  minSelections,
  maxSelections,
}: updateAddOnCategoryProps): Promise<updateAddOnCategoryPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!addOnCategoryId || addOnCategoryId.trim().length === 0) {
    throw new Error("Add-on Category ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Add-on category name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (orderIndex !== undefined) {
    updateData.orderIndex = orderIndex;
  }

  if (isRequired !== undefined) {
    updateData.isRequired = isRequired;
  }

  if (minSelections !== undefined) {
    if (minSelections < 0) {
      throw new Error("Minimum selections must be a non-negative number");
    }
    updateData.minSelections = minSelections;
  }

  if (maxSelections !== undefined) {
    if (maxSelections !== null && maxSelections < 0) {
      throw new Error("Maximum selections must be a non-negative number");
    }
    updateData.maxSelections = maxSelections;
  }

  try {
    const res = await apiToken.put(
      `/restaurants/${restaurantId}/products/${productId}/addon-categories/${addOnCategoryId}`,
      updateData,
    );

    const data: updateAddOnCategoryPropsReturn = res.data;

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

export async function deleteAddOnCategory({
  restaurantId,
  productId,
  addOnCategoryId,
}: deleteAddOnCategoryProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!addOnCategoryId || addOnCategoryId.trim().length === 0) {
    throw new Error("Add-on Category ID is required");
  }

  try {
    await apiToken.delete(
      `/restaurants/${restaurantId}/products/${productId}/addon-categories/${addOnCategoryId}`,
    );
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function createAddOn({
  restaurantId,
  productId,
  addOnCategoryId,
  name,
  price,
}: createAddOnProps): Promise<createAddOnPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!addOnCategoryId || addOnCategoryId.trim().length === 0) {
    throw new Error("Add-on Category ID is required");
  }

  if (!name || name.trim().length < 2) {
    throw new Error("Add-on name must be at least 2 characters long");
  }

  if (price === undefined || price === null || price < 0) {
    throw new Error("Add-on price must be a valid non-negative number");
  }

  try {
    const res = await apiToken.post(
      `/restaurants/${restaurantId}/products/${productId}/addon-categories/${addOnCategoryId}/addons`,
      {
        name: name.trim(),
        price,
      },
    );

    const data: createAddOnPropsReturn = res.data;

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

export async function updateAddOn({
  restaurantId,
  productId,
  addOnCategoryId,
  addOnId,
  name,
  price,
}: updateAddOnProps): Promise<updateAddOnPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!addOnCategoryId || addOnCategoryId.trim().length === 0) {
    throw new Error("Add-on Category ID is required");
  }

  if (!addOnId || addOnId.trim().length === 0) {
    throw new Error("Add-on ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Add-on name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (price !== undefined) {
    if (price < 0) {
      throw new Error("Add-on price must be a valid non-negative number");
    }
    updateData.price = price;
  }

  try {
    const res = await apiToken.put(
      `/restaurants/${restaurantId}/products/${productId}/addon-categories/${addOnCategoryId}/addons/${addOnId}`,
      updateData,
    );

    const data: updateAddOnPropsReturn = res.data;

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

export async function deleteAddOn({
  restaurantId,
  productId,
  addOnCategoryId,
  addOnId,
}: deleteAddOnProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!addOnCategoryId || addOnCategoryId.trim().length === 0) {
    throw new Error("Add-on Category ID is required");
  }

  if (!addOnId || addOnId.trim().length === 0) {
    throw new Error("Add-on ID is required");
  }

  try {
    await apiToken.delete(
      `/restaurants/${restaurantId}/products/${productId}/addon-categories/${addOnCategoryId}/addons/${addOnId}`,
    );
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

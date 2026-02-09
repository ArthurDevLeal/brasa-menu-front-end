import apiToken from "@/api/api-token";
import {
  createVariantCategoryProps,
  createVariantCategoryPropsReturn,
  createVariantProps,
  createVariantPropsReturn,
  deleteVariantCategoryProps,
  deleteVariantProps,
  updateVariantCategoryProps,
  updateVariantCategoryPropsReturn,
  updateVariantProps,
  updateVariantPropsReturn,
} from "@/types/variant-type";

export async function createVariantCategory({
  restaurantId,
  productId,
  name,
  orderIndex,
  isRequired,
}: createVariantCategoryProps): Promise<createVariantCategoryPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!name || name.trim().length < 2) {
    throw new Error("Variant category name must be at least 2 characters long");
  }

  try {
    const res = await apiToken.post(
      `/restaurants/${restaurantId}/products/${productId}/variant-categories`,
      {
        name: name.trim(),
        orderIndex: orderIndex ?? 0,
        isRequired: isRequired ?? false,
      }
    );

    const data: createVariantCategoryPropsReturn = res.data;

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

export async function updateVariantCategory({
  restaurantId,
  productId,
  variantCategoryId,
  name,
  orderIndex,
  isRequired,
}: updateVariantCategoryProps): Promise<updateVariantCategoryPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!variantCategoryId || variantCategoryId.trim().length === 0) {
    throw new Error("Variant Category ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Variant category name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (orderIndex !== undefined) {
    updateData.orderIndex = orderIndex;
  }

  if (isRequired !== undefined) {
    updateData.isRequired = isRequired;
  }

  try {
    const res = await apiToken.put(
      `/restaurants/${restaurantId}/products/${productId}/variant-categories/${variantCategoryId}`,
      updateData
    );

    const data: updateVariantCategoryPropsReturn = res.data;

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

export async function deleteVariantCategory({
  restaurantId,
  productId,
  variantCategoryId,
}: deleteVariantCategoryProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!variantCategoryId || variantCategoryId.trim().length === 0) {
    throw new Error("Variant Category ID is required");
  }

  try {
    await apiToken.delete(
      `/restaurants/${restaurantId}/products/${productId}/variant-categories/${variantCategoryId}`
    );
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function createVariant({
  restaurantId,
  productId,
  variantCategoryId,
  name,
  priceModifier,
}: createVariantProps): Promise<createVariantPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!variantCategoryId || variantCategoryId.trim().length === 0) {
    throw new Error("Variant Category ID is required");
  }

  if (!name || name.trim().length < 2) {
    throw new Error("Variant name must be at least 2 characters long");
  }

  if (priceModifier === undefined || priceModifier === null || priceModifier < 0) {
    throw new Error("Variant price modifier must be a valid non-negative number");
  }

  try {
    const res = await apiToken.post(
      `/restaurants/${restaurantId}/products/${productId}/variant-categories/${variantCategoryId}/variants`,
      {
        name: name.trim(),
        priceModifier,
      }
    );

    const data: createVariantPropsReturn = res.data;

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

export async function updateVariant({
  restaurantId,
  productId,
  variantCategoryId,
  variantId,
  name,
  priceModifier,
}: updateVariantProps): Promise<updateVariantPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!variantCategoryId || variantCategoryId.trim().length === 0) {
    throw new Error("Variant Category ID is required");
  }

  if (!variantId || variantId.trim().length === 0) {
    throw new Error("Variant ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Variant name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (priceModifier !== undefined) {
    if (priceModifier < 0) {
      throw new Error("Variant price modifier must be a valid non-negative number");
    }
    updateData.priceModifier = priceModifier;
  }

  try {
    const res = await apiToken.put(
      `/restaurants/${restaurantId}/products/${productId}/variant-categories/${variantCategoryId}/variants/${variantId}`,
      updateData
    );

    const data: updateVariantPropsReturn = res.data;

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

export async function deleteVariant({
  restaurantId,
  productId,
  variantCategoryId,
  variantId,
}: deleteVariantProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!variantCategoryId || variantCategoryId.trim().length === 0) {
    throw new Error("Variant Category ID is required");
  }

  if (!variantId || variantId.trim().length === 0) {
    throw new Error("Variant ID is required");
  }

  try {
    await apiToken.delete(
      `/restaurants/${restaurantId}/products/${productId}/variant-categories/${variantCategoryId}/variants/${variantId}`
    );
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
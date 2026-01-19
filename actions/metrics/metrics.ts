import apiPublic from "@/api/api-public";
import apiToken from "@/api/api-token";
import {
  getProductMetricsProps,
  getProductMetricsPropsReturn,
  getRestaurantMetricsProps,
  getRestaurantMetricsPropsReturn,
  getTopProductsByViewsProps,
  getTopProductsByViewsPropsReturn,
  getTopProductsByAddedToCartProps,
  getTopProductsByAddedToCartPropsReturn,
  recordProductViewProps,
  recordProductViewPropsReturn,
  recordAddToCartProps,
  recordAddToCartPropsReturn,
  getConversionRateProps,
  getConversionRatePropsReturn,
  getRestaurantMetricsOverviewProps,
  getRestaurantMetricsOverviewPropsReturn,
} from "@/types/metrics-type";

export async function getProductMetrics({
  productId,
}: getProductMetricsProps): Promise<getProductMetricsPropsReturn> {
  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  try {
    const res = await apiPublic.get(`/products/${productId}/metrics`);

    const data: getProductMetricsPropsReturn = res.data;

    if (!data.data) {
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

export async function getRestaurantMetrics({
  restaurantId,
}: getRestaurantMetricsProps): Promise<getRestaurantMetricsPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiToken.get(`/restaurants/${restaurantId}/metrics`);

    const data: getRestaurantMetricsPropsReturn = res.data;

    if (!data.data) {
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

export async function getTopProductsByViews({
  restaurantId,
  limit = 10,
}: getTopProductsByViewsProps): Promise<getTopProductsByViewsPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (limit < 1 || limit > 100) {
    throw new Error("Limit must be between 1 and 100");
  }

  try {
    const res = await apiToken.get(
      `/restaurants/${restaurantId}/metrics/top-by-views`,
      {
        params: { limit },
      }
    );

    const data: getTopProductsByViewsPropsReturn = res.data;

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

export async function getTopProductsByAddedToCart({
  restaurantId,
  limit = 10,
}: getTopProductsByAddedToCartProps): Promise<getTopProductsByAddedToCartPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (limit < 1 || limit > 100) {
    throw new Error("Limit must be between 1 and 100");
  }

  try {
    const res = await apiToken.get(
      `/restaurants/${restaurantId}/metrics/top-by-added-to-cart`,
      {
        params: { limit },
      }
    );

    const data: getTopProductsByAddedToCartPropsReturn = res.data;

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

export async function recordProductView({
  productId,
  restaurantId,
}: recordProductViewProps): Promise<recordProductViewPropsReturn> {
  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.post(
      `/products/${productId}/restaurants/${restaurantId}/record-view`
    );

    const data: recordProductViewPropsReturn = res.data;

    if (!data.data) {
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

export async function recordAddToCart({
  productId,
  restaurantId,
}: recordAddToCartProps): Promise<recordAddToCartPropsReturn> {
  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.post(
      `/products/${productId}/restaurants/${restaurantId}/record-add-to-cart`
    );

    const data: recordAddToCartPropsReturn = res.data;

    if (!data.data) {
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

export async function getConversionRate({
  productId,
}: getConversionRateProps): Promise<getConversionRatePropsReturn> {
  if (!productId || productId.trim().length === 0) {
    throw new Error("Product ID is required");
  }

  try {
    const res = await apiPublic.get(`/products/${productId}/conversion-rate`);

    const data: getConversionRatePropsReturn = res.data;

    if (data.data === undefined || data.data === null) {
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

export async function getRestaurantMetricsOverview({
  restaurantId,
}: getRestaurantMetricsOverviewProps): Promise<getRestaurantMetricsOverviewPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiToken.get(
      `/restaurants/${restaurantId}/metrics/overview`
    );

    const data = res.data;

    if (!data.data) {
      throw new Error("Invalid response from server");
    }

    return {
      data: data.data,
    };
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
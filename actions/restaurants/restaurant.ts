import apiPublic from "@/api/api-public";
import apiToken from "@/api/api-token";
import {
  createRestaurantProps,
  createRestaurantPropsReturn,
  updateRestaurantProps,
  updateRestaurantPropsReturn,
  getRestaurantByIdProps,
  getRestaurantByIdPropsReturn,
  getRestaurantBySlugProps,
  getRestaurantBySlugPropsReturn,
  getUserRestaurantsPropsReturn,
  toggleRestaurantStatusProps,
  toggleRestaurantStatusPropsReturn,
  deleteRestaurantProps,
} from "@/types/restaurant-type";

export async function createRestaurant({
  name,
  slug,
  address,
  phone,
  description,
  logoUrl,
  bannerUrl,
}: createRestaurantProps): Promise<createRestaurantPropsReturn> {
  if (!name || name.trim().length < 2) {
    throw new Error("Restaurant name must be at least 2 characters long");
  }
  if (!slug || slug.trim().length < 2) {
    throw new Error("Restaurant slug must be at least 2 characters long");
  }
  if (!address || address.trim().length < 5) {
    throw new Error("Restaurant address must be at least 5 characters long");
  }
  if (!phone || phone.trim().length < 10) {
    throw new Error("Restaurant phone must be at least 10 characters long");
  }

  try {
    const res = await apiToken.post("/restaurants", {
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      address: address.trim(),
      phone: phone.trim(),
      description: description?.trim() || null,
      logoUrl: logoUrl?.trim() || null,
      bannerUrl: bannerUrl?.trim() || null,
    });

    const data: createRestaurantPropsReturn = res.data;

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

export async function updateRestaurant({
  id,
  name,
  slug,
  address,
  phone,
  description,
  logoUrl,
  bannerUrl,
}: updateRestaurantProps): Promise<updateRestaurantPropsReturn> {
  if (!id || id.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  const updateData: Record<string, any> = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      throw new Error("Restaurant name must be at least 2 characters long");
    }
    updateData.name = name.trim();
  }

  if (slug !== undefined) {
    if (slug.trim().length < 2) {
      throw new Error("Restaurant slug must be at least 2 characters long");
    }
    updateData.slug = slug.toLowerCase().trim();
  }

  if (address !== undefined) {
    if (address.trim().length < 5) {
      throw new Error("Restaurant address must be at least 5 characters long");
    }
    updateData.address = address.trim();
  }

  if (phone !== undefined) {
    if (phone.trim().length < 10) {
      throw new Error("Restaurant phone must be at least 10 characters long");
    }
    updateData.phone = phone.trim();
  }

  if (description !== undefined) {
    updateData.description = description?.trim() || null;
  }

  if (logoUrl !== undefined) {
    updateData.logoUrl = logoUrl?.trim() || null;
  }

  if (bannerUrl !== undefined) {
    updateData.bannerUrl = bannerUrl?.trim() || null;
  }

  try {
    const res = await apiToken.patch(`/restaurants/${id}`, updateData);

    const data: updateRestaurantPropsReturn = res.data;

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

export async function getRestaurantById({
  id,
}: getRestaurantByIdProps): Promise<getRestaurantByIdPropsReturn> {
  if (!id || id.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.get(`/restaurants/${id}`);

    const data: getRestaurantByIdPropsReturn = res.data;

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

export async function getRestaurantBySlug({
  slug,
}: getRestaurantBySlugProps): Promise<getRestaurantBySlugPropsReturn> {
  if (!slug || slug.trim().length === 0) {
    throw new Error("Restaurant slug is required");
  }

  try {
    const res = await apiPublic.get(`/restaurants/slug/${slug}`);

    const data: getRestaurantBySlugPropsReturn = res.data;

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

export async function getUserRestaurants(): Promise<getUserRestaurantsPropsReturn> {
  try {
    const res = await apiToken.get("/restaurants");

    const data: getUserRestaurantsPropsReturn = res.data;

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

export async function toggleRestaurantStatus({
  id,
}: toggleRestaurantStatusProps): Promise<toggleRestaurantStatusPropsReturn> {
  if (!id || id.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiToken.patch(`/restaurants/${id}/toggle-status`);

    const data: toggleRestaurantStatusPropsReturn = res.data;

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

export async function deleteRestaurant({
  id,
}: deleteRestaurantProps): Promise<void> {
  if (!id || id.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    await apiToken.delete(`/restaurants/${id}`);
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
import apiPublic from "@/api/api-public";
import apiToken from "@/api/api-token";
import {
  createOpeningHourProps,
  createOpeningHourPropsReturn,
  deleteOpeningHourProps,
  getRestaurantSettingsProps,
  getRestaurantSettingsPropsReturn,
  toggleOpeningHourProps,
  toggleOpeningHourPropsReturn,
  updateOpeningHourProps,
  updateRestaurantSettingsProps,
  updateRestaurantSettingsPropsReturn,
} from "@/types/settings-type";

export async function getRestaurantSettings({
  restaurantId,
}: getRestaurantSettingsProps): Promise<getRestaurantSettingsPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  try {
    const res = await apiPublic.get(`/restaurants/${restaurantId}/settings`);

    const data: getRestaurantSettingsPropsReturn = res.data;

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

export async function updateRestaurantSettings({
  restaurantId,
  taxPercentage,
  minOrderAmount,
  isOpen,
  showPrice,
  showImage,
  layoutType,
}: updateRestaurantSettingsProps): Promise<updateRestaurantSettingsPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  const updateData: Record<string, any> = {};

  if (taxPercentage !== undefined) {
    if (taxPercentage < 0) {
      throw new Error("Tax percentage must be a valid positive number");
    }
    updateData.taxPercentage = taxPercentage;
  }

  if (minOrderAmount !== undefined) {
    if (minOrderAmount < 0) {
      throw new Error("Minimum order amount must be a valid positive number");
    }
    updateData.minOrderAmount = minOrderAmount;
  }

  if (isOpen !== undefined) {
    updateData.isOpen = isOpen;
  }

  if (showPrice !== undefined) {
    updateData.showPrice = showPrice;
  }

  if (showImage !== undefined) {
    updateData.showImage = showImage;
  }

  if (layoutType !== undefined) {
    if (!["GRID", "LIST"].includes(layoutType)) {
      throw new Error("Layout type must be GRID or LIST");
    }
    updateData.layoutType = layoutType;
  }

  try {
    const res = await apiToken.patch(`/restaurants/${restaurantId}/settings`, updateData);

    const data: updateRestaurantSettingsPropsReturn = res.data;

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

export async function createOpeningHour({
  restaurantId,
  dayOfWeek,
  opensAt,
  closesAt,
}: createOpeningHourProps): Promise<createOpeningHourPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (dayOfWeek === undefined || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error("Day of week must be between 0 and 6");
  }

  if (!opensAt || opensAt.trim().length === 0) {
    throw new Error("Opening time is required");
  }

  if (!closesAt || closesAt.trim().length === 0) {
    throw new Error("Closing time is required");
  }

  try {
    const res = await apiToken.post(`/restaurants/${restaurantId}/opening-hours`, {
      dayOfWeek,
      opensAt: opensAt.trim(),
      closesAt: closesAt.trim(),
    });

    const data: createOpeningHourPropsReturn = res.data;

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

export async function updateOpeningHour({
  restaurantId,
  settingsId,
  dayOfWeek,
  opensAt,
  closesAt,
}: updateOpeningHourProps) {
  if (!restaurantId || !settingsId) {
    throw new Error("Restaurant ID and Settings ID are required");
  }

  const updateData: Record<string, any> = {};

  if (opensAt !== undefined) updateData.opensAt = opensAt.trim();
  if (closesAt !== undefined) updateData.closesAt = closesAt.trim();

  const res = await apiToken.patch(
    `/restaurants/${restaurantId}/settings/${settingsId}/opening-hours/${dayOfWeek}`,
    updateData,
  );

  return res.data;
}

export async function deleteOpeningHour({
  restaurantId,
  settingsId,
  dayOfWeek,
}: deleteOpeningHourProps): Promise<void> {
  if (!restaurantId || restaurantId.trim().length === 0 || !settingsId) {
    throw new Error("Restaurant ID is required");
  }

  if (dayOfWeek === undefined || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error("Day of week must be between 0 and 6");
  }

  try {
    await apiToken.delete(`/restaurants/${restaurantId}/settings/${settingsId}/opening-hours/${dayOfWeek}`);
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function toggleOpeningHour({
  restaurantId,
  settingsId,
  dayOfWeek,
}: toggleOpeningHourProps): Promise<toggleOpeningHourPropsReturn> {
  if (!restaurantId || restaurantId.trim().length === 0) {
    throw new Error("Restaurant ID is required");
  }

  if (dayOfWeek === undefined || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error("Day of week must be between 0 and 6");
  }

  try {
    const res = await apiToken.patch(
      `/restaurants/${restaurantId}/settings/${settingsId}/opening-hours/${dayOfWeek}/toggle`,
    );

    const data: toggleOpeningHourPropsReturn = res.data;

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

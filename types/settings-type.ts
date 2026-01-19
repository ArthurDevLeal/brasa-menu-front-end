export type LayoutType = "GRID" | "LIST";

export interface OpeningHour {
  id: string;
  settingsId: string;
  dayOfWeek: number;
  opensAt: string;
  closesAt: string;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantSettings {
  id: string;
  restaurantId: string;
  taxPercentage: number;
  minOrderAmount: number;
  isOpen: boolean;
  showPrice: boolean;
  showImage: boolean;
  layoutType: LayoutType;
  createdAt: Date;
  updatedAt: Date;
  openingHours: OpeningHour[];
}

export interface getRestaurantSettingsProps {
  restaurantId: string;
}

export interface getRestaurantSettingsPropsReturn {
  data: RestaurantSettings;
}

export interface updateRestaurantSettingsProps {
  restaurantId: string;
  taxPercentage?: number;
  minOrderAmount?: number;
  isOpen?: boolean;
  showPrice?: boolean;
  showImage?: boolean;
  layoutType?: LayoutType;
}

export interface updateRestaurantSettingsPropsReturn {
  message: string;
  data: RestaurantSettings;
}

export interface createOpeningHourProps {
  restaurantId: string;
  dayOfWeek: number;
  opensAt: string;
  closesAt: string;
}

export interface createOpeningHourPropsReturn {
  message: string;
  data: OpeningHour;
}

export interface updateOpeningHourProps {
  settingsId: string;
  restaurantId: string;
  dayOfWeek: number;
  opensAt?: string;
  closesAt?: string;
}

export interface updateOpeningHourPropsReturn {
  message: string;
  data: OpeningHour;
}

export interface deleteOpeningHourProps {
  settingsId: string;
  restaurantId: string;
  dayOfWeek: number;
}

export interface toggleOpeningHourProps {
  settingsId: string;

  restaurantId: string;
  dayOfWeek: number;
}

export interface toggleOpeningHourPropsReturn {
  message: string;
  data: OpeningHour;
}

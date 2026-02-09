export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  description: string | null;
  logoUrl: string | null;
  logoPath: string | null;      // NEW
  bannerUrl: string | null;
  bannerPath: string | null;    // NEW
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface createRestaurantProps {
  name: string;
  slug: string;
  address: string;
  phone: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
}

export interface createRestaurantPropsReturn {
  message: string;
  data: Restaurant;
}

export interface updateRestaurantProps {
  id: string;
  name?: string;
  slug?: string;
  address?: string;
  phone?: string;
  description?: string;
  logoUrl?: string | null;
  logoPath?: string | null;     // NEW
  bannerUrl?: string | null;
  bannerPath?: string | null;   // NEW
}

export interface updateRestaurantPropsReturn {
  message: string;
  data: Restaurant;
}

export interface getRestaurantByIdProps {
  id: string;
}

export interface getRestaurantByIdPropsReturn {
  message: string;
  data: Restaurant;
}

export interface getRestaurantBySlugProps {
  slug: string;
}

export interface getRestaurantBySlugPropsReturn {
  message: string;
  data: Restaurant;
}

export interface getUserRestaurantsPropsReturn {
  message: string;
  data: Restaurant[];
}

export interface toggleRestaurantStatusProps {
  id: string;
}

export interface toggleRestaurantStatusPropsReturn {
  message: string;
  data: Restaurant;
}

export interface deleteRestaurantProps {
  id: string;
}
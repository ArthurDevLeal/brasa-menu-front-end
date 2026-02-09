"use client";
import { TabsContent } from "@/components/ui/tabs";
import { Restaurant } from "@/types/restaurant-type";
import { useEffect, useState } from "react";
import { RestaurantInfoCard } from "./general/info-card";
import { ImageUploadCard } from "./general/img-upload-card";

interface GeneralSettingsProps {
  restaurant: Restaurant;
  onSave: () => void;
}

export default function GeneralSettings({ restaurant, onSave }: GeneralSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    phone: "",
    address: "",
    logoUrl: "",
    logoPath: "",     
    bannerUrl: "",
    bannerPath: "",    
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        slug: restaurant.slug || "",
        description: restaurant.description || "",
        phone: restaurant.phone || "",
        address: restaurant.address || "",
        logoUrl: restaurant.logoUrl || "",
        logoPath: (restaurant as any).logoPath || "",    
        bannerUrl: restaurant.bannerUrl || "",
        bannerPath: (restaurant as any).bannerPath || "", 
      });
    }
  }, [restaurant]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (url: string, path: string) => {
    setFormData((prev) => ({
      ...prev,
      logoUrl: url,
      logoPath: path,
    }));
  };

  const handleBannerChange = (url: string, path: string) => {
    setFormData((prev) => ({
      ...prev,
      bannerUrl: url,
      bannerPath: path,
    }));
  };

  return (
    <TabsContent value="geral" className="space-y-6">
      <RestaurantInfoCard
        restaurant={restaurant}
        isLoading={isLoading}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={onSave}
      />
      <ImageUploadCard
        logoUrl={formData.logoUrl}
        logoPath={formData.logoPath}
        bannerUrl={formData.bannerUrl}
        bannerPath={formData.bannerPath}
        onLogoChange={handleLogoChange}
        onBannerChange={handleBannerChange}
        onSave={onSave}
      />
    </TabsContent>
  );
}
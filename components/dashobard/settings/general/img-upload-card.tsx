"use client";
import { updateRestaurant } from "@/actions/restaurants/restaurant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loadings";
import { createClient } from "@/lib/client";
import { Image, Upload, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploadCardProps {
  logoUrl: string;
  logoPath: string;
  bannerUrl: string;
  bannerPath: string;
  onLogoChange: (url: string, path: string) => void;
  onBannerChange: (url: string, path: string) => void;
  onSave: () => void;
}

const BUCKET_NAME = "images";
const LOGO_PATH = "logos";
const BANNER_PATH = "banners";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUploadCard({
  logoUrl,
  logoPath,
  bannerUrl,
  bannerPath,
  onLogoChange,
  onBannerChange,
  onSave,
}: ImageUploadCardProps) {
  const { id }: { id: string } = useParams();
  const supabase = createClient();
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return "Apenas arquivos JPEG, PNG e WebP são permitidos";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Arquivo não pode ser maior que 5MB";
    }
    return null;
  };

  const uploadImageToSupabase = async (
    file: File,
    path: string,
    imageType: "logo" | "banner",
  ): Promise<{ url: string; path: string } | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${id}-${imageType}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

      return {
        url: publicUrlData.publicUrl,
        path: filePath,
      };
    } catch (error: any) {
      throw new Error(`Erro ao fazer upload: ${error.message}`);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: "logo" | "banner",
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (validation) {
      toast.error("Validação de arquivo falhou", {
        description: validation,
      });
      return;
    }

    const isLogo = imageType === "logo";
    setIsUploadingLogo(isLogo);
    setIsUploadingBanner(!isLogo);

    try {
      const path = isLogo ? LOGO_PATH : BANNER_PATH;
      const result = await uploadImageToSupabase(file, path, imageType);

      if (result) {
        isLogo ? onLogoChange(result.url, result.path) : onBannerChange(result.url, result.path);

        const updatePayload = {
          id,
          ...(isLogo
            ? { logoUrl: result.url, logoPath: result.path }
            : { bannerUrl: result.url, bannerPath: result.path }),
        };

        const response = await updateRestaurant(updatePayload);

        toast.success(`${isLogo ? "Logo" : "Banner"} enviado com sucesso!`);
        onSave();
      }
    } catch (error: any) {
      toast.error("Erro no upload", {
        description: error.message || "Tente novamente",
      });
    } finally {
      setIsUploadingLogo(false);
      setIsUploadingBanner(false);
    }
  };

  const handleRemoveImage = async (imageType: "logo" | "banner") => {
    const isLogo = imageType === "logo";

    let filePath = isLogo ? logoPath : bannerPath;
    const imageUrl = isLogo ? logoUrl : bannerUrl;

    if (!filePath && imageUrl) {
      try {
        const url = new URL(imageUrl);
        const pathParts = url.pathname.split("/");
        const bucketIndex = pathParts.indexOf(BUCKET_NAME);

        if (bucketIndex !== -1) {
          filePath = pathParts.slice(bucketIndex + 1).join("/");
        }
      } catch (e) {}
    }

    if (!filePath) {
      toast.error("Erro", {
        description: "Não foi possível obter o caminho do arquivo.",
      });
      return;
    }

    setIsUploadingLogo(isLogo);
    setIsUploadingBanner(!isLogo);

    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

      if (error) {
        throw new Error(error.message);
      }
      isLogo ? onLogoChange("", "") : onBannerChange("", "");

      const updatePayload = {
        id,
        ...(isLogo ? { logoUrl: "", logoPath: "" } : { bannerUrl: "", bannerPath: "" }),
      };

      const response = await updateRestaurant(updatePayload);

      toast.success(`${isLogo ? "Logo" : "Banner"} removido com sucesso!`);
      onSave();
    } catch (error: any) {
      toast.error("Erro ao remover imagem", {
        description: error.message || "Tente novamente",
      });
    } finally {
      setIsUploadingLogo(false);
      setIsUploadingBanner(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagens</CardTitle>
        <CardDescription>Logo e banner do restaurante</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUploadField
            label="Logo"
            imageUrl={logoUrl}
            isUploading={isUploadingLogo}
            imageType="logo"
            onUpload={handleImageUpload}
            onRemove={handleRemoveImage}
            dimensions="h-20 w-20"
            debugPath={logoPath}
          />
          <ImageUploadField
            label="Banner"
            imageUrl={bannerUrl}
            isUploading={isUploadingBanner}
            imageType="banner"
            onUpload={handleImageUpload}
            onRemove={handleRemoveImage}
            dimensions="h-20 w-32"
            debugPath={bannerPath}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface ImageUploadFieldProps {
  label: string;
  imageUrl: string;
  isUploading: boolean;
  imageType: "logo" | "banner";
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => void;
  onRemove: (type: "logo" | "banner") => Promise<void>;
  dimensions: string;
  debugPath?: string;
}

function ImageUploadField({
  label,
  imageUrl,
  isUploading,
  imageType,
  onUpload,
  onRemove,
  dimensions,
  debugPath,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div className="space-y-3">
        <div
          className={`${dimensions} rounded-lg bg-muted flex items-center justify-center overflow-hidden relative group`}
        >
          {imageUrl ? (
            <>
              <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
              <button
                onClick={() => onRemove(imageType)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                disabled={isUploading}
                type="button"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </>
          ) : (
            <Image className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <label>
          <input
            type="file"
            accept={ALLOWED_MIME_TYPES.join(",")}
            onChange={(e) => onUpload(e, imageType)}
            disabled={isUploading}
            className="hidden"
          />
          <Button variant="outline" asChild disabled={isUploading} className="cursor-pointer">
            <span>
              {isUploading ? (
                <>
                  <Loading variant="dots" size="sm" className="mr-2" />
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Enviar
                </>
              )}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
}

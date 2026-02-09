"use client";
import { updateProduct } from "@/actions/product/product";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loadings";
import { createClient } from "@/lib/client";
import { Image, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploadCardProps {
  imageUrl: string;
  imagePath: string;
  restaurantId: string;
  productId: string;
  onImageChange: (url: string, path: string) => void;
  onSave: () => Promise<void>;
}

const BUCKET_NAME = "images";
const PRODUCTS_PATH = "products";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUploadCard({
  imageUrl,
  imagePath,
  restaurantId,
  productId,
  onImageChange,
  onSave,
}: ImageUploadCardProps) {
  const supabase = createClient();
  const [isUploading, setIsUploading] = useState(false);

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return "Apenas arquivos JPEG, PNG e WebP são permitidos";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Arquivo não pode ser maior que 5MB";
    }
    return null;
  };

  const uploadImageToSupabase = async (file: File): Promise<{ url: string; path: string } | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${restaurantId}-${productId}.${fileExt}`;
      const filePath = `${PRODUCTS_PATH}/${restaurantId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (validation) {
      toast.error("Validação de arquivo falhou", {
        description: validation,
      });
      return;
    }

    setIsUploading(true);

    try {
      const result = await uploadImageToSupabase(file);

      if (result) {
        onImageChange(result.url, result.path);

        await updateProduct({
          restaurantId,
          productId,
          imageUrl: result.url,
        });

        toast.success("Imagem enviada com sucesso!");
        await onSave();
      }
    } catch (error: any) {
      toast.error("Erro no upload", {
        description: error.message || "Tente novamente",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    let filePath = imagePath;

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

    setIsUploading(true);

    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

      if (error) {
        throw new Error(error.message);
      }

      onImageChange("", "");

      await updateProduct({
        restaurantId,
        productId,
        imageUrl: "",
      });

      toast.success("Imagem removida com sucesso!");
      await onSave();
    } catch (error: any) {
      toast.error("Erro ao remover imagem", {
        description: error.message || "Tente novamente",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="h-32 w-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden relative group">
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="Produto" className="w-full h-full object-cover" />
            <button
              onClick={handleRemoveImage}
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
          onChange={handleImageUpload}
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
  );
}

"use client";

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProductWithRelations } from "@/types/product-type";
import { useCartStore } from "@/store/cart-store";
import { recordAddToCart } from "@/actions/metrics/metrics";

interface SelectedVariant {
  variantCategoryId: string;
  variantId: string;
  priceModifier: number;
}

interface ProductModalProps {
  selectedProduct: ProductWithRelations | null;
  setSelectedProduct: (product: ProductWithRelations | null) => void;
  restaurantId: string;
}

export default function ProductModal({
  selectedProduct,
  setSelectedProduct,
  restaurantId,
}: ProductModalProps) {
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<
    Map<string, { id: string; name: string; price: number }[]>
  >(new Map());

  const addToCart = useCartStore((state) => state.addToCart);

  const selectVariant = (variantCategoryId: string, variantId: string, priceModifier: number): void => {
    setSelectedVariants((prev) => {
      const filtered = prev.filter((v) => v.variantCategoryId !== variantCategoryId);
      return [...filtered, { variantCategoryId, variantId, priceModifier }];
    });
  };

  const isVariantSelected = (variantCategoryId: string, variantId: string): boolean => {
    return selectedVariants.some(
      (v) => v.variantCategoryId === variantCategoryId && v.variantId === variantId
    );
  };

  const isAddonSelected = (categoryId: string, addonId: string): boolean => {
    return (
      selectedAddons.get(categoryId)?.some((addon) => addon.id === addonId) ??
      false
    );
  };

  const toggleAddon = (
    categoryId: string,
    addon: { id: string; name: string; price: number },
    maxSelections: number | null
  ): void => {
    setSelectedAddons((prev) => {
      const newMap = new Map(prev);
      const categoryAddons = newMap.get(categoryId) ?? [];

      const isSelected = categoryAddons.some((a) => a.id === addon.id);

      if (isSelected) {
        newMap.set(
          categoryId,
          categoryAddons.filter((a) => a.id !== addon.id)
        );
      } else {
        if (
          maxSelections === null ||
          categoryAddons.length < maxSelections
        ) {
          newMap.set(categoryId, [...categoryAddons, addon]);
        }
      }

      return newMap;
    });
  };

  const canAddToCart = (): boolean => {
    if (!selectedProduct) return false;

    const allVariantsSelected = selectedProduct.variantCategories.every((category) => {
      return selectedVariants.some((v) => v.variantCategoryId === category.id);
    });

    const allAddonsValid = selectedProduct.addOnCategories.every((category) => {
      const selectedCount = selectedAddons.get(category.id)?.length ?? 0;
      return selectedCount >= category.minSelections;
    });

    return allVariantsSelected && allAddonsValid;
  };

  const calculateProductTotal = (): number => {
    if (!selectedProduct) return 0;

    const variantsCost = selectedVariants.reduce((sum, variant) => sum + variant.priceModifier, 0);

    const addonsCost = Array.from(selectedAddons.values()).reduce(
      (sum, addons) => sum + addons.reduce((addonSum, addon) => addonSum + addon.price, 0),
      0
    );

    return (selectedProduct.price + variantsCost + addonsCost) * productQuantity;
  };

  const handleAddToCart = async (): Promise<void> => {
    if (!selectedProduct || !canAddToCart()) return;

    const addonsArray = Array.from(selectedAddons.values()).flat();

    addToCart(selectedProduct, productQuantity, addonsArray);

    try {
      await recordAddToCart({
        productId: selectedProduct.id,
        restaurantId,
      });
    } catch (error) {
      console.error("Error recording add to cart:", error);
    }

    setSelectedProduct(null);
    setProductQuantity(1);
    setSelectedVariants([]);
    setSelectedAddons(new Map());
  };

  return (
    <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
      <DialogContent className="sm:max-w-lg bg-background border-border max-h-[90vh] overflow-hidden p-0 rounded-2xl">
        {selectedProduct && (
          <>
            {/* Imagem do produto */}
            <div className="relative w-full h-56 bg-secondary overflow-hidden">
              <img
                src={selectedProduct.imageUrl || ""}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Info do produto */}
            <div className="p-6 pb-4 -mt-12 relative z-10">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground leading-tight">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {selectedProduct.description}
              </p>
              <p className="text-2xl font-bold text-primary mt-4">
                R$ {selectedProduct.price.toFixed(2)}
              </p>
            </div>

            <ScrollArea className="max-h-[35vh]">
              <div className="px-6 pb-4 space-y-4">
                {/* Variantes */}
                {selectedProduct.variantCategories.map((category) => (
                  <div key={category.id} className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {category.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Selecione uma opção
                        </p>
                      </div>
                      {category.isRequired && (
                        <Badge className="bg-primary/10 text-primary border-0 font-medium">
                          Obrigatório
                        </Badge>
                      )}
                    </div>

                    <RadioGroup
                      value={
                        selectedVariants.find((v) => v.variantCategoryId === category.id)?.variantId || ""
                      }
                      onValueChange={(variantId) => {
                        const variant = category.variants.find((v) => v.id === variantId);
                        if (variant) {
                          selectVariant(category.id, variantId, variant.priceModifier);
                        }
                      }}
                      className="space-y-2"
                    >
                      {category.variants.map((variant) => (
                        <label
                          key={variant.id}
                          className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            isVariantSelected(category.id, variant.id)
                              ? "border-primary bg-primary/5"
                              : "border-transparent bg-background hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={variant.id} id={variant.id} className="border-2" />
                            <span className="text-foreground font-medium">{variant.name}</span>
                          </div>
                          {variant.priceModifier > 0 && (
                            <span className="text-muted-foreground text-sm font-medium">
                              + R$ {variant.priceModifier.toFixed(2)}
                            </span>
                          )}
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

                {/* Adicionais */}
                {selectedProduct.addOnCategories.map((category) => (
                  <div key={category.id} className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {category.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {category.isRequired ? "Mínimo " + category.minSelections : "Opcional"} • 
                          Até {category.maxSelections === null ? "sem limite" : category.maxSelections}
                        </p>
                      </div>
                      {category.isRequired && (
                        <Badge className="bg-primary/10 text-primary border-0 font-medium">
                          Obrigatório
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      {(category.addOns || []).map((addon) => {
                        const isSelected = isAddonSelected(category.id, addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-transparent bg-background hover:border-border"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                  isSelected 
                                    ? "bg-primary border-primary" 
                                    : "border-muted-foreground/30"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                              </div>
                              <span className="text-foreground font-medium">{addon.name}</span>
                            </div>
                            {addon.price > 0 && (
                              <span className="text-muted-foreground text-sm font-medium">
                                + R$ {addon.price.toFixed(2)}
                              </span>
                            )}
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() =>
                                toggleAddon(
                                  category.id,
                                  { id: addon.id, name: addon.name, price: addon.price },
                                  category.maxSelections
                                )
                              }
                              className="sr-only"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer com ações */}
            <div className="border-t border-border p-4 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-secondary rounded-xl p-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg hover:bg-background"
                    onClick={() => setProductQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-foreground text-lg">
                    {productQuantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg hover:bg-background"
                    onClick={() => setProductQuantity((q) => q + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  className="flex-1 h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
                  disabled={!canAddToCart()}
                  onClick={handleAddToCart}
                >
                  Adicionar • R$ {calculateProductTotal().toFixed(2)}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

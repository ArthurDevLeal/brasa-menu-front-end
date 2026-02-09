"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
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
      <DialogContent className="sm:max-w-md bg-background border-border max-h-[85vh] overflow-hidden p-0">
        {selectedProduct && (
          <>
            <div className="relative w-full h-48 bg-secondary overflow-hidden">
              <img
                src={selectedProduct.imageUrl || ""}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 pb-0">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="font-display text-2xl text-foreground pr-8">
                      {selectedProduct.name}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              <p className="text-muted-foreground mt-3">
                {selectedProduct.description}
              </p>
              <p className="font-display text-2xl font-bold text-primary mt-4">
                R$ {selectedProduct.price.toFixed(2)}
              </p>
            </div>

            <ScrollArea className="max-h-[40vh]">
              <div className="px-6 pb-4 space-y-6">
                {selectedProduct.variantCategories.map((category) => (
                  <div key={category.id} className="pt-4">
                    <Separator className="mb-4" />
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-display font-semibold text-foreground">
                          {category.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {category.isRequired ? "Obrigatório" : "Opcional"}
                        </p>
                      </div>
                      {category.isRequired && (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
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
                    >
                      <div className="space-y-2">
                        {category.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={variant.id} id={variant.id} />
                            <Label htmlFor={variant.id} className="flex-1 cursor-pointer flex items-center justify-between">
                              <span className="text-foreground">{variant.name}</span>
                              {variant.priceModifier > 0 && (
                                <span className="text-muted-foreground text-sm">
                                  + R$ {variant.priceModifier.toFixed(2)}
                                </span>
                              )}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}

                {selectedProduct.addOnCategories.map((category) => (
                  <div key={category.id} className="pt-4">
                    <Separator className="mb-4" />
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-display font-semibold text-foreground">
                          {category.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {category.isRequired ? "Obrigatório" : "Opcional"} •
                          Escolha até{" "}
                          {category.maxSelections === null
                            ? "sem limite"
                            : category.maxSelections}
                        </p>
                      </div>
                      {category.isRequired && (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
                          Obrigatório
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      {(category.addOns || []).map((addon) => (
                        <label
                          key={addon.id}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            isAddonSelected(category.id, addon.id)
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={isAddonSelected(
                                category.id,
                                addon.id
                              )}
                              onCheckedChange={() =>
                                toggleAddon(
                                  category.id,
                                  {
                                    id: addon.id,
                                    name: addon.name,
                                    price: addon.price,
                                  },
                                  category.maxSelections
                                )
                              }
                            />
                            <span className="text-foreground">
                              {addon.name}
                            </span>
                          </div>
                          {addon.price > 0 && (
                            <span className="text-muted-foreground text-sm">
                              + R$ {addon.price.toFixed(2)}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 bg-background">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() =>
                      setProductQuantity((q) => Math.max(1, q - 1))
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold text-foreground">
                    {productQuantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setProductQuantity((q) => q + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  className="flex-1 h-11"
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
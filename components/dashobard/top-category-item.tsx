import { CategoryWithProductCount } from "@/types/category-type";

interface TopCategoryProsp {
  category: CategoryWithProductCount
}
export default function TopCategoryItem({ category }: TopCategoryProsp) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{category.name}</p>
        <p className="text-sm text-muted-foreground">{category.productCount} produtos</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{category.isActive}</p>
        <p className="text-xs text-muted-foreground">views</p>
      </div>
    </div>
  );
}

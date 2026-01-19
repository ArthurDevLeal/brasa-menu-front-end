import { CategoryWithProductCount } from "@/types/category-type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TopCategoryItem from "./top-category-item";

export default function TopCategory({categories}:{categories: CategoryWithProductCount[]}) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Categorias</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {categories.map((category, index) => (
          <TopCategoryItem key={index} category={category} />
        ))}
      </CardContent>
    </Card>
  );
}

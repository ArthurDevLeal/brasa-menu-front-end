import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentProductCard from "./recent-product-card";
import { ProductMetric, TopProductByViews } from "@/types/metrics-type";

export default function ProductsPeformace({products}:{products: TopProductByViews[]}) {
  return (
    <Card className="col-span-3 ">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Performance dos Produtos</CardTitle>
        <Button variant={"ghost"}>
          Ver todos <ArrowUpRight />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {products.map((product, index) => (
          <RecentProductCard key={index} product={product} />
        ))}
      </CardContent>
    </Card>
  );
}

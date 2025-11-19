import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="bg-muted rounded-lg overflow-hidden mb-4 h-64 flex items-center justify-center">
          <img
            src={product.image_url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/products';
import { useCart } from '@/context/cart-context';

interface ProductGridProps {
  featured?: boolean;
  categoryId?: string;
}

export default function ProductGrid({ featured = false, categoryId }: ProductGridProps) {
  const { addToCart } = useCart();
  
  // Filter products based on props
  let filteredProducts = products;
  
  if (featured) {
    filteredProducts = products.filter(product => product.featured);
  }
  
  if (categoryId) {
    filteredProducts = products.filter(product => product.categoryId === categoryId);
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
          <Link
            href={`/products/${product.id}`}
            className="relative aspect-square overflow-hidden bg-muted"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.sale && (
              <Badge variant="destructive" className="absolute right-2 top-2">
                                Sale
              </Badge>
            )}
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < product.rating ? "fill-primary text-primary" : "text-muted"}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            <h3 className="line-clamp-1 text-base font-medium">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => addToCart(product, 1)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/products/${product.id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
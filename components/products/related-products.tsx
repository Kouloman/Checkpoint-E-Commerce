'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/products';
import { useCart } from '@/context/cart-context';

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  
  // Get current product category to show related products
  const currentProduct = products.find(p => p.id === currentProductId);
  const relatedProducts = currentProduct 
    ? products.filter(p => 
        p.id !== currentProductId && 
        p.categoryId === currentProduct.categoryId
      ).slice(0, 8)
    : [];
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="group relative flex min-w-[270px] max-w-[270px] flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
          >
            <Link
              href={`/products/${product.id}`}
              className="relative aspect-square overflow-hidden bg-muted"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="270px"
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
              <Button
                variant="default"
                size="sm"
                className="mt-4"
                onClick={() => addToCart(product, 1)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
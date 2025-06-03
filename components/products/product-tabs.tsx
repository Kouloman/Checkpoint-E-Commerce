'use client';

import { useState } from 'react';
import { Star, User, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/lib/types';

interface ProductTabsProps {
  product: ProductType;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none dark:prose-invert">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {product.fullDescription || product.description}
            </p>
            
            {product.features && (
              <div className="mt-6">
                <h3 className="text-lg font-medium">Key Features</h3>
                <ul className="mt-2 list-disc pl-5">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mt-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <tbody className="divide-y">
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm font-medium">Brand</td>
                  <td className="p-3 text-sm">{product.brand || 'Manufacturer'}</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium">Model</td>
                  <td className="p-3 text-sm">{product.model || product.name}</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm font-medium">Dimensions</td>
                  <td className="p-3 text-sm">{product.dimensions || 'Varies by size'}</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium">Weight</td>
                  <td className="p-3 text-sm">{product.weight || '0.5 kg'}</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm font-medium">Material</td>
                  <td className="p-3 text-sm">{product.material || 'Premium materials'}</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium">Color</td>
                  <td className="p-3 text-sm">{product.color || 'As shown'}</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm font-medium">Warranty</td>
                  <td className="p-3 text-sm">{product.warranty || '1 year manufacturer warranty'}</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm font-medium">In Stock</td>
                  <td className="p-3 text-sm">{product.inStock ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{product.rating.toFixed(1)}</span>
                <div className="flex flex-col">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Based on {product.reviewCount} reviews
                  </span>
                </div>
              </div>
              <div className="sm:ml-auto">
                <Button>Write a Review</Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {review === 1 ? 'John Doe' : review === 2 ? 'Jane Smith' : 'Alex Johnson'}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {review === 1 
                            ? '2 months ago' 
                            : review === 2 
                              ? '1 week ago' 
                              : '3 days ago'}
                        </span>
                        <span>•</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < (review === 1 ? 5 : review === 2 ? 4 : 5)
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">
                    {review === 1
                      ? "Absolutely love this product! The quality is outstanding and it exceeded my expectations. Would definitely recommend it to anyone looking for something reliable and stylish."
                      : review === 2
                      ? "Great product overall, but I had a minor issue with the delivery. However, customer service was very helpful and resolved the problem quickly."
                      : "Perfect! Just what I was looking for. Fast shipping and excellent packaging. Will buy again for sure."}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { ProductTabs } from '@/components/products/product-tabs';
import RelatedProducts from '@/components/products/related-products';
import { Badge } from '@/components/ui/badge';

// Ajoute cette fonction pour l'export statique
export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return <div className="container py-16 text-center">Product not found</div>;
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container px-4 py-16 md:px-6">
      <Button 
        variant="ghost" 
        className="mb-8 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} />
        Back to products
      </Button>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-all hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.sale && (
            <Badge className="absolute right-4 top-4" variant="destructive">
              
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < product.rating ? "fill-primary text-primary" : "text-muted"}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount} reviews
            </span>
          </div>
          
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <div className="mt-4 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <ProductTabs product={product} />
      
      <RelatedProducts currentProductId={params.id} />
    </div>
  );
}
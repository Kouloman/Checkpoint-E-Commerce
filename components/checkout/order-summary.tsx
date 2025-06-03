'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';

export function OrderSummary() {
  const { cart } = useCart();
  
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <Separator className="my-4" />
        
        <div className="max-h-60 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div key={item.product.id} className="mb-4 flex items-start gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <Link
                  href={`/products/${item.product.id}`}
                  className="line-clamp-1 text-sm font-medium hover:underline"
                >
                  {item.product.name}
                </Link>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Qty: {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        {subtotal > 100 && (
          <div className="mt-4 rounded-md bg-green-50 p-2 text-center text-xs text-green-600 dark:bg-green-900/20 dark:text-green-400">
            Free shipping on orders over $100!
          </div>
        )}
      </div>
    </div>
  );
}
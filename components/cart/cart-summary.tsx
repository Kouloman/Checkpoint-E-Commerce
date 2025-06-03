'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';

export function CartSummary() {
  const { cart } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discount) * 0.07; // 7% tax
  const total = subtotal - discount + shipping + tax;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setAppliedPromo(true);
      toast({
        title: 'Promo code applied!',
        description: 'You got 10% off your order.',
        variant: 'default',
      });
    } else {
      toast({
        title: 'Invalid promo code',
        description: 'Please enter a valid promo code.',
        variant: 'destructive',
      });
    }
    setPromoCode('');
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <Separator className="my-4" />
        
        <div className="space-y-4">
          {!appliedPromo && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="rounded-r-none"
                />
                <Button 
                  onClick={handleApplyPromo}
                  disabled={!promoCode}
                  className="rounded-l-none px-3"
                >
                  Apply
                </Button>
              </div>
{/*               <span className="text-xs text-muted-foreground">Try "DISCOUNT10" for 10% off</span>
 */}            </div>
          )}
          
          {appliedPromo && (
            <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
                <span>Promo code DISCOUNT10 applied</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setAppliedPromo(false)}
              >
                Remove
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          {subtotal > 100 && (
            <div className="rounded-md bg-green-50 p-2 text-center text-xs text-green-600 dark:bg-green-900/20 dark:text-green-400">
              Free shipping on orders over $100!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';

interface StripeCheckoutProps {
  onSuccess: () => void;
  shippingDetails: any;
}

export function StripeCheckout({ onSuccess, shippingDetails }: StripeCheckoutProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const { cart } = useCart();
  
  const total = cart.reduce(
    (total, item) => total + item.product.price * item.quantity, 0
  ) + (cart.reduce((total, item) => total + item.product.price * item.quantity, 0) > 100 ? 0 : 10) + 
  (cart.reduce((total, item) => total + item.product.price * item.quantity, 0) * 0.07);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = val.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (val.length > 2) {
      return `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    }
    
    return val;
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <h3 className="text-lg font-medium">Pay with Card</h3>
        <div className="ml-auto flex items-center gap-2">
          <Image src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg" alt="Visa" width={32} height={20} />
          <Image src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg" alt="Mastercard" width={32} height={20} />
          <Image src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/americanexpress.svg" alt="American Express" width={32} height={20} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-name">Cardholder Name</Label>
          <Input
            id="card-name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <Input
              id="card-number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              required
            />
            <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={3}
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Pay ${total.toFixed(2)}</span>
              </div>
            )}
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            This is a demo store. No real payments will be processed.
            <br />
            Use any card details for testing.
          </p>
        </div>
      </form>
      
      <div className="mt-6 rounded-md bg-muted p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Your order information</h4>
            <p className="text-sm text-muted-foreground">
              Shipping to: {shippingDetails?.address}, {shippingDetails?.city}, {shippingDetails?.state} {shippingDetails?.zipCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
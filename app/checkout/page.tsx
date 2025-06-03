'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronRight, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/cart-context';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { useToast } from '@/hooks/use-toast';
import { StripeCheckout } from '@/components/checkout/stripe-checkout';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState('shipping');
  const [shippingDetails, setShippingDetails] = useState<any>(null);
  
  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleShippingSubmit = (data: any) => {
    setShippingDetails(data);
    setStep('payment');
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
      variant: "default",
    });
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="container px-4 py-16 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>
      
      <div className="mb-8 flex items-center justify-center">
        <div className="flex w-full max-w-3xl items-center">
          <div className={`flex flex-1 flex-col items-center ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <Truck size={18} />
            </div>
            <span className="mt-2 text-sm font-medium">Shipping</span>
          </div>
          
          <div className="h-px flex-1 bg-border" />
          
          <div className={`flex flex-1 flex-col items-center ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <CreditCard size={18} />
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
          
          <div className="h-px flex-1 bg-border" />
          
          <div className={`flex flex-1 flex-col items-center ${step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <CheckCircle size={18} />
            </div>
            <span className="mt-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={step} className="w-full">
            <TabsContent value="shipping">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <Separator className="my-4" />
                  <CheckoutForm onSubmit={handleShippingSubmit} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payment">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <Separator className="my-4" />
                  <StripeCheckout 
                    onSuccess={handlePaymentSuccess} 
                    shippingDetails={shippingDetails}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary />
          {step === 'shipping' && (
            <div className="mt-4">
              <Button className="w-full\" form="checkout-form\" type="submit">
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
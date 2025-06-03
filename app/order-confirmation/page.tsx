'use client';

import Link from 'next/link';
import { CheckCircle, Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function OrderConfirmationPage() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="container flex flex-col items-center px-4 py-16 text-center md:px-6">
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Order Confirmed!</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Thank you for your purchase. We've sent a confirmation email with the order details.
      </p>
      
      <div className="mb-8 w-full max-w-md rounded-lg border p-6 text-left shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
        <Separator className="mb-4" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-primary">Processing</span>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Expected delivery: 3-5 business days</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/products">
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
        <Link href="/account/orders">
          <Button variant="outline">View Order History</Button>
        </Link>
      </div>
    </div>
  );
}
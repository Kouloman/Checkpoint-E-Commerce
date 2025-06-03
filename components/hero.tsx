import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section>
     {/*  <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/80 via-background/50 to-background/20" />
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      /> */}
      {/* <div className="container relative z-20 px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Discover Quality Products for Every Need
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Shop our curated collection of premium products at affordable prices. Fast shipping and exceptional customer service guaranteed.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div> */}
    </section>
  );
}
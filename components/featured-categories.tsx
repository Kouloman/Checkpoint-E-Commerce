import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Latest gadgets and tech accessories',
    href: '/categories/electronics',
  },
  {
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stylish apparel for every occasion',
    href: '/categories/clothing',
  },
  {
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Essential items for your living space',
    href: '/categories/home',
  },
  {
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Complete your look with our accessories',
    href: '/categories/accessories',
  },
];

export function FeaturedCategories() {
  return (
    <section className="container px-4 md:px-6">
     {/*  <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Browse our wide selection of products across various categories
        </p>
      </div> */}
      <div >
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group">
            {/* <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </div>
            </Card> */}
          </Link>
        ))}
      </div>
      {/* <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/categories" className="group">
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div> */}
    </section>
  );
}
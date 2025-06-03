import ProductGrid from '@/components/products/product-grid';
import { Hero } from '@/components/hero';
import { FeaturedCategories } from '@/components/featured-categories';
import { NewsletterSignup } from '@/components/newsletter-signup';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <FeaturedCategories />
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nos meilleures ventes</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Découvrez nos produits les plus populaires appréciés par nos clients
          </p>
        </div>
        <ProductGrid featured={true} />
      </section>
      <NewsletterSignup />
    </div>
  );
}
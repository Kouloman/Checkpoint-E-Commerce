/* import { ProductFilter } from '@/components/products/product-filter';
 */import ProductGrid from '@/components/products/product-grid';

export default function ProductsPage() {
  return (
    <div className="container px-4 py-16 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
{/*           <p className="text-muted-foreground">Browse our collection of high-quality products</p>
 */}        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* <div className="lg:col-span-1">
            <ProductFilter />
          </div> */}
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
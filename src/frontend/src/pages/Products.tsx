import { useState, useMemo } from 'react';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import ProductSearch from '@/components/ProductSearch';
import { useProducts } from '@/hooks/useQueries';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const { data: allProducts, isLoading } = useProducts(searchTerm);

  const categories = useMemo(() => {
    if (!allProducts) return [];
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [allProducts, category, priceRange]);

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-muted-foreground">
            Browse our comprehensive collection of digital marketing solutions
          </p>
        </div>

        <div className="mb-8">
          <ProductSearch onSearch={setSearchTerm} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters
              category={category}
              onCategoryChange={setCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              categories={categories}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
            </div>
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

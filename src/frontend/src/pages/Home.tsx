import Hero3D from '@/components/Hero3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useProducts } from '@/hooks/useQueries';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts('');

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      <Hero3D />

      <section className="py-20 bg-gradient-to-b from-background to-charcoalGray-900/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">Digital Marketing Pro</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver cutting-edge solutions that drive real results for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-depth-xl transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-deepTeal-500 to-deepTeal-600 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Data-Driven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Leverage advanced analytics and insights to optimize your marketing campaigns and maximize ROI.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-depth-xl transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-warmGold-500 to-warmGold-600 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-charcoalGray-900" />
                </div>
                <CardTitle>Expert Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Work with seasoned professionals who understand the latest trends and best practices in digital marketing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-depth-xl transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-deepTeal-500 to-warmGold-500 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get your campaigns up and running quickly with our streamlined processes and efficient workflows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">Products</span>
              </h2>
              <p className="text-muted-foreground">
                Explore our most popular digital marketing solutions
              </p>
            </div>
            <Button
              variant="outline"
              className="border-warmGold-500/50 hover:bg-warmGold-500/10"
              onClick={() => navigate({ to: '/products' })}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-card/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id.toString()} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

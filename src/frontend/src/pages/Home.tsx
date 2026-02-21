import Hero3D from '@/components/Hero3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Download } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useProducts, useMegaBundleProduct } from '@/hooks/useQueries';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts('');
  const { data: megaBundle, isLoading: megaBundleLoading } = useMegaBundleProduct();

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      <Hero3D />

      {megaBundle && !megaBundleLoading && (
        <section className="py-20 bg-gradient-to-b from-background via-neonBlue-900/10 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/generated/hero-collage.dim_1920x800.png')] opacity-5 bg-cover bg-center" />
          <div className="container relative z-10">
            <Card className="border-neonBlue-500/40 bg-gradient-to-br from-neonBlue-500/10 to-electricPurple-500/10 backdrop-blur shadow-neon-blue">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="mb-4 bg-electricPurple-500 text-white shadow-neon-purple animate-pulse-glow">
                      🔥 MEGA BUNDLE - LIMITED TIME
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-neonBlue-400 via-electricPurple-400 to-neonBlue-400 bg-clip-text text-transparent">
                        The Creator Vault
                      </span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-6">
                      Get <span className="text-neonBlue-400 font-bold">EVERYTHING</span> - All Reels, All Presets, All Courses, All Tools
                    </p>
                    <div className="flex items-baseline gap-3 mb-6">
                      <div className="text-3xl text-muted-foreground line-through">
                        ${(megaBundle.price * 2).toFixed(2)}
                      </div>
                      <div className="text-5xl font-bold bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">
                        ${megaBundle.price.toFixed(2)}
                      </div>
                    </div>
                    <ul className="space-y-2 mb-8">
                      <li className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-neonBlue-400" />
                        <span>5000+ Premium Assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="h-5 w-5 text-electricPurple-400" />
                        <span>Instant Download Access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-neonBlue-400" />
                        <span>Lifetime Updates Included</span>
                      </li>
                    </ul>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-electricPurple-500 to-neonBlue-500 hover:from-electricPurple-600 hover:to-neonBlue-600 text-white shadow-neon-purple font-bold text-lg"
                      onClick={() => navigate({ to: '/products/$id', params: { id: megaBundle.id.toString() } })}
                    >
                      Get The Mega Bundle Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <div className="relative">
                    <img 
                      src={megaBundle.imageUrl || '/assets/generated/hero-collage.dim_1920x800.png'} 
                      alt="Mega Bundle" 
                      className="rounded-lg shadow-depth-xl border border-neonBlue-500/30"
                    />
                    <div className="absolute -top-4 -right-4 bg-electricPurple-500 text-white px-6 py-3 rounded-full font-bold shadow-neon-purple">
                      Save 50%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-b from-background to-darkCharcoal-900/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">Creator Vault</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium digital assets at prices that won't break the bank
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur hover:shadow-neon-blue transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-neonBlue-500 to-neonBlue-600 flex items-center justify-center mb-4 shadow-neon-blue">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Instant Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Download immediately after purchase. No waiting, no hassle. Start creating right away.
                </p>
              </CardContent>
            </Card>

            <Card className="border-electricPurple-500/20 bg-card/50 backdrop-blur hover:shadow-neon-purple transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-electricPurple-500 to-electricPurple-600 flex items-center justify-center mb-4 shadow-neon-purple">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>100% Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Safe and encrypted transactions. Your data is protected with industry-standard security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur hover:shadow-neon-blue transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-neonBlue-500 to-electricPurple-500 flex items-center justify-center mb-4 shadow-neon-blue">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Lifetime Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Buy once, own forever. Access your purchases anytime, anywhere, on any device.
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
                Featured <span className="bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">Products</span>
              </h2>
              <p className="text-muted-foreground">
                Explore our most popular digital assets
              </p>
            </div>
            <Button
              variant="outline"
              className="border-neonBlue-500/50 hover:bg-neonBlue-500/10"
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

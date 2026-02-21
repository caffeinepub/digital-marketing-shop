import { useParams, useNavigate } from '@tanstack/react-router';
import { useProduct, useFrequentlyBoughtTogether } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Download, Shield, Play } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useRef, useEffect } from 'react';
import { Category } from '@/backend';
import { useCartStore } from '@/lib/cartStore';
import { toast } from 'sonner';

const categoryLabels: Record<Category, string> = {
  [Category.viralReelsLibrary]: 'Viral Reels Library',
  [Category.editingSuite]: 'Editing Suite',
  [Category.masterclassCourses]: 'Masterclass Courses',
  [Category.softwareTools]: 'Software Tools',
};

export default function ProductDetail() {
  const { id } = useParams({ from: '/products/$id' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(BigInt(id));
  const { data: frequentlyBought = [] } = useFrequentlyBoughtTogether(BigInt(id));
  const [quantity, setQuantity] = useState(1);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const addToCartRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      if (addToCartRef.current) {
        const rect = addToCartRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate({ to: '/products' })}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const originalPrice = (product.price * 1.5).toFixed(2);
  const hasVideo = product.videoPreviewUrl && !videoError;

  const handleAddAllToCart = () => {
    addItem(product, 1);
    frequentlyBought.forEach(item => {
      addItem(item, 1);
    });
    toast.success(`Added ${frequentlyBought.length + 1} items to cart!`);
  };

  const bundleTotal = frequentlyBought.reduce((sum, item) => sum + item.price, product.price);
  const bundleSavings = (bundleTotal * 0.1).toFixed(2);

  const descriptionLines = product.description.split('\n').filter(line => line.trim());

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/products' })}
          className="mb-8 hover:bg-neonBlue-500/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            className="aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-br from-neonBlue-500/20 to-electricPurple-500/20 flex items-center justify-center shadow-depth-xl relative"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            {hasVideo && isVideoHovered ? (
              <video
                src={product.videoPreviewUrl}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
                onError={() => setVideoError(true)}
              />
            ) : product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <ShoppingCart className="h-32 w-32 text-muted-foreground/30" />
            )}
            {hasVideo && !isVideoHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="bg-neonBlue-500/80 rounded-full p-4 shadow-neon-blue">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4 bg-electricPurple-500/20 text-electricPurple-300 border-electricPurple-500/30">
                {categoryLabels[product.category]}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-3 mb-2">
                <div className="text-2xl text-muted-foreground line-through">
                  ${originalPrice}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <img src="/assets/generated/trust-badge-secure.dim_64x64.png" alt="Secure Payment" className="h-8 w-8" />
                <img src="/assets/generated/trust-badge-instant.dim_64x64.png" alt="Instant Delivery" className="h-8 w-8" />
              </div>
            </div>

            <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 text-neonBlue-400">What's Included:</h3>
                <ul className="space-y-2">
                  {descriptionLines.map((line, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-neonBlue-500 mt-2 flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4" ref={addToCartRef}>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-neonBlue-500/30"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-neonBlue-500/30"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className={isSticky ? 'fixed top-20 right-8 z-40 w-96 bg-card/95 backdrop-blur p-4 rounded-lg shadow-neon-blue border border-neonBlue-500/30' : ''}>
                <AddToCartButton 
                  product={product} 
                  quantity={quantity} 
                  className="text-lg py-6 w-full bg-gradient-to-r from-neonBlue-500 to-neonBlue-600 hover:from-neonBlue-600 hover:to-neonBlue-700 shadow-neon-blue" 
                />
              </div>
            </div>

            <Card className="border-neonBlue-500/30 bg-neonBlue-500/5">
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-neonBlue-400" />
                    <span className="font-semibold text-neonBlue-300">Instant digital delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-neonBlue-400" />
                    <span className="font-semibold text-neonBlue-300">100% Secure payment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-neonBlue-500" />
                    <span>Lifetime access to all files</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {frequentlyBought.length > 0 && (
          <div className="mt-16">
            <Card className="border-electricPurple-500/30 bg-electricPurple-500/5 shadow-neon-purple">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">
                  Frequently Bought Together
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border border-neonBlue-500/30 rounded-lg p-4 bg-card/50">
                    <img src={product.imageUrl} alt={product.name} className="w-full aspect-video object-cover rounded mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-neonBlue-400 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  {frequentlyBought.slice(0, 2).map((item) => (
                    <div key={item.id.toString()} className="border border-electricPurple-500/30 rounded-lg p-4 bg-card/50">
                      <img src={item.imageUrl} alt={item.name} className="w-full aspect-video object-cover rounded mb-2" />
                      <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-electricPurple-400 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground">Bundle Price: <span className="line-through">${bundleTotal.toFixed(2)}</span></p>
                    <p className="text-2xl font-bold text-neonBlue-400">Total: ${(bundleTotal - parseFloat(bundleSavings)).toFixed(2)}</p>
                    <p className="text-sm text-electricPurple-400">Save ${bundleSavings}!</p>
                  </div>
                  <Button 
                    onClick={handleAddAllToCart}
                    className="bg-gradient-to-r from-electricPurple-500 to-electricPurple-600 hover:from-electricPurple-600 hover:to-electricPurple-700 shadow-neon-purple font-bold"
                    size="lg"
                  >
                    Add All to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

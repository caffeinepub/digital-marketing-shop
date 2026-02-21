import { useParams, useNavigate } from '@tanstack/react-router';
import { useProduct } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams({ from: '/products/$id' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(BigInt(id));
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/products' })}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-br from-deepTeal-500/20 to-warmGold-500/20 flex items-center justify-center shadow-depth-xl">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <ShoppingCart className="h-32 w-32 text-muted-foreground/30" />
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="text-4xl font-bold bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </div>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <AddToCartButton product={product} quantity={quantity} className="text-lg py-6" />
            </div>

            <Card className="border-deepTeal-500/30 bg-deepTeal-500/5">
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-warmGold-500" />
                    <span>Instant digital delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-warmGold-500" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-warmGold-500" />
                    <span>Money-back guarantee</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

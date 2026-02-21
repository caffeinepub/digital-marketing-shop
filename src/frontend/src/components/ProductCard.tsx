import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Product } from '@/backend';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden hover:shadow-depth-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="p-0">
        <div
          className="aspect-video w-full bg-gradient-to-br from-deepTeal-500/20 to-warmGold-500/20 cursor-pointer overflow-hidden"
          onClick={() => navigate({ to: '/products/$id', params: { id: product.id.toString() } })}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-lg line-clamp-1 cursor-pointer hover:text-warmGold-400 transition-colors"
            onClick={() => navigate({ to: '/products/$id', params: { id: product.id.toString() } })}
          >
            {product.name}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="text-2xl font-bold bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
          ${product.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}

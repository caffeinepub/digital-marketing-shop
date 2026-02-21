import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Play } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Product } from '@/backend';
import { Category } from '@/backend';
import AddToCartButton from './AddToCartButton';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<Category, string> = {
  [Category.viralReelsLibrary]: 'Viral Reels Library',
  [Category.editingSuite]: 'Editing Suite',
  [Category.masterclassCourses]: 'Masterclass Courses',
  [Category.softwareTools]: 'Software Tools',
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const hasVideo = product.videoPreviewUrl && !videoError;

  return (
    <Card 
      className="group overflow-hidden hover:shadow-neon-blue transition-all duration-300 border-neonBlue-500/20 bg-card/50 backdrop-blur"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div
          className="aspect-video w-full bg-gradient-to-br from-neonBlue-500/20 to-electricPurple-500/20 cursor-pointer relative overflow-hidden"
          onClick={() => navigate({ to: '/products/$id', params: { id: product.id.toString() } })}
        >
          {hasVideo && isHovered ? (
            <video
              src={product.videoPreviewUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            />
          ) : product.imageUrl ? (
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
          {hasVideo && !isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-neonBlue-500/80 rounded-full p-3 shadow-neon-blue">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2 bg-electricPurple-500/20 text-electricPurple-300 border-electricPurple-500/30">
          {categoryLabels[product.category]}
        </Badge>
        <h3 
          className="font-bold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-neonBlue-400 transition-colors"
          onClick={() => navigate({ to: '/products/$id', params: { id: product.id.toString() } })}
        >
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="text-2xl font-bold bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">
          ${product.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} quantity={1} className="w-full bg-gradient-to-r from-neonBlue-500 to-neonBlue-600 hover:from-neonBlue-600 hover:to-neonBlue-700 shadow-neon-blue" />
      </CardFooter>
    </Card>
  );
}

import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/cartStore';
import type { Product } from '@/backend';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addItem(product, quantity);
      setJustAdded(true);
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || justAdded}
      className={`w-full bg-gradient-to-r from-deepTeal-500 to-deepTeal-600 hover:from-deepTeal-600 hover:to-deepTeal-700 ${className}`}
    >
      {justAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </>
      )}
    </Button>
  );
}

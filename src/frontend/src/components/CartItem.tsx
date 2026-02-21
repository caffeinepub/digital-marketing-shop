import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import type { Product } from '@/backend';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-border/50">
      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-deepTeal-500/20 to-warmGold-500/20 flex items-center justify-center shrink-0">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-2xl">📦</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate">{product.name}</h4>
        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">${(product.price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}

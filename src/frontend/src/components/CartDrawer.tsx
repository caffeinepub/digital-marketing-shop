import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from '@tanstack/react-router';
import { useCartStore } from '@/lib/cartStore';
import CartItem from './CartItem';
import { ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const navigate = useNavigate();
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  const handleCheckout = () => {
    onOpenChange(false);
    navigate({ to: '/checkout' });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  navigate({ to: '/products' });
                }}
              >
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-2">
                {items.map((item) => (
                  <CartItem key={item.product.id.toString()} product={item.product} quantity={item.quantity} />
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-4">
              <div className="flex justify-between text-lg font-bold w-full">
                <span>Total</span>
                <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-deepTeal-500 to-deepTeal-600 hover:from-deepTeal-600 hover:to-deepTeal-700"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import { useCartStore } from '@/lib/cartStore';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-deepTeal-500 to-warmGold-500 shadow-depth-md" />
            <span className="text-xl font-bold bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
              Digital Marketing Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-warmGold-400"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium transition-colors hover:text-warmGold-400"
            >
              Products
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-warmGold-500 text-charcoalGray-900"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  to="/"
                  className="text-lg font-medium transition-colors hover:text-warmGold-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-lg font-medium transition-colors hover:text-warmGold-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({itemCount})
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import { useCartStore } from '@/lib/cartStore';
import ProductSearch from './ProductSearch';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (term: string) => {
    navigate({ to: '/products', search: { q: term } });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neonBlue-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-depth-md">
        <nav className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neonBlue-500 to-electricPurple-500 shadow-neon-blue" />
            <span className="text-xl font-bold bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent hidden sm:inline">
              Creator Vault
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <ProductSearch onSearch={handleSearch} placeholder="Search for courses, bundles..." />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-neonBlue-400"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium transition-colors hover:text-neonBlue-400"
            >
              Products
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-neonBlue-500/10"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-neonBlue-500/10"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-neonBlue-500 text-white shadow-neon-blue"
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
                <div className="mb-4">
                  <ProductSearch onSearch={(term) => {
                    handleSearch(term);
                    setMobileMenuOpen(false);
                  }} placeholder="Search..." />
                </div>
                <Link
                  to="/"
                  className="text-lg font-medium transition-colors hover:text-neonBlue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-lg font-medium transition-colors hover:text-neonBlue-400"
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

import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import CheckoutForm, { type CheckoutFormData } from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import { useCartStore } from '@/lib/cartStore';
import { useCheckout } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { mutateAsync: checkout, isPending } = useCheckout();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some products before checking out.</p>
            <Button onClick={() => navigate({ to: '/products' })}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: CheckoutFormData) => {
    try {
      const customerInfo = JSON.stringify(data);
      const order = await checkout(customerInfo);

      if (order) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate({
          to: '/order-confirmation/$orderId',
          params: { orderId: order.id.toString() },
        });
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout.');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/products' })}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
            Checkout
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isPending} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

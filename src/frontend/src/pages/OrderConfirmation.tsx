import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function OrderConfirmation() {
  const { orderId } = useParams({ from: '/order-confirmation/$orderId' });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-deepTeal-500 to-warmGold-500 mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Order <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">Confirmed!</span>
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur shadow-depth-xl">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-mono font-semibold">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-deepTeal-400">Pending</span>
            </div>

            <Separator />

            <div className="bg-deepTeal-500/5 border border-deepTeal-500/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                You will receive an email confirmation shortly with your order details and next steps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate({ to: '/products' })}
                className="flex-1 bg-gradient-to-r from-deepTeal-500 to-deepTeal-600 hover:from-deepTeal-600 hover:to-deepTeal-700"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/' })}
                className="flex-1"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

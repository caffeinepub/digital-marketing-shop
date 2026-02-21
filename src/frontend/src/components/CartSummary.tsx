import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  subtotal: number;
  tax?: number;
  shipping?: number;
}

export default function CartSummary({ subtotal, tax = 0, shipping = 0 }: CartSummaryProps) {
  const total = subtotal + tax + shipping;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        )}
        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
            ${total.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

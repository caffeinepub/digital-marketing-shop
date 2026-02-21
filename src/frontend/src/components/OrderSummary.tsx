import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/cartStore';

export default function OrderSummary() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id.toString()} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-muted-foreground">
                    ${item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

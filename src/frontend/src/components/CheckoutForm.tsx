import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface CheckoutFormData {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  return (
    <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-neonBlue-400">Contact Information</CardTitle>
        <p className="text-sm text-muted-foreground">No account needed - we'll email your download links</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="John Doe"
              className="border-neonBlue-500/30"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="john@example.com"
              className="border-neonBlue-500/30"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
            <p className="text-xs text-muted-foreground">We'll send your download links to this email</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address (Optional)</Label>
            <Input
              id="street"
              {...register('street')}
              placeholder="123 Main St"
              className="border-neonBlue-500/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City (Optional)</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="New York"
                className="border-neonBlue-500/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State (Optional)</Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="NY"
                className="border-neonBlue-500/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code (Optional)</Label>
              <Input
                id="postalCode"
                {...register('postalCode')}
                placeholder="10001"
                className="border-neonBlue-500/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country (Optional)</Label>
              <Input
                id="country"
                {...register('country')}
                placeholder="USA"
                className="border-neonBlue-500/30"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-neonBlue-500 to-neonBlue-600 hover:from-neonBlue-600 hover:to-neonBlue-700 shadow-neon-blue font-bold"
            size="lg"
          >
            {isSubmitting ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useOrderDownloadLinks } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderConfirmation() {
  const { orderId } = useParams({ from: '/order-confirmation/$orderId' });
  const navigate = useNavigate();
  const { data: downloadLinks = [], isLoading } = useOrderDownloadLinks(BigInt(orderId));

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neonBlue-500 to-electricPurple-500 mb-4 shadow-neon-blue">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Order <span className="bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">Confirmed!</span>
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your digital products are ready for download.
          </p>
        </div>

        <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur shadow-depth-xl mb-6">
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
              <span className="font-medium text-neonBlue-400">Completed</span>
            </div>

            <Separator />

            <div className="bg-neonBlue-500/5 border border-neonBlue-500/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-neonBlue-300 mb-2">
                ✨ Instant Download - Lifetime Access
              </p>
              <p className="text-sm text-muted-foreground">
                Your digital products are ready! Click the download links below to access your files. Save these links - you can access them anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <Card className="border-electricPurple-500/20 bg-card/50 backdrop-blur shadow-depth-xl mb-6">
            <CardHeader>
              <CardTitle>Download Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ) : downloadLinks.length > 0 ? (
          <Card className="border-electricPurple-500/20 bg-card/50 backdrop-blur shadow-depth-xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-electricPurple-400" />
                Download Your Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {downloadLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-electricPurple-500/30 hover:bg-electricPurple-500/10 hover:border-electricPurple-400"
                  >
                    <span>Product {index + 1} - Download Files</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </a>
              ))}
              <p className="text-xs text-muted-foreground mt-4">
                💡 Tip: These links provide access to cloud storage (Google Drive, Mega.nz, etc.) where your files are hosted. Bookmark this page for future access.
              </p>
            </CardContent>
          </Card>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate({ to: '/products' })}
            className="flex-1 bg-gradient-to-r from-neonBlue-500 to-neonBlue-600 hover:from-neonBlue-600 hover:to-neonBlue-700 shadow-neon-blue"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/' })}
            className="flex-1 border-electricPurple-500/50 hover:bg-electricPurple-500/10"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

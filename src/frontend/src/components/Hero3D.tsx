import Scene3D from './Scene3D';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function Hero3D() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      <div className="relative z-20 container h-full flex items-center">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepTeal-500/20 border border-deepTeal-500/30 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-warmGold-400" />
            <span className="text-sm font-medium text-warmGold-400">
              Premium Digital Marketing Solutions
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-deepTeal-300 via-warmGold-400 to-deepTeal-300 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="text-foreground">Digital Presence</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Elevate your brand with cutting-edge marketing strategies, stunning content creation, 
            and data-driven insights that deliver real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-deepTeal-500 to-deepTeal-600 hover:from-deepTeal-600 hover:to-deepTeal-700 text-white shadow-depth-lg"
              onClick={() => navigate({ to: '/products' })}
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-warmGold-500/50 hover:bg-warmGold-500/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          backgroundImage: 'url(/assets/generated/hero-collage.dim_1920x800.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      <div className="relative z-20 container h-full flex items-center">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neonBlue-500/20 border border-neonBlue-500/40 backdrop-blur-sm shadow-neon-blue">
            <Sparkles className="h-4 w-4 text-neonBlue-400 animate-pulse-glow" />
            <span className="text-sm font-bold text-neonBlue-300">
              Premium Digital Assets at Unbeatable Prices
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-neonBlue-400 via-electricPurple-400 to-neonBlue-400 bg-clip-text text-transparent">
              Unlock Your Creative Potential:
            </span>
            <br />
            <span className="text-foreground">5000+ Premium Assets</span>
            <br />
            <span className="text-3xl md:text-5xl bg-gradient-to-r from-electricPurple-400 to-neonBlue-400 bg-clip-text text-transparent">
              for the Price of a Pizza
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            <span className="text-neonBlue-400 font-semibold">Instant Download.</span>{' '}
            <span className="text-electricPurple-400 font-semibold">Lifetime Access.</span>{' '}
            <span className="text-neonBlue-400 font-semibold">100% Secure.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-neonBlue-500 to-neonBlue-600 hover:from-neonBlue-600 hover:to-neonBlue-700 text-white shadow-neon-blue font-bold text-lg"
              onClick={() => navigate({ to: '/products' })}
            >
              Shop All Bundles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-electricPurple-500/50 hover:bg-electricPurple-500/10 hover:border-electricPurple-400 font-bold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

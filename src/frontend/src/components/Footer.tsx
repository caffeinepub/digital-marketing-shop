import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'creator-vault';

  return (
    <footer className="border-t border-neonBlue-500/20 bg-darkCharcoal-900/50 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neonBlue-500 to-electricPurple-500 shadow-neon-blue" />
              <span className="font-bold bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">
                Creator Vault
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium digital assets for content creators, freelancers, and students at unbeatable prices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-neonBlue-400">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Viral Reels Library</li>
              <li>Editing Suite</li>
              <li>Masterclass Courses</li>
              <li>Software Tools</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-electricPurple-400">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Contact</li>
              <li>
                <Link to="/dmca" className="hover:text-neonBlue-400 transition-colors">
                  DMCA / Copyright
                </Link>
              </li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-neonBlue-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-neonBlue-400 transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-electricPurple-400 transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-neonBlue-400 transition-colors">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-electricPurple-400 transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neonBlue-500/20 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Creator Vault. Built with{' '}
            <Heart className="h-4 w-4 text-electricPurple-500 fill-electricPurple-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neonBlue-400 hover:text-neonBlue-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

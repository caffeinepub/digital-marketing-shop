import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'digital-marketing-shop';

  return (
    <footer className="border-t border-border/40 bg-charcoalGray-900/50 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-deepTeal-500 to-warmGold-500 shadow-depth-md" />
              <span className="font-bold bg-gradient-to-r from-deepTeal-400 to-warmGold-400 bg-clip-text text-transparent">
                Digital Marketing Pro
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium digital marketing solutions for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-warmGold-400">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>SEO Services</li>
              <li>Social Media Marketing</li>
              <li>Content Creation</li>
              <li>Analytics & Reporting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-warmGold-400">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-warmGold-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-warmGold-400 transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-warmGold-400 transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-warmGold-400 transition-colors">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-warmGold-400 transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Digital Marketing Pro. Built with{' '}
            <Heart className="h-4 w-4 text-warmGold-500 fill-warmGold-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warmGold-400 hover:text-warmGold-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

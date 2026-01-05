import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <Reveal variant="fade-up" stagger={100} index={0}>
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-gold tracking-widest">
                ÉCLAT PARFUM
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Where Elegance Meets Affordability. Premium fragrances crafted for the discerning Lebanese customer.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center
                             text-muted-foreground hover:text-gold hover:border-gold hover:bg-gold/10
                             transition-all duration-300 btn-interactive"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center
                             text-muted-foreground hover:text-gold hover:border-gold hover:bg-gold/10
                             transition-all duration-300 btn-interactive"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal variant="fade-up" stagger={100} index={1}>
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-foreground">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { href: '/men', label: 'Men Collection' },
                  { href: '/women', label: 'Women Collection' },
                  { href: '/bestsellers', label: 'Bestsellers' },
                  { href: '/about', label: 'About Us' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold transition-all duration-300 text-sm
                                 inline-block hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Contact */}
          <Reveal variant="fade-up" stagger={100} index={2}>
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-foreground">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                  <Phone className="h-4 w-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-gold transition-colors duration-300">+961 70 123 456</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                  <Mail className="h-4 w-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-gold transition-colors duration-300">info@eclatparfum.com</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground text-sm group">
                  <MapPin className="h-4 w-4 text-gold mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-gold transition-colors duration-300">Beirut, Lebanon</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Legal */}
          <Reveal variant="fade-up" stagger={100} index={3}>
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-foreground">
                Legal
              </h4>
              <ul className="space-y-3">
                {[
                  { href: '/privacy', label: 'Privacy Policy' },
                  { href: '/terms', label: 'Terms of Service' },
                  { href: '/contact', label: 'Contact Us' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold transition-all duration-300 text-sm
                                 inline-block hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade">
          <div className="border-t border-border/50 pt-6">
            <p className="text-center text-muted-foreground text-sm">
              ©2012 Éclat Parfum. All rights reserved.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;

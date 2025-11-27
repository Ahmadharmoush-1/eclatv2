import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8 px-4 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <Link to="/contact" className="text-foreground hover:text-accent transition-colors font-medium">
            Contact
          </Link>
          <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">FAQ</a>
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <a 
            href="https://facebook.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card p-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card p-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card p-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
        
        <p className="text-center text-muted-foreground text-sm">
          © 2024 Niche's Perfumes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gold/20 py-12 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          <Link to="/contact" className="text-gold hover:text-gold-light transition-colors font-medium uppercase tracking-wider">
            Contact
          </Link>
          <Link to="/faq" className="text-gold hover:text-gold-light transition-colors font-medium uppercase tracking-wider">
            FAQ
          </Link>
        </div>
        
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href="https://instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary p-3 rounded-full hover:bg-gold/10 border border-gold/20 hover:border-gold transition-all hover:scale-110"
          >
            <Instagram className="h-5 w-5 text-gold" />
          </a>
        </div>
        
        <p className="text-center text-gold-light text-sm font-light tracking-wide">
          © 2012 Éclat Parfum Beirut. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";
import SearchDialog from "./SearchDialog";
import logo from "@/assets/eclat-logo.png";

const Header = () => {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gold/10 text-gold hover:text-gold"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Éclat Parfum Beirut" 
              className="h-16 object-contain"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-gold/10 text-gold hover:text-gold"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-gold/10 text-gold hover:text-gold relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1 animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;

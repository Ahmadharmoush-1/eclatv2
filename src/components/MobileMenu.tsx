import { Home, ShoppingBag, Mail, HelpCircle, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => {
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: User, label: "Men's Perfumes", path: "/?gender=men" },
    { icon: Users, label: "Women's Perfumes", path: "/?gender=women" },
    { icon: ShoppingBag, label: "All Products", path: "/" },
    { icon: HelpCircle, label: "FAQ", path: "/faq" },
    { icon: Mail, label: "Contact", path: "/contact" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
        </SheetHeader>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <item.icon className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Making Luxury Affordable
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 Niche's Perfumes
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

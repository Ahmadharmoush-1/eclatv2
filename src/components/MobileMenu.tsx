import { Home, Mail, HelpCircle, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
}

const MobileMenu = ({
  open,
  onOpenChange,
  selectedTag = "all",
  onTagChange,
}: MobileMenuProps) => {
  const navigate = useNavigate();

  const mainMenuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: HelpCircle, label: "FAQ", path: "/faq" },
    { icon: Mail, label: "Contact", path: "/contact" },
  ];

  const handleCategoryClick = (tag: string) => {
    onTagChange?.(tag);
    onOpenChange(false);

    // ✅ update URL (important)
    if (tag === "all") {
      navigate("/");
    } else {
      navigate(`/?tag=${tag}`);
    }

    // scroll to products
    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const buttonClass = (tag: string) =>
  `w-full text-left p-3 rounded-lg transition-all ${
    selectedTag === tag
      ? "bg-gold text-black font-bold"
      : "bg-gold/10 hover:bg-gold/20 text-gold"
  }`;


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold text-gold">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/* MAIN NAV */}
        <nav className="space-y-2">
          {mainMenuItems.map((item) => (
            <Link
  key={item.label}
  to={item.path}
  onClick={() => onOpenChange(false)}
  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gold/10 border border-gold/20"
>
  <item.icon className="h-5 w-5 text-gold" />
  <span className="font-semibold text-gold">{item.label}</span>
</Link>

          ))}
        </nav>

        <Separator className="my-6 bg-gold/20" />

        {/* FILTERS */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-gold" />
            <h3 className="font-bold text-gold uppercase text-sm">
              Categories
            </h3>
          </div>

          <div className="space-y-2">
            <button
              className={buttonClass("all")}
              onClick={() => handleCategoryClick("all")}
            >
              All Products
            </button>

            <button
              className={buttonClass("men")}
              onClick={() => handleCategoryClick("men")}
            >
              Men
            </button>

            <button
              className={buttonClass("women")}
              onClick={() => handleCategoryClick("women")}
            >
              Women
            </button>

            <button
              className={buttonClass("bestsellers")}
              onClick={() => handleCategoryClick("bestsellers")}
            >
              Bestsellers 
            </button>
          </div>
        </div>

        <Separator className="my-6 bg-gold/20" />

        <div className="text-xs text-gold/70">
  © 2012 Éclat Parfum Beirut
</div>

      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

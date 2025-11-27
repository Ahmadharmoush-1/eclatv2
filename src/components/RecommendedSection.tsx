import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecommendedSection = () => {
  return (
    <div className="px-4 py-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">FOR YOU</p>
          <h2 className="text-2xl font-bold text-foreground">
            RECOMMENDED
            <div className="h-1 w-24 bg-accent mt-1 rounded-full"></div>
          </h2>
        </div>
        <Button variant="ghost" className="text-accent hover:text-accent/90 hover:bg-accent/10 font-semibold">
          VIEW ALL <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendedSection;

import { Star, BadgeCheck } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const ReviewCard = ({ name, rating, date, comment, verified }: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{name}</h4>
            {verified && (
              <BadgeCheck className="h-4 w-4 text-accent" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-rating-star text-rating-star" : "text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-foreground leading-relaxed">{comment}</p>
      {verified && (
        <p className="text-xs text-accent mt-3 flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" />
          Verified Purchase
        </p>
      )}
    </div>
  );
};

export default ReviewCard;

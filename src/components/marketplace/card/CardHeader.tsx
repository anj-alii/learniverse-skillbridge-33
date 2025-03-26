
import React from "react";
import { Star } from "lucide-react";
import CardBadge from "./CardBadge";
import { cn } from "@/lib/utils";

interface CardHeaderProps {
  imageUrl: string;
  title: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
}

const CardHeader: React.FC<CardHeaderProps> = ({
  imageUrl,
  title,
  category,
  level
}) => {
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="relative overflow-hidden h-48">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
      <img
        src={imageUrl || "https://placehold.co/400x250/9b87f5/ffffff?text=Skill"}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-3 left-3 z-10">
        <CardBadge variant="category">{category}</CardBadge>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <CardBadge className={cn(levelColors[level])}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </CardBadge>
      </div>
      <div className="absolute bottom-3 right-3 z-10">
        <CardBadge variant="credit" className="inline-flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span>1 credit</span>
        </CardBadge>
      </div>
    </div>
  );
};

export default CardHeader;

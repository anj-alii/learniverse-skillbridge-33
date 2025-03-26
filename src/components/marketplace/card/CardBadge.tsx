
import React from "react";
import { cn } from "@/lib/utils";

interface CardBadgeProps {
  variant?: "category" | "level" | "credit";
  children: React.ReactNode;
  className?: string;
}

const CardBadge: React.FC<CardBadgeProps> = ({ 
  variant = "category", 
  children, 
  className 
}) => {
  const baseStyles = "inline-block px-2 py-1 text-xs font-medium rounded-full";
  
  const variantStyles = {
    category: "bg-white/90 text-gray-800",
    level: "", // This will be dynamically applied based on the level
    credit: "bg-yellow-100 text-yellow-800",
  };
  
  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
};

export default CardBadge;

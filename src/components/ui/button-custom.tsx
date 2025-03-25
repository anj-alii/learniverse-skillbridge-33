
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  // Add safe properties for router integration
  to?: string;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonCustomProps>(
  ({ variant = "primary", size = "md", children, className, ...props }, ref) => {
    const baseStyles = "relative rounded-full font-medium inline-flex items-center justify-center transition-all duration-300 ease-out button-animation overflow-hidden";
    
    const variants = {
      primary: "bg-skill-purple text-white hover:bg-skill-vivid-purple shadow-md hover:shadow-lg",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      outline: "border border-skill-purple text-skill-purple hover:bg-skill-soft-purple",
      ghost: "text-skill-purple hover:bg-skill-soft-purple/30",
    };
    
    const sizes = {
      sm: "text-sm py-1.5 px-4",
      md: "text-base py-2 px-6",
      lg: "text-lg py-3 px-8",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };

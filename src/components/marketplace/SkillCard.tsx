
import React from "react";
import { User, Calendar, Video } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SkillCardProps {
  id: string;
  title: string;
  category: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
  };
  duration: string;
  format: "video" | "live" | "chat";
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  imageUrl: string;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  title,
  category,
  instructor,
  duration,
  format,
  level,
  description,
  imageUrl,
  index,
}) => {
  const { toast } = useToast();
  
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800",
  };

  const handleRequestSwap = () => {
    toast({
      title: "Swap Requested",
      description: `You requested to swap skills with ${instructor.name} for "${title}"`,
      duration: 3000,
    });
    
    console.log(`Requesting swap for skill: ${id} - ${title}`);
    // Here you would typically make an API call to save the swap request
  };

  const handleViewDetails = () => {
    toast({
      title: "Viewing Details",
      description: `You're viewing details for "${title}"`,
      duration: 3000,
    });
    
    console.log(`Viewing details for skill: ${id} - ${title}`);
    // Here you would typically navigate to a details page
  };

  return (
    <div 
      className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl group skill-card-appear"
      style={{ "--appear-delay": index } as React.CSSProperties}
    >
      <div className="relative overflow-hidden h-48">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img
          src={imageUrl || "https://placehold.co/400x250/9b87f5/ffffff?text=Skill"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className={cn("inline-block px-2 py-1 text-xs font-medium rounded-full", levelColors[level])}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={instructor.avatar || "https://placehold.co/100/9b87f5/ffffff?text=User"}
              alt={instructor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {instructor.name}
            </p>
            <div className="flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(instructor.rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({instructor.rating.toFixed(1)})
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            {format === "video" && <Video className="w-3 h-3 mr-1" />}
            {format === "live" && <User className="w-3 h-3 mr-1" />}
            <span>
              {format === "video" ? "Video" : format === "live" ? "Live Session" : "Chat"}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          <ButtonCustom
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleViewDetails}
          >
            Details
          </ButtonCustom>
          <ButtonCustom
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleRequestSwap}
          >
            Request Swap
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;


import React from "react";
import { Calendar, Video, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillInfoProps {
  duration: string;
  format: "video" | "live" | "chat";
  description: string;
  onFormatClick: () => void;
}

const SkillInfo: React.FC<SkillInfoProps> = ({
  duration,
  format,
  description,
  onFormatClick
}) => {
  return (
    <>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{duration}</span>
        </div>
        <div 
          className={cn(
            "flex items-center", 
            format === "live" && "cursor-pointer hover:text-skill-purple"
          )}
          onClick={format === "live" ? onFormatClick : undefined}
        >
          {format === "video" && <Video className="w-3 h-3 mr-1" />}
          {format === "live" && <User className="w-3 h-3 mr-1" />}
          {format === "chat" && <MessageSquare className="w-3 h-3 mr-1" />}
          <span>
            {format === "video" ? "Video" : format === "live" ? "Live Session" : "Chat"}
          </span>
        </div>
      </div>
    </>
  );
};

export default SkillInfo;

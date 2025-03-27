
import React from "react";
import { Calendar, Video, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillInfoProps {
  duration: string;
  format: "video" | "live" | "chat" | "1-on-1" | "group" | "course" | "materials";
  description: string;
  onFormatClick: () => void;
}

const SkillInfo: React.FC<SkillInfoProps> = ({
  duration,
  format,
  description,
  onFormatClick
}) => {
  const getFormatIcon = () => {
    switch (format) {
      case "video":
      case "course":
        return <Video className="w-3 h-3 mr-1" />;
      case "live":
      case "1-on-1":
      case "group":
        return <User className="w-3 h-3 mr-1" />;
      case "chat":
      case "materials":
      default:
        return <MessageSquare className="w-3 h-3 mr-1" />;
    }
  };

  const getFormatLabel = () => {
    switch (format) {
      case "video": return "Video";
      case "live": return "Live Session";
      case "chat": return "Chat";
      case "1-on-1": return "1-on-1 Session";
      case "group": return "Group Session";
      case "course": return "Course";
      case "materials": return "Materials";
      default: return format;
    }
  };

  const isInteractive = format === "live" || format === "1-on-1" || format === "group";

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
            isInteractive && "cursor-pointer hover:text-skill-purple"
          )}
          onClick={isInteractive ? onFormatClick : undefined}
        >
          {getFormatIcon()}
          <span>{getFormatLabel()}</span>
        </div>
      </div>
    </>
  );
};

export default SkillInfo;

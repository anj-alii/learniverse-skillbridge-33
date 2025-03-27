
import React from "react";
import { Clock, Users, Video, Book, MessageCircle } from "lucide-react";

interface SkillInfoProps {
  duration?: string;
  format: "video" | "live" | "chat" | "1-on-1" | "group" | "course" | "materials";
  description: string;
  onFormatClick?: () => void;
}

const SkillInfo: React.FC<SkillInfoProps> = ({
  duration,
  format,
  description,
  onFormatClick,
}) => {
  const formatIcons = {
    "video": <Video className="w-4 h-4 mr-1" />,
    "live": <Video className="w-4 h-4 mr-1" />,
    "chat": <MessageCircle className="w-4 h-4 mr-1" />,
    "1-on-1": <Users className="w-4 h-4 mr-1" />,
    "group": <Users className="w-4 h-4 mr-1" />,
    "course": <Book className="w-4 h-4 mr-1" />,
    "materials": <Book className="w-4 h-4 mr-1" />,
  };

  const formatLabels = {
    "video": "Video",
    "live": "Live",
    "chat": "Chat",
    "1-on-1": "1-on-1",
    "group": "Group",
    "course": "Course",
    "materials": "Materials",
  };

  return (
    <div className="mb-3">
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
        {duration && (
          <span className="flex items-center mr-3">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </span>
        )}
        <span 
          className="flex items-center cursor-pointer hover:text-skill-vivid-purple"
          onClick={onFormatClick}
        >
          {formatIcons[format]}
          {formatLabels[format]}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default SkillInfo;

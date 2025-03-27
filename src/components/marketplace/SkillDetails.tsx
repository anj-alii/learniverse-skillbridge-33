
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Skill } from "@/services/skillService";
import { Clock, Users, Video, Book, MessageCircle, Star } from "lucide-react";
import InstructorInfo from "./card/InstructorInfo";

interface SkillDetailsProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSwap: () => void;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({
  skill,
  isOpen,
  onClose,
  onRequestSwap,
}) => {
  if (!skill) return null;

  const formatIcons = {
    "video": <Video className="w-5 h-5 mr-2" />,
    "live": <Video className="w-5 h-5 mr-2" />,
    "chat": <MessageCircle className="w-5 h-5 mr-2" />,
    "1-on-1": <Users className="w-5 h-5 mr-2" />,
    "group": <Users className="w-5 h-5 mr-2" />,
    "course": <Book className="w-5 h-5 mr-2" />,
    "materials": <Book className="w-5 h-5 mr-2" />,
  };

  const formatLabels = {
    "video": "Video Course",
    "live": "Live Sessions",
    "chat": "Chat Support",
    "1-on-1": "One-on-One Training",
    "group": "Group Sessions",
    "course": "Structured Course",
    "materials": "Learning Materials",
  };

  const levelColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{skill.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${levelColors[skill.level]}`}>
                {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {skill.category}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
          <img
            src={skill.image || "https://placehold.co/600x400/9b87f5/ffffff?text=Skill"}
            alt={skill.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
            1 credit
          </div>
        </div>

        <div className="space-y-4">
          <InstructorInfo instructor={skill.instructor} />

          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            {skill.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {skill.duration}
              </div>
            )}
            <div className="flex items-center">
              {formatIcons[skill.format]}
              {formatLabels[skill.format]}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {skill.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Core techniques and principles for {skill.title}</li>
              <li>Practical applications and hands-on exercises</li>
              <li>Expert tips from experienced instructors</li>
              <li>Personalized feedback on your progress</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between gap-2 mt-4">
          <ButtonCustom
            variant="outline"
            onClick={onClose}
          >
            Close
          </ButtonCustom>
          <ButtonCustom
            variant="primary"
            onClick={onRequestSwap}
          >
            Request Skill Swap
          </ButtonCustom>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDetails;

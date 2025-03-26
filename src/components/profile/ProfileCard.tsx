
import React from "react";
import { Calendar, Video, MessageSquare, Star } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useUser } from "@/contexts/UserContext";

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    location: string;
    joinDate: string;
    skillsToTeach: string[];
    skillsToLearn: string[];
    totalSessions: number;
    rating: number;
    badges: string[];
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { user: currentUser } = useUser();
  
  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <div className="relative h-32 bg-gradient-to-r from-skill-purple to-skill-vivid-purple">
        <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
          <img
            src={user.avatar || "https://placehold.co/300/9b87f5/ffffff?text=User"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="pt-20 px-6 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <span className="mr-2">{user.location}</span>
              <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="ml-2">Joined {user.joinDate}</span>
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(user.rating)
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
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                ({user.rating.toFixed(1)})
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.totalSessions} sessions completed
            </p>
          </div>
        </div>
        
        {currentUser && (
          <div className="mb-4 flex items-center bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Skill Swap Credits: <span className="font-bold text-yellow-600 dark:text-yellow-400">{currentUser.credits}</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use these to request skill swaps with other users
              </p>
            </div>
          </div>
        )}
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {user.bio}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
              Skills to Teach
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsToTeach.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-sm bg-skill-soft-purple text-skill-purple rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
              Skills to Learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsToLearn.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-16"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
                  <span className="text-lg">{badge.charAt(0)}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <ButtonCustom
            variant="primary"
            size="md"
            className="flex items-center justify-center sm:flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </ButtonCustom>
          <ButtonCustom
            variant="outline"
            size="md"
            className="flex items-center justify-center sm:flex-1"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;


import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import CardHeader from "./card/CardHeader";
import InstructorInfo from "./card/InstructorInfo";
import SkillInfo from "./card/SkillInfo";
import ChatInput from "./card/ChatInput";
import { requestSession } from "@/services/skillService";
import SkillDetails from "./SkillDetails";

interface SkillCardProps {
  id: string;
  title: string;
  category: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  duration?: string;
  format: "video" | "live" | "chat" | "1-on-1" | "group" | "course" | "materials";
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  imageUrl?: string;
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
  const { user, useCredit, showUploadSkillPrompt } = useUser();
  const [showChatInput, setShowChatInput] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const handleRequestSwap = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request skill swaps",
        duration: 3000,
      });
      return;
    }

    setIsRequesting(true);
    try {
      // First check if user has credits
      const hasCredit = await useCredit();
      
      if (hasCredit) {
        // Create session request
        await requestSession(id, instructor.id, user.id);
        
        toast({
          title: "Swap Requested",
          description: `You requested to swap skills with ${instructor.name} for "${title}". Used 1 credit.`,
          duration: 3000,
        });
      } else {
        if (user.credits <= 0) {
          showUploadSkillPrompt();
        } else {
          toast({
            title: "Insufficient Credits",
            description: "You don't have enough credits to request a skill swap",
            variant: "destructive",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error requesting swap:", error);
      toast({
        title: "Request Failed",
        description: "There was an error requesting the skill swap. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const handleViewDetails = () => {
    setShowDetails(true);
    console.log(`Viewing details for skill: ${id} - ${title}`);
  };

  const handleSendMessage = async (chatMessage: string) => {
    toast({
      title: "Message Sent",
      description: `Your message was sent to ${instructor.name}`,
      duration: 3000,
    });
    
    console.log(`Message to ${instructor.name} about ${title}: ${chatMessage}`);
    setShowChatInput(false);
  };

  const handleLiveSessionEnquiry = () => {
    setShowChatInput(!showChatInput);
  };

  return (
    <>
      <div 
        className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl group skill-card-appear"
        style={{ "--appear-delay": index } as React.CSSProperties}
      >
        <CardHeader 
          imageUrl={imageUrl || "https://placehold.co/600x400/9b87f5/ffffff?text=Skill"}
          title={title}
          category={category}
          level={level}
        />
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {title}
          </h3>
          
          <InstructorInfo instructor={instructor} />
          
          <SkillInfo 
            duration={duration || "Custom"}
            format="1-on-1"
            description={description}
            onFormatClick={handleLiveSessionEnquiry}
          />
          
          {showChatInput && (
            <ChatInput 
              instructorName={instructor.name}
              onSendMessage={handleSendMessage}
            />
          )}
          
          <div className="flex justify-between gap-2">
            <ButtonCustom
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleViewDetails}
            >
              View Details
            </ButtonCustom>
            <ButtonCustom
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleRequestSwap}
              disabled={isRequesting}
            >
              {isRequesting ? "Requesting..." : "Request Swap"}
            </ButtonCustom>
          </div>
        </div>
      </div>

      <SkillDetails 
        skill={showDetails ? {
          id,
          title,
          category,
          instructor,
          duration: duration || "Custom",
          format: "1-on-1",
          level,
          description,
          price: 1,
          image: imageUrl,
          is_active: true,
          created_at: new Date().toISOString(),
        } : null}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onRequestSwap={handleRequestSwap}
      />
    </>
  );
};

export default SkillCard;

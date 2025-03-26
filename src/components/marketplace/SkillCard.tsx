
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import CardHeader from "./card/CardHeader";
import InstructorInfo from "./card/InstructorInfo";
import SkillInfo from "./card/SkillInfo";
import ChatInput from "./card/ChatInput";

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
  const { user, useCredit } = useUser();
  const [showChatInput, setShowChatInput] = useState(false);
  
  const handleRequestSwap = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request skill swaps",
        duration: 3000,
      });
      return;
    }

    if (useCredit()) {
      toast({
        title: "Swap Requested",
        description: `You requested to swap skills with ${instructor.name} for "${title}". Used 1 credit.`,
        duration: 3000,
      });
      
      console.log(`Requesting swap for skill: ${id} - ${title}`);
      // Here you would typically make an API call to save the swap request
    } else {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to request a skill swap",
        variant: "destructive",
        duration: 3000,
      });
    }
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

  const handleSendMessage = (chatMessage: string) => {
    toast({
      title: "Message Sent",
      description: `Your message was sent to ${instructor.name}`,
      duration: 3000,
    });
    
    console.log(`Message to ${instructor.name} about ${title}: ${chatMessage}`);
    setShowChatInput(false);
  };

  const handleLiveSessionEnquiry = () => {
    if (format === "live") {
      setShowChatInput(!showChatInput);
    } else {
      handleViewDetails();
    }
  };

  return (
    <div 
      className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl group skill-card-appear"
      style={{ "--appear-delay": index } as React.CSSProperties}
    >
      <CardHeader 
        imageUrl={imageUrl}
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
          duration={duration}
          format={format}
          description={description}
          onFormatClick={handleLiveSessionEnquiry}
        />
        
        {showChatInput && format === "live" && (
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
            onClick={format === "live" ? handleLiveSessionEnquiry : handleViewDetails}
          >
            {format === "live" ? "Enquire" : "Details"}
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

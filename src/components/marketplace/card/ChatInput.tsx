
import React, { useState } from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface ChatInputProps {
  instructorName: string;
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ instructorName, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Ask ${instructorName} about this session...`}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-skill-purple focus:border-transparent"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <ButtonCustom
          variant="primary"
          size="sm"
          onClick={handleSend}
          className="px-3 py-2"
        >
          Send
        </ButtonCustom>
      </div>
    </div>
  );
};

export default ChatInput;

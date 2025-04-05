
import React from 'react';
import { Play } from 'lucide-react';
import { Message } from '../types';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  playAudio: (audioUrl?: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, playAudio }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={cn(
      "max-w-[80%] mb-4",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        "p-4 rounded-2xl relative",
        isUser 
          ? "bg-[hsl(var(--user-message))] text-white rounded-br-none" 
          : "bg-[hsl(var(--bot-message))] text-gray-900 rounded-bl-none"
      )}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        
        {!isUser && message.audioUrl && (
          <button 
            onClick={() => playAudio(message.audioUrl)} 
            className="absolute -bottom-5 right-0 bg-blue-500 text-white p-1 rounded-full"
          >
            <Play size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

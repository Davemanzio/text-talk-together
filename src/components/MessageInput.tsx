
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 flex items-center gap-2 border-t bg-white">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isMobile ? "Scrivi..." : "Scrivi un messaggio..."}
        className="flex-1 py-3 px-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
        disabled={!message.trim()}
        aria-label="Invia messaggio"
      >
        <Send size={isMobile ? 18 : 20} />
      </button>
    </form>
  );
};

export default MessageInput;

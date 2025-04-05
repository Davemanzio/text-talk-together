
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../types';

interface ChatHeaderProps {
  character: Character;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ character }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-4 bg-[hsl(var(--chat-header))] text-white">
      <button 
        onClick={() => navigate('/')}
        className="mr-4 hover:bg-blue-800 rounded-full p-1"
      >
        <ArrowLeft size={24} />
      </button>
      <div>
        <h1 className="text-2xl font-semibold">Chat</h1>
        <p className="text-sm opacity-80">{character.name}</p>
      </div>
    </div>
  );
};

export default ChatHeader;

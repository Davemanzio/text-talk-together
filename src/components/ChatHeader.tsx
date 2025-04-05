
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Character, Language } from '../types';

interface ChatHeaderProps {
  character: Character;
  language?: Language | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ character, language }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-3 border-b bg-white">
      <button
        onClick={() => navigate('/')}
        className="p-2 mr-2 rounded-full hover:bg-gray-100"
        aria-label="Torna indietro"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold mr-3">
          {character.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{character.name}</div>
          <div className="text-sm text-gray-500 flex items-center">
            {language && (
              <span className="mr-1">{language.flag}</span>
            )}
            {language ? language.name : 'Italiano'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;


import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Character, Language } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { getLanguageById } from '../data/scenarios';

interface ChatHeaderProps {
  character: Character;
  language?: Language | null;
  languageId?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ character, language, languageId }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // If we have languageId but no language object, try to get it
  const displayLanguage = language || (languageId ? getLanguageById(languageId) : null);

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
          <div className="font-medium">{isMobile && character.name.length > 15 ? `${character.name.substring(0, 15)}...` : character.name}</div>
          <div className="text-sm text-gray-500 flex items-center">
            {displayLanguage && (
              <span className="mr-1">{displayLanguage.flag}</span>
            )}
            {displayLanguage ? (isMobile ? displayLanguage.name : displayLanguage.nativeName) : 'Italiano'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

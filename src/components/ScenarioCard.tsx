
import React from 'react';
import { Scenario } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScenarioCardProps {
  scenario: Scenario;
  languageId: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, languageId }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const character = scenario.characters[0]; // Per ora prendiamo solo il primo personaggio

  const handleClick = () => {
    navigate(`/chat/${scenario.id}/${character.id}?lang=${languageId}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <CardHeader className="pb-2 px-4 py-3 md:px-6 md:py-4">
        <CardTitle className="text-base md:text-lg">{scenario.title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-sm md:text-base">
            {character.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-sm md:text-base">{character.name}</p>
            <p className="text-xs md:text-sm text-gray-500">
              {isMobile && character.description.length > 40 
                ? `${character.description.substring(0, 40)}...` 
                : character.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioCard;

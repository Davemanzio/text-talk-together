
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

  // Default image if none provided
  const scenarioImage = scenario.imageUrl || 
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden" onClick={handleClick}>
      <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-100 relative">
        <img 
          src={scenarioImage} 
          alt={scenario.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
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

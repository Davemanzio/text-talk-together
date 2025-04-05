
import React from 'react';
import { Scenario } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ScenarioCardProps {
  scenario: Scenario;
  languageId: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, languageId }) => {
  const navigate = useNavigate();
  const character = scenario.characters[0]; // Per ora prendiamo solo il primo personaggio

  const handleClick = () => {
    navigate(`/chat/${scenario.id}/${character.id}?lang=${languageId}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <CardHeader className="pb-2">
        <CardTitle>{scenario.title}</CardTitle>
        <CardDescription>{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
            {character.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{character.name}</p>
            <p className="text-sm text-gray-500">{character.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioCard;

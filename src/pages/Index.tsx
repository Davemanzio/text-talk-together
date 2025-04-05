
import React, { useState } from 'react';
import { scenarios } from '../data/scenarios';
import ScenarioCard from '../components/ScenarioCard';
import LanguageSelector from '../components/LanguageSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Briefcase, Code } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('it');
  const isMobile = useIsMobile();

  const dailyScenarios = scenarios.filter(scenario => scenario.category === 'daily');
  const businessScenarios = scenarios.filter(scenario => scenario.category === 'business');
  const technicalScenarios = scenarios.filter(scenario => scenario.category === 'technical');

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <header className="text-center my-6 md:my-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Text Talk Together</h1>
        <p className="text-base md:text-xl text-gray-600 mb-4">
          Simula conversazioni reali con personaggi virtuali per imparare una nuova lingua
        </p>
        
        <div className="flex justify-center mb-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </header>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Scegli uno scenario</h2>
        
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-6">
            <TabsTrigger value="daily" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Book className="h-3 w-3 md:h-4 md:w-4" />
              <span>{isMobile ? "Quotid." : "Quotidiano"}</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Briefcase className="h-3 w-3 md:h-4 md:w-4" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Code className="h-3 w-3 md:h-4 md:w-4" />
              <span>{isMobile ? "Tecnico" : "Tecnico"}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {dailyScenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                  languageId={selectedLanguage}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="business">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {businessScenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                  languageId={selectedLanguage}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="technical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {technicalScenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                  languageId={selectedLanguage}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mt-8 md:mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Come funziona</h2>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <ol className="list-decimal list-inside space-y-1 md:space-y-2">
            <li className="text-base md:text-lg">Scegli la lingua che vuoi imparare</li>
            <li className="text-base md:text-lg">Seleziona uno scenario di conversazione</li>
            <li className="text-base md:text-lg">Invia messaggi al personaggio virtuale</li>
            <li className="text-base md:text-lg">Ascolta le risposte audio generate automaticamente</li>
            <li className="text-base md:text-lg">Esercitati in conversazioni realistiche</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Index;

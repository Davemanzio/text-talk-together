
import React, { useState } from 'react';
import { scenarios } from '../data/scenarios';
import ScenarioCard from '../components/ScenarioCard';
import LanguageSelector from '../components/LanguageSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Briefcase, Code, ArrowRight, MessageCircle, Headphones, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('it');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const dailyScenarios = scenarios.filter(scenario => scenario.category === 'daily');
  const businessScenarios = scenarios.filter(scenario => scenario.category === 'business');
  const technicalScenarios = scenarios.filter(scenario => scenario.category === 'technical');

  // Select first scenario for the demo button
  const firstScenario = scenarios[0];
  const firstCharacter = firstScenario?.characters[0];

  const handleStartClick = () => {
    if (firstScenario && firstCharacter) {
      navigate(`/chat/${firstScenario.id}/${firstCharacter.id}?lang=${selectedLanguage}`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 mb-8 md:mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 -z-10 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 -z-20"></div>
        
        <div className="text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            TTT
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-2">TextTalkTogether</p>
          <p className="text-base md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Impara una nuova lingua attraverso conversazioni realistiche con personaggi virtuali
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            
            <Button 
              onClick={handleStartClick}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition-all"
            >
              Inizia ora <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center mt-4 md:mt-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-sm md:text-base">Chat realistiche</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Headphones className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-sm md:text-base">Audio generato</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-sm md:text-base">Multiple lingue</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Preview Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Anteprima degli scenari</h2>
        
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {scenarios.slice(0, 5).map((scenario) => (
              <CarouselItem key={scenario.id}>
                <div className="p-1">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="h-40 md:h-56 bg-gradient-to-r from-blue-100 to-indigo-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-3xl md:text-4xl text-blue-600 font-semibold">
                          {scenario.characters[0].name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{scenario.title}</h3>
                      <p className="text-sm md:text-base text-gray-600 mb-4">{scenario.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {scenario.category === 'daily' ? 'Quotidiano' : 
                           scenario.category === 'business' ? 'Business' : 'Tecnico'}
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                          {scenario.characters[0].name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </section>
      
      {/* Scenario Categories */}
      <section className="mb-12">
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

      {/* How it works section */}
      <section className="mt-8 md:mt-12 mb-8">
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
      
      {/* CTA Section */}
      <section className="py-8 md:py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto a iniziare?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Migliora le tue competenze linguistiche attraverso conversazioni reali con personaggi virtuali.
        </p>
        <Button 
          onClick={handleStartClick}
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-md transition-all"
        >
          Inizia il training <ArrowRight className="ml-2" />
        </Button>
      </section>
    </div>
  );
};

export default Index;

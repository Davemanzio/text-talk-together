
import React from 'react';
import { scenarios } from '../data/scenarios';
import ScenarioCard from '../components/ScenarioCard';

const Index = () => {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold mb-2">Text Talk Together</h1>
        <p className="text-xl text-gray-600 mb-8">
          Simula conversazioni reali con personaggi virtuali
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Scegli uno scenario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Come funziona</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ol className="list-decimal list-inside space-y-2">
            <li className="text-lg">Scegli uno scenario di conversazione</li>
            <li className="text-lg">Invia messaggi al personaggio virtuale</li>
            <li className="text-lg">Ascolta le risposte audio generate automaticamente</li>
            <li className="text-lg">Esercitati in conversazioni realistiche</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Index;

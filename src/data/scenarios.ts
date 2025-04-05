
import { Scenario, Character } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'restaurant',
    title: 'Al Ristorante',
    description: 'Prenota un tavolo e ordina cibo in un ristorante',
    characters: [
      {
        id: 'host',
        name: 'Cameriere',
        description: 'Un cameriere professionale e cordiale',
        scenario: 'Sei un cameriere in un ristorante elegante e stai aiutando il cliente a prenotare un tavolo e a rispondere alle sue domande sul menu.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Acquista vestiti in un negozio di moda',
    characters: [
      {
        id: 'assistant',
        name: 'Commesso',
        description: 'Un commesso disponibile e alla moda',
        scenario: 'Sei un commesso in un negozio di abbigliamento e stai aiutando il cliente a trovare i vestiti giusti per un evento speciale.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'travel',
    title: 'Viaggi',
    description: 'Prenota un volo e chiedi informazioni sulle destinazioni',
    characters: [
      {
        id: 'agent',
        name: 'Agente di Viaggio',
        description: 'Un agente di viaggio esperto e disponibile',
        scenario: 'Sei un agente di viaggio che aiuta il cliente a trovare e prenotare voli verso diverse destinazioni, fornendo consigli e suggerimenti sulle mete turistiche.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'hotel',
    title: 'In Hotel',
    description: 'Fai il check-in e chiedi informazioni sulla struttura',
    characters: [
      {
        id: 'receptionist',
        name: 'Receptionist',
        description: 'Un receptionist professionale e cordiale',
        scenario: 'Sei un receptionist in un hotel di lusso e stai aiutando il cliente con il check-in e fornendo informazioni sui servizi disponibili nell\'hotel.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};

export const getCharacterById = (scenarioId: string, characterId: string): Character | undefined => {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return undefined;
  return scenario.characters.find(character => character.id === characterId);
};

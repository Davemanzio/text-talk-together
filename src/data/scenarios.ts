
import { Scenario, Character, Language } from '../types';

export const languages: Language[] = [
  {
    id: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹'
  },
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  },
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵'
  }
];

export const scenarios: Scenario[] = [
  // Scenari quotidiani
  {
    id: 'restaurant',
    title: 'Al Ristorante',
    description: 'Prenota un tavolo e ordina cibo in un ristorante',
    category: 'daily',
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
    category: 'daily',
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
    category: 'daily',
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
    category: 'daily',
    characters: [
      {
        id: 'receptionist',
        name: 'Receptionist',
        description: 'Un receptionist professionale e cordiale',
        scenario: 'Sei un receptionist in un hotel di lusso e stai aiutando il cliente con il check-in e fornendo informazioni sui servizi disponibili nell\'hotel.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  
  // Scenari business
  {
    id: 'meeting',
    title: 'Riunione di Lavoro',
    description: 'Partecipa a una riunione di lavoro e discuti progetti',
    category: 'business',
    characters: [
      {
        id: 'colleague',
        name: 'Collega',
        description: 'Un collega con cui devi discutere progetti',
        scenario: 'Sei un collega in una riunione di lavoro. Aiuta il cliente a comprendere i dettagli di un progetto e discuti obiettivi e scadenze.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'interview',
    title: 'Colloquio di Lavoro',
    description: 'Affronta un colloquio per una posizione lavorativa',
    category: 'business',
    characters: [
      {
        id: 'interviewer',
        name: 'Selezionatore',
        description: 'Un selezionatore che conduce il colloquio di lavoro',
        scenario: 'Sei un selezionatore che sta conducendo un colloquio di lavoro. Fai domande al candidato sulla sua esperienza, competenze e aspettative.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'negotiation',
    title: 'Negoziazione',
    description: 'Negozia i termini di un contratto o di un accordo',
    category: 'business',
    characters: [
      {
        id: 'partner',
        name: 'Partner Commerciale',
        description: 'Un partner commerciale con cui devi negoziare',
        scenario: 'Sei un partner commerciale che sta negoziando un accordo. Discuti termini, condizioni e prezzi per raggiungere un accordo vantaggioso per entrambe le parti.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  
  // Scenari tecnici
  {
    id: 'programming',
    title: 'Programmazione',
    description: 'Discuti di problemi di programmazione e soluzioni tecniche',
    category: 'technical',
    characters: [
      {
        id: 'developer',
        name: 'Sviluppatore',
        description: 'Uno sviluppatore esperto con cui discutere di codice',
        scenario: 'Sei uno sviluppatore esperto. Aiuta il cliente a comprendere concetti di programmazione, risolvere bug o discutere di architetture software.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'it_support',
    title: 'Supporto IT',
    description: 'Chiedi assistenza per problemi tecnici',
    category: 'technical',
    characters: [
      {
        id: 'technician',
        name: 'Tecnico IT',
        description: 'Un tecnico IT che può aiutare con problemi tecnici',
        scenario: 'Sei un tecnico del supporto IT. Aiuta il cliente a diagnosticare e risolvere problemi con computer, software o dispositivi mobili.',
        avatarUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: 'data_analysis',
    title: 'Analisi Dati',
    description: 'Discuti di analisi dati e interpreta risultati',
    category: 'technical',
    characters: [
      {
        id: 'analyst',
        name: 'Analista Dati',
        description: 'Un analista dati che può aiutare con l\'interpretazione dei dati',
        scenario: 'Sei un analista dati esperto. Aiuta il cliente a comprendere metodologie di analisi, interpretare risultati e prendere decisioni basate sui dati.',
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

export const getLanguageById = (id: string): Language | undefined => {
  return languages.find(language => language.id === id);
};

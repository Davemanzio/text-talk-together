
export interface Character {
  id: string;
  name: string;
  description: string;
  scenario: string;
  avatarUrl?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  characters: Character[];
  category: 'daily' | 'business' | 'technical'; // Categoria dello scenario
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'character';
  timestamp: Date;
  character?: string;
  audioUrl?: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  character: Character;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

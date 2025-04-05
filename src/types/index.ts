
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
  imageUrl?: string; // Added for scenario images
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'character';
  timestamp: Date;
  character?: string;
  audioUrl?: string;
  correction?: string; // Added for error correction
}

export interface Conversation {
  id: string;
  messages: Message[];
  character: Character;
  scenario: Scenario; // Added scenario reference
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

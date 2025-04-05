
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

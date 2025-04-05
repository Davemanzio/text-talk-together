import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Message, Conversation } from '../types';
import { getScenarioById, getCharacterById } from '../data/scenarios';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { useToast } from '@/hooks/use-toast';

const ChatPage = () => {
  const { scenarioId, characterId } = useParams<{ scenarioId: string; characterId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!scenarioId || !characterId) {
      navigate('/');
      return;
    }

    const character = getCharacterById(scenarioId, characterId);
    if (!character) {
      navigate('/');
      return;
    }

    // Inizializza la conversazione con un messaggio di benvenuto
    const welcomeMessage: Message = {
      id: uuidv4(),
      text: "Ciao! Come posso aiutarti oggi?",
      sender: 'character',
      timestamp: new Date(),
      character: character.id,
    };

    setConversation({
      id: uuidv4(),
      messages: [welcomeMessage],
      character: character,
    });

    // Inizializza l'audio element
    const audioElement = new Audio();
    setAudio(audioElement);

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [scenarioId, characterId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playAudio = (audioUrl?: string) => {
    if (!audio || !audioUrl) return;
    
    audio.src = audioUrl;
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      toast({
        title: "Errore",
        description: "Impossibile riprodurre l'audio",
        variant: "destructive",
      });
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!conversation) return;

    // Aggiungi il messaggio dell'utente
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setConversation(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, userMessage],
      };
    });

    setLoading(true);

    // Simula una risposta dopo un breve ritardo
    setTimeout(() => {
      // In una versione reale, qui chiameremmo un'API per generare la risposta
      const botResponses = [
        "Certo, sarò felice di aiutarti con questo.",
        "Perfetto! Posso fornirti maggiori dettagli se necessario.",
        "Ho capito. C'è qualcos'altro che vorresti sapere?",
        "Grazie per l'informazione. Posso fare qualcos'altro per te?",
        "Ottima scelta! Hai altre domande?"
      ];
      
      const responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: uuidv4(),
        text: responseText,
        sender: 'character',
        timestamp: new Date(),
        character: conversation.character.id,
        // In una versione reale, qui avremmo l'URL dell'audio generato
        audioUrl: "https://example.com/audio.mp3" // Placeholder, non funzionerà
      };

      setConversation(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, botMessage],
        };
      });

      setLoading(false);
    }, 1000);
  };

  if (!conversation) {
    return <div className="flex items-center justify-center h-screen">Caricamento...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader character={conversation.character} />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {conversation.messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            playAudio={playAudio}
          />
        ))}
        {loading && (
          <div className="text-center py-2">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style={{ animationDelay: '0.2s' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;

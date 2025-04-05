
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Message, Conversation } from '../types';
import { getScenarioById, getCharacterById, getLanguageById } from '../data/scenarios';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { useToast } from '@/hooks/use-toast';

const ChatPage = () => {
  const { scenarioId, characterId } = useParams<{ scenarioId: string; characterId: string }>();
  const [searchParams] = useSearchParams();
  const languageId = searchParams.get('lang') || 'it';
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [language, setLanguage] = useState(getLanguageById(languageId));
  const [corrections, setCorrections] = useState<{messageId: string, correction: string}[]>([]);

  useEffect(() => {
    if (!scenarioId || !characterId) {
      navigate('/');
      return;
    }

    const scenario = getScenarioById(scenarioId);
    const character = getCharacterById(scenarioId, characterId);
    
    if (!character || !scenario) {
      navigate('/');
      return;
    }

    setLanguage(getLanguageById(languageId));

    // Generate welcome message in the selected language
    let welcomeText = "";
    
    if (languageId === 'en') {
      welcomeText = `Hello! How can I help you today? We're speaking in English.`;
    } else if (languageId === 'fr') {
      welcomeText = `Bonjour! Comment puis-je vous aider aujourd'hui? Nous parlons en Français.`;
    } else if (languageId === 'de') {
      welcomeText = `Hallo! Wie kann ich Ihnen heute helfen? Wir sprechen auf Deutsch.`;
    } else if (languageId === 'es') {
      welcomeText = `¡Hola! ¿Cómo puedo ayudarte hoy? Estamos hablando en Español.`;
    } else if (languageId === 'it') {
      welcomeText = `Ciao! Come posso aiutarti oggi? Stiamo parlando in Italiano.`;
    } else {
      welcomeText = `Ciao! Come posso aiutarti oggi? Stiamo parlando in ${language?.name || 'Italiano'}.`;
    }

    // Inizializza la conversazione con un messaggio di benvenuto
    const welcomeMessage: Message = {
      id: uuidv4(),
      text: welcomeText,
      sender: 'character',
      timestamp: new Date(),
      character: character.id,
    };

    setConversation({
      id: uuidv4(),
      messages: [welcomeMessage],
      character: character,
      scenario: scenario,
    });

    // Inizializza l'audio element
    const audioElement = new Audio();
    setAudio(audioElement);

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [scenarioId, characterId, navigate, languageId]);

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

  // Function to provide corrections for user messages
  const provideCorrection = (messageId: string) => {
    if (!conversation) return;
    
    const messageToCorrect = conversation.messages.find(msg => msg.id === messageId);
    if (!messageToCorrect || messageToCorrect.sender !== 'user') return;
    
    // In a real app, this would call an API to get corrections
    const simulatedCorrection = `Correzione: "${messageToCorrect.text}" - Piccoli errori di grammatica. Sarebbe meglio dire: "${messageToCorrect.text.replace(/a/g, 'e')}"`;
    
    setCorrections(prev => [...prev, { messageId, correction: simulatedCorrection }]);
    
    toast({
      title: "Correzione fornita",
      description: "Una correzione è stata aggiunta al tuo messaggio.",
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
      
      // Select response based on language
      let responseText = "";
      const language = getLanguageById(languageId);
      
      if (languageId === 'en') {
        const botResponses = [
          `Sure, I'll be happy to help you with this in English.`,
          `Perfect! I can provide more details if needed.`,
          `I understand. Is there anything else you'd like to know?`,
          `Thank you for the information. Can I do anything else for you?`,
          `Excellent choice! Do you have any other questions?`
        ];
        responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      } else if (languageId === 'fr') {
        const botResponses = [
          `Bien sûr, je serai heureux de vous aider avec cela en Français.`,
          `Parfait! Je peux vous fournir plus de détails si nécessaire.`,
          `Je comprends. Y a-t-il autre chose que vous aimeriez savoir?`,
          `Merci pour l'information. Puis-je faire autre chose pour vous?`,
          `Excellent choix! Avez-vous d'autres questions?`
        ];
        responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      } else if (languageId === 'de') {
        const botResponses = [
          `Natürlich, ich helfe Ihnen gerne damit auf Deutsch.`,
          `Perfekt! Ich kann Ihnen weitere Details geben, wenn nötig.`,
          `Ich verstehe. Gibt es noch etwas, das Sie wissen möchten?`,
          `Danke für die Information. Kann ich sonst noch etwas für Sie tun?`,
          `Ausgezeichnete Wahl! Haben Sie weitere Fragen?`
        ];
        responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      } else if (languageId === 'es') {
        const botResponses = [
          `Por supuesto, estaré encantado de ayudarte con esto en Español.`,
          `¡Perfecto! Puedo proporcionarte más detalles si es necesario.`,
          `Entiendo. ¿Hay algo más que te gustaría saber?`,
          `Gracias por la información. ¿Puedo hacer algo más por ti?`,
          `¡Excelente elección! ¿Tienes alguna otra pregunta?`
        ];
        responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      } else {
        const botResponses = [
          `Certo, sarò felice di aiutarti con questo in ${language?.name || 'Italiano'}.`,
          `Perfetto! Posso fornirti maggiori dettagli se necessario.`,
          `Ho capito. C'è qualcos'altro che vorresti sapere?`,
          `Grazie per l'informazione. Posso fare qualcos'altro per te?`,
          `Ottima scelta! Hai altre domande?`
        ];
        responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
      }
      
      // Check for common errors in the user's message and offer corrections
      if (Math.random() > 0.5) {
        // 50% chance to provide a correction for the user's message
        setTimeout(() => {
          provideCorrection(userMessage.id);
        }, 2000);
      }
      
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
      <ChatHeader character={conversation.character} language={language} scenario={conversation.scenario} />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {conversation.messages.map((message) => (
          <div key={message.id}>
            <MessageBubble 
              message={message} 
              playAudio={playAudio}
            />
            {message.sender === 'user' && corrections.find(c => c.messageId === message.id) && (
              <div className="ml-4 mt-1 p-2 bg-yellow-50 text-sm text-yellow-800 rounded-md border border-yellow-200">
                {corrections.find(c => c.messageId === message.id)?.correction}
              </div>
            )}
          </div>
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

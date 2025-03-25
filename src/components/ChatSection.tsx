import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/clerk-react';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatSection = () => {
  const { isSignedIn, user } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m LegalGenius, your AI legal assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognizedLanguage, setRecognizedLanguage] = useState('en-IN');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = recognizedLanguage;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev + ' ' + transcript.trim());
        stopListening();
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
        stopListening();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        stopListening();
      }
    };
  }, [recognizedLanguage]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    } else {
      toast({
        title: "Voice Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const queryGroqChatbot = async (userQuery: string) => {
    try {
      const response = await fetch('/api/legal-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: userQuery,
          language: recognizedLanguage.split('-')[0] // Extract language code (e.g., "en" from "en-IN")
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error querying chatbot:', error);
      return "I'm sorry, I encountered an error processing your request. Please try again later.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await queryGroqChatbot(userMessage.content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat submission:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const supportedLanguages = [
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'bn-IN', name: 'Bengali' },
    { code: 'te-IN', name: 'Telugu' },
    { code: 'ta-IN', name: 'Tamil' },
    { code: 'mr-IN', name: 'Marathi' },
    { code: 'gu-IN', name: 'Gujarati' },
    { code: 'kn-IN', name: 'Kannada' },
    { code: 'ml-IN', name: 'Malayalam' }
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecognizedLanguage(e.target.value);
    if (recognitionRef.current) {
      recognitionRef.current.lang = e.target.value;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div id="chat" className="relative py-16 md:py-24 bg-gradient-to-b from-white to-navy-50">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-navy-50/50 to-transparent -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-lg text-navy-800 mb-4">Legal AI Assistant</h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Ask any legal question and get instant, accurate guidance based on Indian laws, regulations and court precedents.
          </p>
          
          <div className="flex justify-center mt-4">
            <select 
              value={recognizedLanguage}
              onChange={handleLanguageChange}
              className="px-3 py-2 bg-white border border-navy-200 rounded-md text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {supportedLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-4 md:p-6 overflow-hidden">
            <div className="flex items-center pb-4 border-b border-navy-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-500 to-teal-500 flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-navy-800">LegalGenius AI</h3>
                <p className="text-xs text-navy-500">Powered by Indian legal database</p>
              </div>
              <div className="ml-auto">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {isLoading ? 'Thinking...' : 'Online'}
                </span>
              </div>
            </div>

            <div className="py-4 px-2 h-[400px] overflow-y-auto flex flex-col gap-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.type === 'user' 
                        ? 'bg-navy-500 text-white rounded-tr-none' 
                        : 'bg-white border border-navy-100 shadow-sm rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'bot' ? (
                        <Bot size={16} className="text-teal-500" />
                      ) : (
                        <User size={16} className="text-white" />
                      )}
                      <span className={`text-xs ${message.type === 'user' ? 'text-white/80' : 'text-navy-500'}`}>
                        {message.type === 'user' 
                          ? isSignedIn ? user?.firstName || 'You' : 'You' 
                          : 'LegalGenius'}
                      </span>
                    </div>
                    <p className={message.type === 'user' ? 'text-white' : 'text-navy-700'}>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[80%] rounded-2xl p-4 bg-white border border-navy-100 shadow-sm rounded-tl-none">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-teal-500" />
                      <span className="text-xs text-navy-500">LegalGenius</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="text-navy-500 animate-spin" />
                      <p className="text-navy-600">Searching legal database...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <form onSubmit={handleSubmit} className="pt-3 border-t border-navy-100">
              <div className="flex items-start gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className={`mt-1 border-navy-200 hover:bg-navy-50 
                    ${isListening ? 'bg-red-50 text-red-600 border-red-300' : 'text-navy-600'}`}
                  onClick={toggleListening}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </Button>
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type your legal question here..."
                    className="min-h-[60px] resize-none pr-16 border-navy-200 focus-visible:ring-teal-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2 bottom-2 px-3 h-8 bg-navy-500 hover:bg-navy-600"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-4 text-xs text-center text-navy-400">
              LegalGenius AI provides general legal information, not legal advice. 
              For specific legal issues, consult a qualified attorney.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;

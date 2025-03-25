
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/clerk-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const responseMessages = [
        "Based on the Indian Penal Code Section 378, theft is defined as the dishonest taking of property without consent, with intent to permanently deprive the owner of that property.",
        "According to the Code of Criminal Procedure (CrPC) Section 154, an FIR (First Information Report) must be registered by the police when information about a cognizable offense is received.",
        "The Motor Vehicles Act Section 185 states that driving with a blood alcohol content exceeding 30mg per 100ml of blood is punishable by imprisonment up to 6 months and/or a fine of up to ₹10,000 for the first offense.",
        "I've analyzed your situation. Under the Consumer Protection Act, 2019, you're entitled to compensation for defective products. I recommend filing a complaint with the District Consumer Disputes Redressal Commission.",
        "As per the Limitation Act, the time limit to file a civil case regarding property disputes is 12 years from the date when the right to sue first accrues."
      ];

      const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div id="chat" className="relative py-16 md:py-24 bg-gradient-to-b from-white to-navy-50">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-navy-50/50 to-transparent -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-lg text-navy-800 mb-4">Legal AI Assistant</h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Ask any legal question and get instant, accurate guidance based on Indian laws, regulations and court precedents.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-4 md:p-6 overflow-hidden">
            {/* Chat header */}
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

            {/* Chat messages */}
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

            {/* Input form */}
            <form onSubmit={handleSubmit} className="pt-3 border-t border-navy-100">
              <div className="flex items-start gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mt-1 border-navy-200 text-navy-600 hover:bg-navy-50"
                >
                  <FileText size={18} />
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

            {/* Chat footer */}
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

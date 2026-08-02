import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles, ExternalLink, RefreshCw, ChevronRight, CornerDownLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  links?: { label: string; url: string; isExternal?: boolean }[];
  suggestions?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hello! I'm Nazmul Haque Rafi's AI Portfolio Assistant. How can I help you explore this website today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: [
      '🔥 What is Firee?',
      '👤 Who is NH Rafi?',
      '🔬 Research & Papers',
      '📱 How to view the 3D HUD?',
      '🧭 Navigate the Site'
    ]
  }
];

export const PortfolioChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (userQuery: string): Message => {
    const q = userQuery.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('firee')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "**Firee** is a featured project built by NH Rafi. It is a modern web app featuring real-time state synchronization, dynamic interactive components, and high-performance frontend architecture deployed on Vercel.",
        timestamp: time,
        links: [
          { label: '🚀 Firee Live Demo', url: 'https://firee.vercel.app', isExternal: true },
          { label: '💻 GitHub Repository', url: 'https://github.com/nhrafi0x/Firee', isExternal: true },
          { label: '📂 View in Showcase', url: '/showcase', isExternal: false }
        ],
        suggestions: ['Who is NH Rafi?', 'Research & Papers', 'How to view the 3D HUD?']
      };
    }

    if (q.includes('who') || q.includes('rafi') || q.includes('about') || q.includes('author') || q.includes('profile')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Nazmul Haque Rafi (NH Rafi) is a software engineer, AI researcher, and tech enthusiast. He works on AI neural networks, system automation, full-stack software development, culinary arts, and street photography.",
        timestamp: time,
        links: [
          { label: '📖 Read Full Biography', url: '/about', isExternal: false },
          { label: '📬 Contact NH Rafi', url: '/contact', isExternal: false }
        ],
        suggestions: ['🔥 What is Firee?', '🔬 Research & Papers', '🧭 Navigate the Site']
      };
    }

    if (q.includes('research') || q.includes('paper') || q.includes('academic') || q.includes('ai') || q.includes('neural')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "NH Rafi conducts advanced research in machine learning and neural network optimization. Key publications include work on lightweight deep learning architectures and hyperparameter optimization.",
        timestamp: time,
        links: [
          { label: '📄 Research Section in Showcase', url: '/showcase', isExternal: false }
        ],
        suggestions: ['🔥 What is Firee?', '👤 Who is NH Rafi?']
      };
    }

    if (q.includes('hud') || q.includes('3d') || q.includes('nothing') || q.includes('loading') || q.includes('airpod') || q.includes('phone')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "The website features a custom 3D Nothing-inspired HUD! You can open it anytime by clicking the 'NOTHING //' pill badge at the top-right corner or the 'R' logo in the left navigation sidebar. It stays open as long as you want until you click 'EXIT HUD'!",
        timestamp: time,
        suggestions: ['🔥 What is Firee?', '👤 Who is NH Rafi?', '🧭 Navigate the Site']
      };
    }

    if (q.includes('navigate') || q.includes('pages') || q.includes('section') || q.includes('where') || q.includes('site')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Here is a quick map of the website:\n- **Home**: Featured 3D Showcase & Interests Overview\n- **About**: Biography, Skills, Journey & Colorful portrait\n- **Showcase**: Projects (including Firee), Research, Photography & Culinary\n- **Planning**: Private Dashboard for personal productivity\n- **Contact**: Get in touch, email & social links",
        timestamp: time,
        links: [
          { label: '🏠 Go to Home', url: '/', isExternal: false },
          { label: '💼 Go to Showcase', url: '/showcase', isExternal: false },
          { label: '👤 Go to About', url: '/about', isExternal: false }
        ],
        suggestions: ['🔥 What is Firee?', '📱 How to view the 3D HUD?']
      };
    }

    // Default friendly response
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `I'm here to help you learn about NH Rafi's portfolio! You can ask about projects (like Firee), research, biography, or site navigation.`,
      timestamp: time,
      suggestions: [
        '🔥 What is Firee?',
        '👤 Who is NH Rafi?',
        '🔬 Research & Papers',
        '📱 How to view the 3D HUD?',
        '🧭 Navigate the Site'
      ]
    };
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 bg-charcoal text-gold border border-gold/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] px-4 py-3 rounded-full cursor-pointer hover:bg-gold hover:text-charcoal transition-all duration-300 font-mono text-xs tracking-wider"
        >
          <div className="relative">
            <Bot size={18} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
          </div>
          <span className="font-bold hidden sm:inline">AI ASSISTANT</span>
        </motion.button>
      </div>

      {/* Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-charcoal/95 border border-gold/30 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden font-sans text-white"
          >
            {/* Header */}
            <header className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-serif font-bold text-white">Portfolio Guide AI</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gold/20 text-gold uppercase tracking-wider">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-mono">Ask about NH Rafi, Firee & Research</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </header>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar text-xs leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-gold text-charcoal font-medium rounded-br-none shadow'
                        : 'bg-white/10 border border-white/10 text-white rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Render Action Links if available */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
                        {msg.links.map((link, idx) =>
                          link.isExternal ? (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-gold hover:underline font-mono text-[11px] font-bold"
                            >
                              <ExternalLink size={12} /> {link.label}
                            </a>
                          ) : (
                            <Link
                              key={idx}
                              to={link.url}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-1.5 text-gold hover:underline font-mono text-[11px] font-bold"
                            >
                              <ChevronRight size={12} /> {link.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] font-mono text-white/40 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-gold/30 hover:bg-gold/20 text-gold text-[10px] font-mono tracking-wider transition-all cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-mono p-2">
                  <Sparkles size={12} className="animate-spin text-gold" /> AI Assistant is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Firee, research, biography..."
                className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-gold text-charcoal rounded-lg hover:bg-gold/90 disabled:opacity-40 transition-all cursor-pointer shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

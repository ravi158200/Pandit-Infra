import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, X, Send, Calculator, HardHat, FileText, 
  RefreshCw, ChevronDown, CheckCircle2, Building2, PhoneCall, 
  ArrowUpRight, Mic, MicOff, Volume2, VolumeX, Play, Pause 
} from 'lucide-react';
import API from '../../utils/api';

const QUICK_PROMPTS = [
  { icon: '🏗️', label: '1500 sq ft RCC Cost', prompt: 'Estimate cost for 1500 sq ft RCC commercial building' },
  { icon: '🚜', label: 'Excavation Process', prompt: 'What is the step by step process and rate for site excavation work?' },
  { icon: '🧱', label: 'Brickwork & Plaster', prompt: 'Tell me about brick masonry, AAC block laying and plastering rates.' },
  { icon: '💧', label: 'Waterproofing System', prompt: 'What is your procedure for terrace and basement waterproofing?' },
  { icon: '🛣️', label: 'Road Asphalt Paving', prompt: 'What are your rates and timelines for bituminous asphalt road paving?' },
];

const INITIAL_WELCOME_TEXT = `Hello! 👋 I am **Pandit AI**, your Civil Engineering & Infrastructure Assistant.\n\nI can process questions and cost estimates for **ANY civil engineering work** (Excavation, RCC Foundation, Brickwork, Plastering, Waterproofing, Flooring, Bituminous Roads & Box Culverts).\n\nYou can **type** your question or click the 🎤 **Microphone button** to use voice input!`;

const AIChatAssistant = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: INITIAL_WELCOME_TEXT,
      displayedText: INITIAL_WELCOME_TEXT,
      isTypingDone: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  // Voice Input State (Speech-to-Text)
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Voice Output State (Text-to-Speech)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);

  const chatEndRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Toggle Microphone
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Voice input is not supported in your current browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Text-to-Speech Handler
  const speakText = (text, msgId) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (currentlySpeakingId === msgId) {
      setCurrentlySpeakingId(null);
      return;
    }

    // Clean markdown symbols for speech synthesis
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/•/g, '')
      .replace(/#+/g, '')
      .replace(/[*_~`]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setCurrentlySpeakingId(null);
    utterance.onerror = () => setCurrentlySpeakingId(null);

    setCurrentlySpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Typing animation effect for bot replies
  const streamBotResponse = (fullBotReply) => {
    setMessages((prev) => [...prev, { ...fullBotReply, displayedText: '', isTypingDone: false }]);

    let currentCharIndex = 0;
    const fullText = fullBotReply.text;
    const speed = 12; // ms per char

    const interval = setInterval(() => {
      currentCharIndex += 2; // type 2 chars per tick for smooth natural speed
      if (currentCharIndex >= fullText.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === fullBotReply.id
              ? { ...msg, displayedText: fullText, isTypingDone: true }
              : msg
          )
        );

        // If global voice enabled, speak response after typing done
        if (isVoiceEnabled) {
          speakText(fullText, fullBotReply.id);
        }
      } else {
        const textChunk = fullText.slice(0, currentCharIndex);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === fullBotReply.id
              ? { ...msg, displayedText: textChunk }
              : msg
          )
        );
      }
    }, speed);
  };

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Call backend AI chat endpoint
      const res = await API.post('/ai/chat', {
        message: queryText,
        history: messages.slice(-6).map((m) => ({ role: m.sender, content: m.text })),
      });

      const botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.data?.reply || "I am currently processing your civil engineering request. Please contact our senior civil team for custom blueprints.",
        estimate: res.data?.estimate || null,
        action: res.data?.action || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      streamBotResponse(botReply);
    } catch (err) {
      console.warn('Backend AI route failed, fallback to local civil AI response handler:', err);
      
      const botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "Thank you for reaching out to Pandit Infra! 🏗️\n\nOur civil engineering team specializes in earthwork excavation, RCC foundations, masonry, plastering, waterproofing, and road paving. Click below to request a customized formal BOQ!",
        action: 'SHOW_QUOTE_BUTTON',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      streamBotResponse(botReply);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    window.speechSynthesis?.cancel();
    setCurrentlySpeakingId(null);
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: INITIAL_WELCOME_TEXT,
        displayedText: INITIAL_WELCOME_TEXT,
        isTypingDone: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering **text**
      const formattedParts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-slate-900 font-sans">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start space-x-2 my-1 pl-1">
            <span className="text-emerald-500 font-bold">•</span>
            <span>{formattedParts}</span>
          </div>
        );
      }

      return (
        <p key={idx} className={`${line.trim() === '' ? 'h-2' : 'my-1'}`}>
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-20 sm:right-24 z-50 flex items-center">
        {/* Unread Pill Badge */}
        {!isOpen && unreadBadge && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 mr-3 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-700 backdrop-blur-md cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span>Voice & Civil AI Assistant <strong>Ask AI</strong></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-900 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:shadow-emerald-500/20 focus:outline-none border border-slate-700 group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title="Pandit AI Construction & Voice Assistant"
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-40 blur-md group-hover:opacity-75 transition duration-500 -z-10"></span>

          {isOpen ? (
            <X size={26} className="text-slate-200" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot size={26} className="text-emerald-400 transition-transform group-hover:scale-110" />
              <Sparkles size={14} className="absolute -top-1.5 -right-2 text-amber-300 animate-bounce" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Main AI Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[640px] h-[83vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 shadow-inner">
                    <Bot size={22} className="text-slate-950 font-bold" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm tracking-wide text-white">Pandit Civil AI</h3>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles size={10} className="text-amber-300" /> Typing & Voice
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Civil Work Process & Estimator Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Voice Auto-Read Toggle Button */}
                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  title={isVoiceEnabled ? "Mute AI Voice Output" : "Enable Auto Voice Reading"}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isVoiceEnabled
                      ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button
                  onClick={handleClearChat}
                  title="Clear Chat History"
                  className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-colors"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize AI Chat"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Action Chips Banner */}
            <div className="bg-slate-50 border-b border-slate-100 p-2.5 overflow-x-auto flex gap-2 scrollbar-none">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.prompt)}
                  className="flex items-center gap-1.5 text-[11px] font-medium bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-2xs transition-all cursor-pointer"
                >
                  <span>{qp.icon}</span>
                  <span>{qp.label}</span>
                </button>
              ))}
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                const isSpeaking = currentlySpeakingId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-xs">
                        <Bot size={15} />
                      </div>
                    )}

                    <div className={`max-w-[85%] ${isBot ? 'items-start' : 'items-end'} flex flex-col`}>
                      <div
                        className={`relative rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                          isBot
                            ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-xs font-medium'
                        }`}
                      >
                        {isBot ? (
                          <>
                            {renderFormattedText(msg.displayedText || msg.text)}
                            {!msg.isTypingDone && (
                              <span className="inline-block w-1.5 h-4 bg-emerald-500 ml-1 animate-pulse align-middle"></span>
                            )}
                          </>
                        ) : (
                          msg.text
                        )}

                        {/* Speaker Voice Audio Button for Bot Messages */}
                        {isBot && msg.isTypingDone && (
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <button
                              onClick={() => speakText(msg.text, msg.id)}
                              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${
                                isSpeaking
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-100'
                              }`}
                              title="Listen to response"
                            >
                              <Volume2 size={13} className={isSpeaking ? 'animate-bounce text-amber-600' : ''} />
                              <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
                            </button>
                          </div>
                        )}

                        {/* Render Estimate Interactive Card if available */}
                        {msg.estimate && msg.isTypingDone && (
                          <div className="mt-3 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3.5 rounded-xl border border-slate-700 shadow-md">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-700/80">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                                <Calculator size={13} /> {msg.estimate.type}
                              </span>
                              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                                AI Estimate
                              </span>
                            </div>

                            <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                                <span className="text-[10px] text-slate-400 block">Covered Area</span>
                                <span className="font-semibold text-white">{msg.estimate.areaSqFt.toLocaleString()} sq. ft.</span>
                              </div>
                              <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                                <span className="text-[10px] text-slate-400 block">Est. Budget</span>
                                <span className="font-bold text-amber-300 text-sm">~₹{msg.estimate.estimatedTotalLakhs} Lakhs</span>
                              </div>
                            </div>

                            <div className="mt-2 text-[11px] space-y-1 text-slate-300 bg-slate-850 p-2 rounded-lg">
                              <div>🏗️ <strong>Steel:</strong> {msg.estimate.materialsBreakdown.steelTons}</div>
                              <div>🧱 <strong>Cement:</strong> {msg.estimate.materialsBreakdown.cementBags}</div>
                              <div>🚛 <strong>Concrete:</strong> {msg.estimate.materialsBreakdown.concreteVolume}</div>
                            </div>

                            <button
                              onClick={() => {
                                setIsOpen(false);
                                onOpenQuote?.();
                              }}
                              className="mt-3 w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition-all cursor-pointer"
                            >
                              <span>Request Formal Engineering BOQ</span>
                              <ArrowUpRight size={14} />
                            </button>
                          </div>
                        )}

                        {/* Render Direct Quote CTA Button */}
                        {msg.action === 'SHOW_QUOTE_BUTTON' && msg.isTypingDone && (
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              onOpenQuote?.();
                            }}
                            className="mt-3 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2 px-3 rounded-lg shadow-xs transition-all cursor-pointer"
                          >
                            <FileText size={14} />
                            <span>Open Official Inquiry Form</span>
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator while waiting for server response */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs py-1 px-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="text-[11px] text-slate-500 font-medium ml-1">Processing civil engineering query...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Listening Indicator Bar */}
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500 text-white px-3 py-1.5 text-xs font-semibold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                  <span>Listening... Speak your civil engineering question now.</span>
                </div>
                <button
                  onClick={toggleListening}
                  className="bg-white/20 hover:bg-white/30 text-white text-[10px] px-2 py-0.5 rounded-md"
                >
                  Stop
                </button>
              </motion.div>
            )}

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening to your voice..." : "Type or speak civil query..."}
                className={`flex-grow text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none transition-all placeholder:text-slate-400 ${
                  isListening
                    ? 'bg-red-50 border-red-300 text-red-900 focus:ring-2 focus:ring-red-400'
                    : 'bg-slate-100/80 hover:bg-slate-100 text-slate-800 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                }`}
              />

              {/* Voice Microphone Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all flex-shrink-0 cursor-pointer ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-500/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-emerald-700 border border-slate-200'
                }`}
                title={isListening ? "Stop Voice Recording" : "Voice Input (Speech-to-Text)"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white rounded-xl shadow-sm transition-all focus:outline-none flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
                title="Send Message"
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

export default AIChatAssistant;

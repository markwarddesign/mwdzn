import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FiSend, FiZap, FiUser, FiCpu } from 'react-icons/fi';
import { buildSystemPrompt } from '../assistantConfig';

const SYSTEM_PROMPT = buildSystemPrompt();

const SUGGESTED = [
  'What are Mark\'s strongest skills?',
  'Tell me about CropAide',
  'How does he handle multi-tenant auth?',
  'What leadership experience does he have?',
];

const GeminiChat = () => {
  const [displayMessages, setDisplayMessages] = useState([
    { role: 'model', text: "Hi! I'm Mark's AI assistant. Ask me anything about his experience, architecture decisions, or tech stack — I'm happy to help." },
  ]);
  const [apiHistory, setApiHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setShowSuggested(false);
    setDisplayMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    setDisplayMessages(prev => [...prev, { role: 'model', text: '' }]);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setDisplayMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'model',
          text: "Mark hasn't configured a live API key for this demo yet — but the integration is fully wired up with streaming support. Check out his CropAide case study to see real architecture decisions in action.",
        };
        return updated;
      });
      setLoading(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: SYSTEM_PROMPT,
      });

      const chat = model.startChat({ history: apiHistory });
      const result = await chat.sendMessageStream(text);

      let fullResponse = '';
      for await (const chunk of result.stream) {
        fullResponse += chunk.text();
        setDisplayMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullResponse };
          return updated;
        });
      }

      setApiHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: fullResponse }] },
      ]);
    } catch (err) {
      const msg = err?.message || '';
      const friendlyText = msg.includes('429')
        ? "I'm getting rate-limited by the API right now — please try again in a moment."
        : msg.includes('API_KEY_INVALID') || msg.includes('400')
        ? "There's a configuration issue with the API key. Please check the setup."
        : 'Something went wrong. Please try again.';
      setDisplayMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'model', text: friendlyText };
        return updated;
      });
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-[#1e2230] border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#181c24] border-b border-[#23283a]">
        <FiCpu className="text-blue-400" size={17} />
        <span className="font-bold text-blue-100 text-sm">Ask My AI Assistant</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
          <FiZap size={11} className="text-yellow-400" />
          Powered by Gemini
        </span>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-5 flex flex-col gap-3">
        {displayMessages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mb-0.5">
                <FiCpu size={12} className="text-white" />
              </div>
            )}
            <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-[#23283a] text-gray-200 rounded-bl-sm border border-gray-700/40'
            }`}>
              {msg.text
                ? msg.text
                : <span className="flex items-center gap-1.5 text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{animationDelay:'0ms'}} /><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{animationDelay:'300ms'}} /></span>
              }
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mb-0.5">
                <FiUser size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested chips */}
      {showSuggested && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {SUGGESTED.map(q => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs bg-[#23283a] border border-blue-900/50 text-blue-300 rounded-full px-3 py-1.5 hover:bg-blue-900/30 hover:border-blue-500 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-4 border-t border-[#23283a] flex gap-3">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about skills, projects, architecture…"
          className="flex-1 bg-[#23283a] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-2 text-white text-sm font-semibold"
        >
          <FiSend size={15} />
        </button>
      </div>
    </div>
  );
};

export default GeminiChat;

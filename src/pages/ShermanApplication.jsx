import React, { useState, useRef, useEffect } from 'react';
import { buildSystemPrompt } from '../assistantConfig';

const TerminalAI = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Keep the terminal pinned to its own latest line — scroll the inner
  // container only, never the page (which would fight Lenis smooth-scroll).
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const SUGGESTED = [
    'How does Mark architect multi-tenant SaaS?',
    'How does he handle reliability with high-volume data?',
    'What makes him different from a CS-degree engineer?',
  ];

  const send = async (text) => {
    const userMsg = text.trim();
    if (!userMsg || isTyping) return;

    // Add the user message, plus an empty AI slot we'll stream into.
    setMessages(prev => [...prev, { role: 'user', content: userMsg }, { role: 'ai', content: '' }]);
    setInput('');
    setIsTyping(true);

    const workerUrl = import.meta.env.VITE_GEMINI_WORKER_URL;
    if (!workerUrl) {
      setMessages(prev => {
        const u = [...prev];
        u[u.length - 1] = { role: 'ai', content: 'Terminal is offline in this environment (VITE_GEMINI_WORKER_URL not set). Try the deployed site.' };
        return u;
      });
      setIsTyping(false);
      return;
    }

    try {
      const nextHistory = [...history, { role: 'user', parts: [{ text: userMsg }] }];
      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: nextHistory,
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let replyText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          try {
            const json = JSON.parse(payload);
            const chunk = json?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (chunk) {
              replyText += chunk;
              setMessages(prev => {
                const u = [...prev];
                u[u.length - 1] = { role: 'ai', content: replyText };
                return u;
              });
            }
          } catch {}
        }
      }
      if (!replyText) replyText = 'No response.';
      setHistory([...nextHistory, { role: 'model', parts: [{ text: replyText }] }]);
    } catch (err) {
      setMessages(prev => {
        const u = [...prev];
        u[u.length - 1] = { role: 'ai', content: `Something went wrong (${err.message}).` };
        return u;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="mt-16 border border-gray-800 rounded bg-[#0f0f0f] overflow-hidden font-mono text-sm">
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <span className="text-gray-400 font-semibold text-xs uppercase tracking-wider">
          Ask My AI (Terminal)
        </span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
        </div>
      </div>

      <div ref={scrollRef} className="p-4 h-64 overflow-y-auto space-y-4">
        <div className="text-gray-500">
          $ system_init --load "Mark Ward Profile" <br/>
          > System loaded. I am an AI assistant grounded in Mark Ward's real work, architecture decisions, and engineering philosophy.<br/>
          > Ask me how he builds multi-tenant SaaS, scales Laravel, or handles technical debt.
        </div>

        {messages.length === 0 && (
          <div className="space-y-2">
            <div className="text-gray-600 text-xs">// try asking</div>
            {SUGGESTED.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="block w-full text-left text-gray-300 border border-gray-800 rounded px-3 py-2 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
              >
                <span className="opacity-50 mr-2">$</span>{q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1;
          const streaming = isTyping && isLast && msg.role === 'ai' && !msg.content;
          return (
            <div key={idx} className={`whitespace-pre-wrap ${msg.role === 'ai' ? 'text-blue-400' : 'text-gray-300'} ${streaming ? 'animate-pulse' : ''}`}>
              <span className="opacity-50 mr-2">{msg.role === 'user' ? 'Adam@ShermanResearch:~$ ' : 'AI_Clone:~$ '}</span>
              {streaming ? 'processing...' : msg.content}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-[#0a0a0a] p-2 flex">
        <span className="text-gray-500 py-2 pl-4 pr-2">Adam@ShermanResearch:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a technical question..."
          className="flex-1 bg-transparent text-gray-300 focus:outline-none py-2"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

const ShermanApplication = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-mono px-6 sm:px-12 md:px-20 pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 flex justify-center selection:bg-blue-500 selection:text-white">
      <div className="max-w-3xl w-full">

        {/* Header Section */}
        <header className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Adam — You asked for creative.
          </h1>
          <p className="text-lg text-gray-500">
            Here is my application for Sherman Research.
          </p>
        </header>

        {/* Main Pitch */}
        <main className="space-y-6 text-[1.05rem] md:text-lg leading-relaxed">
          <p>
            So I built you something you can talk to. Scroll down and put an AI that knows my work on the spot — ask it anything technical. But first, a minute on why I'm writing.
          </p>

          <p>
            I didn't take the traditional computer science route. I have a PE teaching degree and a background in construction, and I’m a self-taught senior engineer who now architects multi-tenant SaaS platforms. I got here by staying curious, staying humble enough to keep learning every day, and being willing to put my head down and do the hard work until the job is done — and to build something I can be proud of.
          </p>

          <p>
            For the last several years I've focused on building and scaling SaaS platforms — Node, PHP/Laravel, Next.js — as well as leading the engineering behind California Closets, a billion-dollar brand. I use AI tools to ship dependable features faster, without cutting corners. And I've done it in highly collaborative environments — working closely with marketing and design teams, not siloed off from them.
          </p>

          <p>
            But I want my work to mean something. I'm proud of the craft behind what I've built for big brands — but I'm looking for a team where the mission is bigger than the next quarter, where the work itself matters. That's what caught my attention about Sherman. <span className="text-white font-semibold">I’m ready and built to do work that matters.</span>
          </p>

          <p>
            I highly respect the 51% pledge and your focus on stewardship. As a girl dad to three daughters and a high school boys' basketball coach, my focus offline is entirely on building people up and mastering the fundamentals. It is rare and refreshing to see a company put its money where its faith is.
          </p>

          <div className="border-l-2 border-blue-500 pl-4 bg-gray-900/50 py-3">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Work Philosophy</p>
            <p className="text-white font-semibold">Do your best and remember who it's for.</p>
            <p className="text-sm text-gray-500 mt-1">— Colossians 3:23</p>
          </div>

          <p className="text-white font-medium pt-4">
            My resume is attached. I’d love to get on a call and talk about what you actually need built.
          </p>

          {/* Interactive AI terminal */}
          <TerminalAI />
        </main>

        {/* Footer / Contact & Call to Action */}
        <footer className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <p className="text-white font-bold text-xl mb-1">Best, Mark Ward</p>
            <a
              href="https://portfolio.markwarddesign.com"
              className="text-blue-400 hover:text-blue-300 transition-colors block mb-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              portfolio.markwarddesign.com
            </a>
            <p className="text-gray-500">(208) 308-9599</p>
          </div>

          {/* Download Button */}
          <a
            href="/Mark_Ward_Resume_Sherman_Research.pdf"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-black bg-white rounded hover:bg-gray-200 transition-all active:scale-95"
            download
          >
            <svg
              className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </footer>

      </div>
    </div>
  );
};

export default ShermanApplication;

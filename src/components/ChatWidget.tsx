'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Caliber's AI assistant. Want to know how we can grow your business online? Ask me anything!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble right now. Please email us at darrin@caliberwebstudio.com!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes cw-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cw-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes cw-slide-in {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes cw-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cw-typing {
          0%, 60%, 100% { opacity: 1; }
          30%           { opacity: 0.3; }
        }
        @keyframes cw-strobe {
          0%, 80%, 100% { opacity: 0; transform: scale(0.7); }
          84%  { opacity: 1;   transform: scale(1.5); }
          87%  { opacity: 0;   transform: scale(0.9); }
          91%  { opacity: 0.8; transform: scale(1.3); }
          94%  { opacity: 0;   transform: scale(1);   }
        }
        @keyframes cw-bounce-attention {
          0%, 75%, 100% { transform: translateY(0); }
          80%  { transform: translateY(-6px); }
          85%  { transform: translateY(0); }
          90%  { transform: translateY(-3px); }
          95%  { transform: translateY(0); }
        }
        /* cw-orb IS the sphere — gradient on the outermost positioned element */
        .cw-orb {
          animation: cw-bounce-attention 5s ease-in-out infinite;
          background: linear-gradient(145deg, #0099d6 0%, #0076B6 55%, #005a8e 100%) !important;
        }
        .cw-orb:hover {
          box-shadow: 0 0 40px 8px rgba(0,118,182,0.7), 0 0 0 2px rgba(0,163,255,0.5) !important;
        }
      `}</style>

      {/* ── Floating orb — the div itself is the blue sphere ── */}
      <div
        className="cw-orb"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '68px',
          height: '68px',
          zIndex: 9999,
          cursor: 'pointer',
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #0099d6 0%, #0076B6 55%, #005a8e 100%)',
          boxShadow: '0 0 24px 4px rgba(0,118,182,0.55), 0 0 0 1px rgba(0,163,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          transition: 'box-shadow 0.2s ease',
        }}
        onClick={() => setOpen(!open)}
        role="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      >
        {/* Strobe flash — behind sphere via zIndex:-1 */}
        <div style={{
          position: 'absolute',
          inset: '-18px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,118,182,0.95) 0%, rgba(0,118,182,0.5) 45%, transparent 70%)',
          animation: 'cw-strobe 5s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: -1,
        }} />

        {/* Ambient glow — behind sphere */}
        <div style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,118,182,0.4) 0%, rgba(0,118,182,0.15) 55%, transparent 75%)',
          animation: 'cw-pulse 2.8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: -1,
        }} />

        {/* Spinning conic ring — behind sphere */}
        <div style={{
          position: 'absolute',
          inset: '-5px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, rgba(0,118,182,0.9) 0deg, rgba(0,163,255,0.6) 120deg, transparent 200deg, transparent 360deg)',
          animation: 'cw-spin 3s linear infinite',
          pointerEvents: 'none',
          zIndex: -1,
        }} />

        {/* Glass sheen highlight on sphere surface */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '10px',
          width: '26px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          filter: 'blur(4px)',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            <path d="M15 5L5 15M5 5l10 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div
          id="cw-window"
          style={{
            position: 'fixed',
            bottom: '104px',
            right: '24px',
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 120px))',
            backgroundColor: '#111827',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,118,182,0.2)',
            border: '1px solid rgba(0,118,182,0.15)',
            zIndex: 9998,
            animation: 'cw-slide-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0f172a',
            borderRadius: '16px 16px 0 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0076B6 0%, #005a8e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 10px rgba(0,118,182,0.45)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', lineHeight: 1.2 }}>
                  Caliber AI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'cw-msg-in 0.2s ease',
                }}
              >
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  backgroundColor: msg.role === 'user' ? '#0076B6' : '#1e293b',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  wordWrap: 'break-word',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '14px 14px 14px 4px',
                  backgroundColor: '#1e293b',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '18px',
                  letterSpacing: '2px',
                  animation: 'cw-typing 1.4s infinite',
                }}>
                  •••
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: '8px',
            backgroundColor: '#0f172a',
            borderRadius: '0 0 16px 16px',
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter' && !loading) handleSendMessage(); }}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: '#1e293b',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(0,118,182,0.5)'; }}
              onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: !loading && input.trim() ? '#0076B6' : 'rgba(255,255,255,0.06)',
                border: 'none',
                color: '#ffffff',
                cursor: !loading && input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.2s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

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
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>

      {/* Orb Chat Button */}
      <button
        id="cw-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 9999,
          background: 'transparent',
        }}
      >
        {/* Ambient outer glow */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)',
          animation: 'orbPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Slow spinning ring */}
        <div style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '50%',
          border: '1.5px solid transparent',
          borderTopColor: 'rgba(99,179,255,0.6)',
          borderRightColor: 'rgba(109,77,255,0.4)',
          animation: 'orbSpin 4s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Main orb sphere */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e40ff 0%, #2563eb 45%, #6d4dff 100%)',
          boxShadow: '0 4px 24px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 32px rgba(37,99,235,0.7), inset 0 1px 0 rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.25)';
          }}
        >
          {/* Glass sheen */}
          <div style={{
            position: 'absolute',
            top: '4px',
            left: '8px',
            width: '28px',
            height: '14px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            filter: 'blur(3px)',
            pointerEvents: 'none',
          }} />

          {/* Icon */}
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: 'relative', zIndex: 1 }}>
              <path d="M15 5L5 15M5 5l10 10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {open && (
        <div
          id="cw-window"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 120px))',
            backgroundColor: '#111827',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.2)',
            border: '1px solid rgba(37,99,235,0.15)',
            zIndex: 9998,
            animation: 'slideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#0f172a',
              borderRadius: '16px 16px 0 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e40ff 0%, #2563eb 45%, #6d4dff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(37,99,235,0.4)',
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
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                  }} />
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

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'msgIn 0.2s ease',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    backgroundColor: msg.role === 'user' ? '#2563eb' : '#1e293b',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '10px 16px',
                    borderRadius: '14px 14px 14px 4px',
                    backgroundColor: '#1e293b',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '18px',
                    letterSpacing: '2px',
                    animation: 'typing 1.4s infinite',
                  }}
                >
                  •••
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: '8px',
              backgroundColor: '#0f172a',
              borderRadius: '0 0 16px 16px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleSendMessage();
                }
              }}
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
              onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(37,99,235,0.5)'; }}
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
                backgroundColor: !loading && input.trim() ? '#2563eb' : 'rgba(255,255,255,0.06)',
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

          {/* Styles */}
          <style>{`
            @keyframes msgIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes typing {
              0%, 60%, 100% { opacity: 1; }
              30% { opacity: 0.3; }
            }
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(12px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}

      {/* Global orb animations */}
      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes orbSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

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
            "Sorry, I'm having trouble right now. Please email us at hello@caliberwebstudio.com!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--navy)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          zIndex: 9999,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 6px 16px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: '380px',
            height: '520px',
            backgroundColor: 'var(--bg1)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid var(--bg3)',
            zIndex: 9998,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid var(--bg3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg2)',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--silver)' }}>
                Caliber AI
              </span>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  animation: 'blink 1.5s ease-in-out infinite',
                }}
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--silver)',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '0',
              }}
            >
              ✕
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
              gap: '12px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideIn 0.3s ease',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor:
                      msg.role === 'user' ? '#1E3D8F' : 'var(--bg3)',
                    color: msg.role === 'user' ? '#ffffff' : 'var(--silver)',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg3)',
                    color: 'var(--silver)',
                  }}
                >
                  <span style={{ animation: 'typing 1.4s infinite' }}>●●●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid var(--bg3)',
              display: 'flex',
              gap: '8px',
              backgroundColor: 'var(--bg2)',
              borderRadius: '0 0 12px 12px',
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
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--bg3)',
                backgroundColor: 'var(--bg1)',
                color: 'var(--silver)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: !loading && input.trim() ? '#1E3D8F' : 'var(--bg3)',
                border: 'none',
                color: '#ffffff',
                cursor: !loading && input.trim() ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    '#152d6f';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && input.trim()) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    '#1E3D8F';
                }
              }}
            >
              ↑
            </button>
          </div>

          {/* Styles */}
          <style>{`
            @keyframes blink {
              0%, 49%, 100% { opacity: 1; }
              50%, 99% { opacity: 0.3; }
            }
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes typing {
              0%, 60%, 100% { opacity: 1; }
              30% { opacity: 0.3; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

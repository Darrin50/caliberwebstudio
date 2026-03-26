'use client';

import { useState, useEffect, useRef } from 'react';
import type { DemoConfig } from '../demos';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/* ─── Chatbot Widget ─── */
function DemoChatbot({ config }: { config: DemoConfig }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: config.chatbotGreeting },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          businessName: config.businessName,
          businessType: config.businessType,
          phone: config.phone,
          address: `${config.address}, ${config.city}`,
          services: config.services.map((s) => s.name).join(', '),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Give us a call at ${config.phone} and we'll be happy to help!` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const accent = config.accentColor;
  const primary = config.primaryColor;

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '58px', height: '58px', borderRadius: '50%',
          background: accent, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', boxShadow: `0 6px 24px ${accent}66`,
          zIndex: 9999, transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        aria-label="Chat with us"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '94px', right: '24px',
          width: 'min(370px, calc(100vw - 32px))',
          height: 'min(500px, calc(100vh - 120px))',
          background: '#fff', borderRadius: '16px',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
          zIndex: 9998, overflow: 'hidden', fontFamily: 'inherit',
        }}>
          {/* Header */}
          <div style={{ background: primary, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💬</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', lineHeight: 1 }}>{config.businessName}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80' }} />
                Online now
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '2px' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8f9fa' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? accent : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#333',
                  fontSize: '14px', lineHeight: 1.5,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex' }}>
                <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <span style={{ letterSpacing: '2px', color: '#999' }}>● ● ●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              disabled={loading}
              style={{
                flex: 1, padding: '10px 14px', border: '1px solid #e0e0e0',
                borderRadius: '24px', fontSize: '14px', outline: 'none',
                fontFamily: 'inherit', color: '#333', background: '#f8f9fa',
                cursor: 'auto',
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                background: input.trim() && !loading ? accent : '#e0e0e0',
                color: '#fff', cursor: input.trim() && !loading ? 'pointer' : 'default',
                fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Main Demo Page ─── */
export default function DemoPage({ config }: { config: DemoConfig }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primary = config.primaryColor;
  const accent = config.accentColor;

  /* Lighten primary for gradient background */
  const heroGradient = `linear-gradient(135deg, ${primary} 0%, ${primary}cc 60%, ${primary}99 100%)`;

  return (
    <>
      {/* Reset caliberwebstudio.com styles for this page */}
      <style>{`
        .demo-root { cursor: default !important; }
        .demo-root * { cursor: default !important; box-sizing: border-box; }
        .demo-root a, .demo-root button, .demo-root input { cursor: pointer !important; }
        .demo-root input[type="text"], .demo-root input[type="email"], .demo-root input[type="tel"], .demo-root textarea { cursor: text !important; }
        @keyframes demo-fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        .demo-fadeup { animation: demo-fadeup 0.65s ease forwards; }
        .demo-fadeup-1 { animation-delay: 0.1s; opacity: 0; }
        .demo-fadeup-2 { animation-delay: 0.2s; opacity: 0; }
        .demo-fadeup-3 { animation-delay: 0.3s; opacity: 0; }
        @keyframes demo-pulse { 0%, 100% { box-shadow: 0 0 0 0 ${accent}44; } 50% { box-shadow: 0 0 0 10px ${accent}00; } }
        .demo-cta-pulse { animation: demo-pulse 2.5s ease-in-out infinite; }
        @media (max-width: 768px) {
          .demo-services-grid { grid-template-columns: 1fr 1fr !important; }
          .demo-info-row { flex-direction: column !important; }
          .demo-hero-btns { flex-direction: column !important; align-items: flex-start !important; }
          .demo-nav-links { display: none !important; }
          .demo-mobile-menu-open .demo-nav-links { display: flex !important; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: ${primary}; padding: 16px 24px; gap: 16px; z-index: 100; }
        }
        @media (max-width: 520px) {
          .demo-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="demo-root" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: '#1a1a1a', background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ── NAV ── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 500, background: primary, boxShadow: '0 2px 20px rgba(0,0,0,0.15)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }} className={mobileMenuOpen ? 'demo-mobile-menu-open' : ''}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: '18px' }}>
                {config.businessName.charAt(0)}
              </div>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '17px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {config.businessName}
              </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="demo-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              {['Services', 'About', 'Hours', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}>
                  {link}
                </a>
              ))}
              <a href="#contact" style={{ background: accent, color: '#fff', padding: '9px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Book Now
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', padding: '4px' }}
              className="demo-mobile-hamburger"
              aria-label="Menu">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        <style>{`
          @media (max-width: 768px) {
            .demo-mobile-hamburger { display: block !important; }
          }
        `}</style>

        {/* ── HERO ── */}
        <section style={{ background: heroGradient, padding: 'clamp(80px, 14vw, 140px) 24px clamp(60px, 10vw, 110px)', position: 'relative', overflow: 'hidden' }}>
          {/* Background pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${accent}22 1.5px, transparent 1.5px)`, backgroundSize: '30px 30px', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="demo-fadeup" style={{ display: 'inline-block', background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '20px', padding: '6px 16px', marginBottom: '20px' }}>
              <span style={{ color: accent, fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{config.businessType} · {config.city.split(',')[0]}</span>
            </div>
            <h1 className="demo-fadeup demo-fadeup-1" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              {config.businessName}
            </h1>
            <p className="demo-fadeup demo-fadeup-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '36px', maxWidth: '600px', margin: '0 auto 36px' }}>
              {config.tagline}
            </p>
            <div className="demo-fadeup demo-fadeup-3 demo-hero-btns" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" className="demo-cta-pulse" style={{ background: accent, color: '#fff', padding: '15px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Get a Free Quote
              </a>
              <a href={`tel:${config.phone.replace(/\D/g, '')}`} style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '15px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-block', transition: 'background 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}>
                📞 {config.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={{ padding: 'clamp(64px, 10vw, 100px) 24px', background: '#f8f9fa' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ color: accent, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>What We Offer</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: primary, letterSpacing: '-0.02em', margin: 0 }}>
                Our Services
              </h2>
            </div>
            <div className="demo-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {config.services.map((svc, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: `1px solid #eee`, position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                  {/* Accent top bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: primary, margin: 0 }}>{svc.name}</h3>
                    {svc.price && (
                      <span style={{ background: `${accent}18`, color: accent, padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {svc.price}
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{svc.description}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <a href="#contact" style={{ background: primary, color: '#fff', padding: '13px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Book an Appointment →
              </a>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: 'clamp(64px, 10vw, 100px) 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Visual block */}
            <div style={{ flex: '0 0 auto', width: 'clamp(240px, 35%, 340px)', minWidth: '240px' }}>
              <div style={{ background: heroGradient, borderRadius: '16px', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${accent}33 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', marginBottom: '12px' }}>
                    {config.businessType === 'Barbershop' ? '✂️' : config.businessType === 'Plumbing' ? '🔧' : config.businessType === 'Hair Salon' ? '💇' : '⭐'}
                  </div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '24px', lineHeight: 1.2 }}>{config.businessName}</div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginTop: '6px' }}>{config.city}</div>
                  {/* Rating stars */}
                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FFD700', fontSize: '20px' }}>★</span>)}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginTop: '6px' }}>5.0 · Trusted by Detroit</div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: '260px' }}>
              <p style={{ color: accent, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Our Story</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: primary, letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.2 }}>
                About {config.businessName}
              </h2>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '24px' }}>
                {config.about}
              </p>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { num: '5★', label: 'Google Rating' },
                  { num: '100%', label: 'Satisfaction' },
                  { num: '24/7', label: 'Support' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: accent }}>{stat.num}</div>
                    <div style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOURS & CONTACT ── */}
        <section id="hours" style={{ padding: 'clamp(64px, 10vw, 100px) 24px', background: '#f8f9fa' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ color: accent, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Find Us</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: primary, letterSpacing: '-0.02em', margin: 0 }}>Hours & Contact</h2>
            </div>
            <div className="demo-info-row" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }} id="contact">
              {/* Hours */}
              <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: primary, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: `${accent}18`, padding: '6px 10px', borderRadius: '8px', fontSize: '18px' }}>🕐</span>
                  Business Hours
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {config.hours.map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < config.hours.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <span style={{ color: '#555', fontSize: '15px', fontWeight: 500 }}>{h.day}</span>
                      <span style={{ color: h.hours === 'Closed' ? '#ef4444' : primary, fontSize: '15px', fontWeight: 700, background: h.hours === 'Closed' ? '#fef2f2' : `${accent}12`, padding: '4px 12px', borderRadius: '20px' }}>
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: primary, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: `${accent}18`, padding: '6px 10px', borderRadius: '8px', fontSize: '18px' }}>📍</span>
                  Get In Touch
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href={`tel:${config.phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', padding: '14px 16px', borderRadius: '10px', background: `${accent}0d`, border: `1px solid ${accent}22`, transition: 'background 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}1a`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = `${accent}0d`)}>
                    <span style={{ fontSize: '22px' }}>📞</span>
                    <div>
                      <div style={{ fontSize: '11px', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: primary }}>{config.phone}</div>
                    </div>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '10px', background: '#f8f9fa', border: '1px solid #eee' }}>
                    <span style={{ fontSize: '22px' }}>📌</span>
                    <div>
                      <div style={{ fontSize: '11px', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>{config.address}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>{config.city}</div>
                    </div>
                  </div>
                  <a href="#contact" style={{ display: 'block', textAlign: 'center', background: accent, color: '#fff', padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginTop: '4px', transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                    Book an Appointment →
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #eee', minHeight: '280px', background: `${primary}0d`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <div style={{ fontSize: '48px' }}>🗺️</div>
                <div style={{ fontWeight: 700, color: primary, fontSize: '16px' }}>{config.address}</div>
                <div style={{ color: '#666', fontSize: '14px' }}>{config.city}</div>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(config.address + ', ' + config.city)}`} target="_blank" rel="noopener noreferrer"
                  style={{ marginTop: '8px', background: primary, color: '#fff', padding: '10px 22px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 24px', background: heroGradient, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${accent}22 1.5px, transparent 1.5px)`, backgroundSize: '30px 30px', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', marginBottom: '32px', lineHeight: 1.6 }}>
              Call us today or book online. We're ready to serve you.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`tel:${config.phone.replace(/\D/g, '')}`} style={{ background: '#fff', color: primary, padding: '14px 28px', borderRadius: '8px', fontWeight: 800, textDecoration: 'none', fontSize: '16px', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                📞 Call {config.phone}
              </a>
              <a href="#contact" style={{ background: accent, color: '#fff', padding: '14px 28px', borderRadius: '8px', fontWeight: 800, textDecoration: 'none', fontSize: '16px', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Book Online →
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: primary, padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '17px', marginBottom: '6px' }}>{config.businessName}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>{config.address} · {config.city} · {config.phone}</div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>Website built by</span>
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '4px 12px', transition: 'background 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.01em' }}>⚡ Caliber Web Studio</span>
              </a>
            </div>
          </div>
        </footer>

        {/* ── CHATBOT ── */}
        <DemoChatbot config={config} />
      </div>
    </>
  );
}

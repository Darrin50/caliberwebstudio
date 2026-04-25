export default function DemoBanner() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 99999,
        background: '#1a2744',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          padding: '3px 8px',
          borderRadius: '3px',
          flexShrink: 0,
          marginTop: '1px',
        }}
      >
        Demo
      </span>
      <p
        style={{
          margin: 0,
          fontSize: '13px',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.5,
        }}
      >
        Demo website by Caliber Web Studio. This is an illustrative sample, not a live client website.
        Names, photos, testimonials, statistics, and results are example content.
      </p>
    </div>
  )
}

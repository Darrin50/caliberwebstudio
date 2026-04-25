export default function ConceptDisclaimerBar({ spaName }: { spaName: string }) {
  return (
    <div
      className="concept-bar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 99999,
        background: '#2d1a0e',
        borderBottom: '2px solid #b8610a',
        padding: '12px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <strong style={{ color: '#f5c07a', fontSize: '13px', display: 'block' }}>
        Private concept preview for {spaName}
      </strong>
      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', lineHeight: 1.55 }}>
        Created by Caliber Web Studio to show one possible redesign.
        This is not an official website and is not affiliated with or endorsed by {spaName}.
        Logo/name are used for identification in this private preview only.
        Images, results, testimonials, and treatment examples are placeholders unless provided or approved by the business.
      </span>
    </div>
  )
}

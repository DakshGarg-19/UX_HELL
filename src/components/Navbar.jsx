import React from 'react';

export default function Navbar({ onNavClick }) {
  const items = ['होम', 'आवेदन', 'स्थिति जाँचें', 'दस्तावेज़', 'सहायता', 'डाउनलोड', 'संपर्क', 'और अधिक ▼'];

  return (
    <div style={{
      background: '#cc0000', display: 'flex', justifyContent: 'center',
      gap: 0, flexWrap: 'wrap'
    }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <button
            onClick={onNavClick}
            style={{
              background: 'transparent', border: 'none', color: 'white',
              fontSize: 13, fontWeight: 'bold', padding: '6px 12px',
              cursor: 'pointer', fontFamily: 'Arial, sans-serif'
            }}
          >
            {item}
          </button>
          {i < items.length - 1 && (
            <span style={{ color: 'rgba(255,255,255,0.5)', padding: '6px 0', fontSize: 13 }}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

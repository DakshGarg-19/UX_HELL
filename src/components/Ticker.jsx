import React from 'react';

export default function Ticker() {
  const text = "Server Down for Maintenance | सर्वर डाउन है | All Tatkal applications suspended till further notice | Please use Internet Explorer 6 for best experience | Passport Fee hiked by 40% effective immediately | अपनी जानकारी सुरक्षित रखें | New circular: Form 17-B now mandatory | System will restart in 5 minutes (since 2009)";

  return (
    <div style={{
      background: '#ffcc00', display: 'flex', alignItems: 'center',
      overflow: 'hidden', height: 28
    }}>
      <div style={{
        fontWeight: 'bold', color: '#cc0000', fontSize: 12, padding: '0 8px',
        whiteSpace: 'nowrap', minWidth: 'fit-content'
      }}>
        ⚠ महत्वपूर्ण सूचना:
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="marquee-text" style={{ color: '#333', fontSize: 12 }}>
          {text}
        </div>
      </div>
    </div>
  );
}

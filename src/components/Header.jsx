import React from 'react';

export default function Header() {
  return (
    <div style={{ background: '#003366', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* LEFT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#666',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: '#ccc'
        }}>☸</div>
        <div>
          <div style={{ color: 'white', fontSize: 12, fontFamily: 'Georgia, serif' }}>
            इलेक्ट्रॉनिकी एवं सूचना प्रौद्योगिकी मंत्रालय
          </div>
          <div style={{ color: '#aaa', fontSize: 10, fontStyle: 'italic' }}>
            (Ministry of Electronics &amp; IT)
          </div>
          <div style={{ color: 'white', fontSize: 10 }}>
            भारत सरकार (GOVT. OF INDIA)
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#cc0000', fontSize: 22, fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>
          Bharat Passport Jan-Seva
        </div>
        <div style={{ color: 'orange', fontSize: 12 }}>(Beta v1.0.0)</div>
        <div style={{ color: 'white', fontSize: 11, fontStyle: 'italic' }}>
          « सेवा ही धर्म है | Serving since 1952 »
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ border: '1px solid #888', color: 'white', fontSize: 9, padding: '3px 6px', background: '#003355' }}>Digital India</div>
        <div style={{ border: '1px solid #888', color: 'white', fontSize: 9, padding: '3px 6px', background: '#003355' }}>G20 🇮🇳</div>
        <div style={{ border: '1px solid #888', color: 'white', fontSize: 9, padding: '3px 6px', background: '#003355' }}>NIC</div>
        <div style={{
          width: 50, height: 60, background: '#555', border: '1px solid #888',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#aaa', fontSize: 8, textAlign: 'center'
        }}>Official<br />Photo</div>
      </div>
    </div>
  );
}

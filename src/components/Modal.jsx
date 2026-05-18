import React from 'react';

export default function Modal({ title, children, buttons, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)'
    }}>
      <div style={{
        border: '2px solid #003399', boxShadow: '3px 3px 0 #000',
        minWidth: 340, maxWidth: 500, width: '90%'
      }}>
        {/* Title bar */}
        <div style={{
          background: '#003399', color: 'white', fontSize: 13, fontWeight: 'bold',
          padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'Tahoma, Arial, sans-serif'
        }}>
          <span>{title}</span>
          <button onClick={onClose} style={{
            background: '#c0bdb4', color: '#000', border: '1px outset #d4d0c8',
            width: 20, height: 20, fontSize: 12, cursor: 'pointer', lineHeight: '18px',
            padding: 0, fontWeight: 'bold'
          }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ background: '#d4d0c8', padding: 16, fontFamily: 'Arial, sans-serif', fontSize: 13 }}>
          {children}
        </div>
        {/* Footer */}
        <div style={{
          background: '#d4d0c8', padding: '8px 16px 12px', display: 'flex',
          justifyContent: 'center', gap: 8, flexWrap: 'wrap',
          borderTop: '1px solid #999'
        }}>
          {buttons ? buttons.map((btn, i) => (
            <button key={i} onClick={btn.action} className="govt-btn-grey"
              style={{ minWidth: 100 }}>
              {btn.label}
            </button>
          )) : (
            <button onClick={onClose} className="govt-btn-grey" style={{ minWidth: 120 }}>
              समझ गया (OK)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

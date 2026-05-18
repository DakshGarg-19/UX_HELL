import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function FakeRazorpay({
  isOpen,
  amount = "₹50,000",
  recipientName = "Dept. of Bureaucracy & Chai",
  description = "Tatkal Sahayata Rashi (Gift) — Bilkul bribe nahi hai 😇",
  prefillName = "",
  onSuccess,
  onDismiss
}) {
  const [selectedTab, setSelectedTab] = useState('upi');
  const payBtnRef = useRef(null);

  const handlePayHover = () => {
    if (payBtnRef.current) {
      gsap.to(payBtnRef.current, {
        x: (Math.random() * 120) - 60,
        y: (Math.random() * 40) - 20,
        duration: 0.25,
        ease: "power2.out"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: 380, background: 'white', borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        overflow: 'hidden'
      }}>
        {/* HEADER BAR */}
        <div style={{
          background: '#002970', padding: 16,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: 16, fontFamily: 'Arial, sans-serif' }}>
              Razorpay
            </span>
            <span style={{ fontSize: 14 }}>🔒</span>
          </div>
          <button
            onClick={onDismiss}
            style={{
              background: 'none', border: 'none', color: 'white',
              fontSize: 20, cursor: 'pointer', lineHeight: 1, padding: 0
            }}
          >×</button>
        </div>

        {/* AMOUNT SECTION */}
        <div style={{
          background: '#f8f9fa', padding: 16,
          borderBottom: '1px solid #eee'
        }}>
          <div style={{ color: '#888', fontSize: 12 }}>{recipientName}</div>
          <div style={{ fontWeight: 'bold', fontSize: 24, color: '#000', marginTop: 4 }}>{amount}</div>
          <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{description}</div>
        </div>

        {/* FORM SECTION */}
        <div style={{ padding: 16 }}>
          {/* Prefilled fields */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 2 }}>Name</label>
            <input readOnly value={prefillName || "Aam Aadmi"}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, background: '#f9f9f9', color: '#333' }} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 2 }}>Email</label>
            <input readOnly value="aam.aadmi@bharat.gov.in"
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, background: '#f9f9f9', color: '#333' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 2 }}>Phone</label>
            <input readOnly value="9999999999"
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, background: '#f9f9f9', color: '#333' }} />
          </div>

          {/* Separator */}
          <div style={{
            textAlign: 'center', color: '#999', fontSize: 11,
            margin: '12px 0', position: 'relative'
          }}>
            <span style={{
              background: 'white', padding: '0 8px', position: 'relative', zIndex: 1
            }}>— Pay via —</span>
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              height: 1, background: '#eee', zIndex: 0
            }} />
          </div>

          {/* Payment method tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {[
              { key: 'card', icon: '💳', label: 'Card' },
              { key: 'upi', icon: '🏦', label: 'UPI' },
              { key: 'netbanking', icon: '🏛', label: 'Net Banking' }
            ].map(tab => (
              <button key={tab.key} onClick={() => setSelectedTab(tab.key)}
                style={{
                  flex: 1, padding: '8px 4px', fontSize: 12,
                  background: 'white', cursor: 'pointer',
                  border: selectedTab === tab.key ? '2px solid #2b6be6' : '1px solid #ddd',
                  borderRadius: 4, color: selectedTab === tab.key ? '#2b6be6' : '#666',
                  fontWeight: selectedTab === tab.key ? 'bold' : 'normal'
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* UPI section */}
          {selectedTab === 'upi' && (
            <div>
              <input placeholder="Enter UPI ID (e.g. name@upi)"
                style={{
                  width: '100%', padding: '8px 10px', border: '1px solid #ddd',
                  borderRadius: 4, fontSize: 13
                }} />
              <div style={{ color: '#999', fontSize: 10, marginTop: 4 }}>
                You will receive a payment request on your UPI app
              </div>
            </div>
          )}

          {selectedTab === 'card' && (
            <div>
              <input placeholder="Card Number"
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, marginBottom: 8 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="MM/YY" style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }} />
                <input placeholder="CVV" style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }} />
              </div>
            </div>
          )}

          {selectedTab === 'netbanking' && (
            <div>
              <select style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }}>
                <option>Select Bank</option>
                <option>State Bank of India</option>
                <option>Bank of India (Server Down)</option>
                <option>Punjab National Bank (Under Maintenance)</option>
                <option>HDFC Bank (Not Authorized)</option>
              </select>
            </div>
          )}
        </div>

        {/* PAY BUTTON */}
        <div style={{ padding: '0 16px 16px', overflow: 'visible', minHeight: 60 }}>
          <button
            ref={payBtnRef}
            onMouseEnter={handlePayHover}
            onClick={onSuccess}
            style={{
              width: '100%', background: '#2b6be6', color: 'white',
              fontSize: 14, fontWeight: 'bold', height: 44,
              border: 'none', borderRadius: 4, cursor: 'pointer',
              position: 'relative'
            }}
          >
            PAY {amount} →
          </button>
        </div>

        {/* FOOTER */}
        <div style={{
          background: '#f8f9fa', padding: 8,
          textAlign: 'center', borderTop: '1px solid #eee'
        }}>
          <span style={{ color: '#999', fontSize: 11 }}>
            🔒 Secured by <span style={{ color: '#2b6be6', fontWeight: 'bold' }}>Razorpay</span>
          </span>
        </div>
      </div>
    </div>
  );
}

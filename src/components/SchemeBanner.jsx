import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SCHEMES = [
  {
    title: "🎉 PM Awas Yojana Maha Lucky Draw!",
    body: "Aapka naam lucky draw mein select hua hai! ₹2,50,000 ka prize claim karne ke liye Form 42-B submit karein.",
    cta: "Claim Now (Form unavailable)"
  },
  {
    title: "📢 Ujjwala Yojana 3.0 — Free Cylinder!",
    body: "Har parivar ko 3 free cylinders milenge. Apply karne ki antim tithi: Kal (yeh offer 2009 se chal raha hai).",
    cta: "Apply (Server down)"
  },
  {
    title: "🌾 PM Kisan Samman Nidhi — ₹6000 INCOMING!",
    body: "Aapke khate mein ₹6000 transfer hone wale hain. Processing time: 6-8 business years.",
    cta: "Check Status (404 Not Found)"
  },
  {
    title: "💡 Har Ghar Bijli — FREE ELECTRICITY!",
    body: "Muft bijli yojana ke antargat aapka bijli bill zero hoga. Kripya 47 dastavez upload karein.",
    cta: "Upload Documents (Max size: 2KB)"
  },
  {
    title: "🏥 Ayushman Bharat — FREE HEALTH CARD!",
    body: "5 lakh ka health insurance bilkul FREE! Registered hospitals: 0 in your area.",
    cta: "Find Hospital (None available)"
  },
  {
    title: "📱 Digital India — FREE SMARTPHONE!",
    body: "Sarkar de rahi hai muft smartphone! Stock remaining: 3 (population: 140 crore).",
    cta: "Register (Already full)"
  }
];

const MINISTRIES = [
  "Ministry of Chai & Biscuits",
  "Ministry of Queue Management",
  "Ministry of Circular Letters",
  "Ministry of Lost Files",
  "Ministry of Rubber Stamps",
  "Ministry of Pending Approvals",
  "Ministry of Undecided Affairs"
];

export default function SchemeBanner({ currentStep }) {
  const [visible, setVisible] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);
  const bannerRef = useRef(null);
  const dismissTimeoutRef = useRef(null);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = (Math.random() * 15000) + 25000; // 25-40 seconds
      return setTimeout(() => {
        // Don't show on Screen 4
        if (currentStep === 4) {
          const nextId = scheduleNext();
          return () => clearTimeout(nextId);
        }

        const scheme = SCHEMES[Math.floor(Math.random() * SCHEMES.length)];
        setCurrentScheme(scheme);
        setVisible(true);
      }, delay);
    };

    const timeoutId = scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [visible, currentStep]);

  // Animate in when visible becomes true
  useEffect(() => {
    if (visible && bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { y: -100 },
        { y: 0, duration: 0.4, ease: "bounce.out" }
      );

      // Auto-dismiss after 8 seconds
      dismissTimeoutRef.current = setTimeout(() => {
        dismissBanner();
      }, 8000);
    }

    return () => {
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    };
  }, [visible]);

  const dismissBanner = () => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: -100, duration: 0.3, ease: "power2.in",
        onComplete: () => setVisible(false)
      });
    } else {
      setVisible(false);
    }
  };

  if (!visible || !currentScheme) return null;

  const randomMinistry = MINISTRIES[Math.floor(Math.random() * MINISTRIES.length)];

  return (
    <div ref={bannerRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9990
    }}>
      {/* Main banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6600, #ffcc00)',
        borderBottom: '3px solid #cc0000',
        padding: '10px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 12
      }}>
        {/* LEFT */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>
            {currentScheme.title}
          </div>
          <div style={{ fontSize: 11, color: '#333', marginTop: 2 }}>
            {currentScheme.body}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => alert("Yeh service abhi available nahi hai. Try again in 6-8 business years.")}
            style={{
              background: '#e0e0e0', color: '#000', fontSize: 11,
              border: '1px solid #999', padding: '4px 10px',
              cursor: 'not-allowed', borderRadius: 2, whiteSpace: 'nowrap'
            }}
          >
            {currentScheme.cta}
          </button>
          <button
            onClick={dismissBanner}
            style={{
              background: 'none', border: 'none', color: '#000',
              fontSize: 16, fontWeight: 'bold', cursor: 'pointer',
              padding: '0 4px', lineHeight: 1
            }}
          >×</button>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        background: '#ffee58', padding: '2px 0',
        textAlign: 'center', fontSize: 10, color: '#555'
      }}>
        Sponsored by {randomMinistry} | Not responsible for accuracy
      </div>
    </div>
  );
}

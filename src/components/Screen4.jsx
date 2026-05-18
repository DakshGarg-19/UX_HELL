import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const LOG_MESSAGES = [
  "Verifying identity with Aadhaar... ✓",
  "Cross-referencing criminal records...",
  "Checking Sharma Ji's chai fund... ✓",
  "Forwarding to Joint Commissioner...",
  "Joint Commissioner on leave. Forwarding to Deputy Joint Commissioner...",
  "Deputy Joint Commissioner retired in 2019. Forwarding to AI System...",
  "AI System also on lunch break. Forwarding to intern...",
  "Intern found. Intern is also on leave.",
  "✓ APPLICATION SOMEHOW APPROVED. God knows how."
];

export default function Screen4({ fullName, fatherName, selectedAddress, onReset }) {
  const [phase, setPhase] = useState(1);
  const [logs, setLogs] = useState([]);
  const progressRef = useRef(null);

  useEffect(() => {
    if (phase === 1 && progressRef.current) {
      const tl = gsap.timeline();
      tl.to(progressRef.current, { width: "67%", duration: 1.0, ease: "power1.out" })
        .to(progressRef.current, { width: "99%", duration: 1.5, ease: "power1.inOut" })
        .to(progressRef.current, { width: "43%", duration: 0.3, ease: "power2.in" })
        .to(progressRef.current, { width: "71%", duration: 0.5, ease: "power1.out" })
        .to(progressRef.current, { width: "100%", duration: 1.0, ease: "bounce.out" })
        .call(() => setPhase(2));

      // Log messages
      LOG_MESSAGES.forEach((msg, i) => {
        setTimeout(() => {
          setLogs(prev => [...prev, msg]);
        }, (i + 1) * 1000);
      });
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 2) {
      try { new Audio('/audio/dhoom.mp3').play().catch(() => {}); } catch (e) {}
    }
  }, [phase]);

  const certNo = `MORT/2024/${Math.floor(Math.random() * 900000 + 100000)}`;
  const dateStr = new Date().toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (phase === 1) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Georgia, serif', marginBottom: 8 }}>
          आवेदन प्रसंस्करण हो रहा है... (Processing your application...)
        </div>
        <div style={{ color: '#888', marginBottom: 16 }}>
          Kripya prateeksha karein. Sabr rakho. Almost there. Bas thoda aur.
        </div>

        <div className="progress-outer" style={{ marginBottom: 16 }}>
          <div ref={progressRef} className="progress-inner" />
        </div>

        <div style={{ textAlign: 'left', fontFamily: "'Courier New', monospace", fontSize: 12, background: '#111', color: '#0f0', padding: 12, maxHeight: 200, overflowY: 'auto' }}>
          {logs.map((log, i) => <div key={i}>&gt; {log}</div>)}
          <span className="blink-anim">▊</span>
        </div>
      </div>
    );
  }

  // Phase 2: Death Certificate
  return (
    <div style={{ padding: 12 }}>
      {/* Certificate */}
      <div style={{ border: '10px double #8B4513', padding: 8, background: 'white', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ border: '4px solid #FFD700', padding: '32px 40px', background: '#FFFEF0' }}>
          {/* Emblem */}
          <div style={{
            width: 60, height: 60, borderRadius: '50%', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, background: '#f0f0f0', border: '2px solid #8B4513'
          }}>🏛</div>

          <div style={{ textAlign: 'center', color: '#cc0000', fontSize: 36, fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>
            GOVERNMENT OF INDIA
          </div>
          <div style={{ textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 16 }}>
            Ministry of Mortuary Affairs &amp; Documentation
          </div>

          <hr style={{ border: '2px solid #8B4513', marginBottom: 16 }} />

          <div style={{ textAlign: 'center', fontSize: 48, fontFamily: 'Georgia, serif', fontWeight: 'bold', textDecoration: 'underline', marginBottom: 8 }}>
            OFFICIAL DEATH CERTIFICATE
          </div>
          <div style={{ textAlign: 'center', color: '#888', fontSize: 12, marginBottom: 8 }}>
            Certificate No: {certNo}
          </div>

          <hr style={{ borderStyle: 'dashed', borderColor: '#999', marginBottom: 16 }} />

          <div style={{ fontSize: 16, fontFamily: 'Arial, sans-serif', lineHeight: 2 }}>
            <p>This is to solemnly certify that:</p>
            <p><b>Name:</b> {fullName || '(Unknown Citizen)'}</p>
            <p><b>Son/Daughter of:</b> {fatherName || '(Unknown Parent)'}</p>
            <p><b>Resident of:</b> {selectedAddress || '(Address Unknown)'}</p>
            <br />
            <p><b>CAUSE OF DEATH:</b> Exhaustion from Government Paperwork &amp; Bureaucracy.</p>
            <p><b>Secondary Cause:</b> CAPTCHA-related psychological trauma.</p>
            <p><b>Tertiary Cause:</b> Waiting for server to come back from lunch.</p>
            <br />
            <p><b>DATE &amp; TIME OF DEMISE:</b> {dateStr}</p>
            <br />
            <p><b>PLACE OF DEMISE:</b> Waiting Room No. 3, Bharat Passport Jan-Seva Portal, Cyber Cell, Ministry of Suffering, New Delhi - 110001</p>
            <br />
            <p style={{ fontSize: 12, fontStyle: 'italic' }}>This document is official. Challenging it is punishable under Section 420 IPC.</p>
          </div>

          {/* Signature row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 32 }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ textDecoration: 'underline wavy #000', fontStyle: 'italic', fontSize: 16, marginBottom: 4 }}>
                ~~~~~~~~~~~~
              </div>
              <div style={{ fontWeight: 'bold' }}>Yamraj</div>
              <div style={{ fontSize: 10, color: '#666' }}>Dept. of Mortal Affairs &amp; Bureaucratic Termination</div>
              <div style={{ fontSize: 10, color: '#666' }}>New Delhi - 110001</div>
            </div>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', border: '3px solid red',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', fontSize: 9, color: 'red', fontWeight: 'bold', lineHeight: 1.4
            }}>
              GOVT OF INDIA<br />VERIFIED<br />⭐ 2154 ⭐<br />OFFICIAL
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button className="govt-btn-grey" style={{ width: '100%', marginTop: 16, padding: 10, fontSize: 13 }}
        onClick={() => alert("Aapka download queue mein add kar diya gaya hai.\n(Your download has been queued.)\nEstimated download time: 6-8 business years.\nThank you for your patience.")}>
        📥 Download Certificate (Warning: File size: 847 MB)
      </button>

      {/* Thank you box */}
      <div style={{ background: '#d4edda', border: '1px solid #28a745', padding: 12, marginTop: 12, fontSize: 13 }}>
        ✅ Bharat Passport Jan-Seva Portal use karne ke liye dhanyavaad! (Thank you for using this portal. We hope your experience was... memorable.)
      </div>

      {/* Apply Again */}
      <button className="govt-btn" style={{ width: '100%', marginTop: 12, fontSize: 16 }}
        onClick={onReset}>
        🔄 Apply Again (Main character energy)
      </button>
    </div>
  );
}

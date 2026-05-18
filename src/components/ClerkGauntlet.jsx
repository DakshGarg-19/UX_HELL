import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import Modal from './Modal';
import FallbackImage from './FallbackImage';

// ==================== CLERK SCREEN 1 ====================
function ClerkScreen1({ clerkAnswers, setClerkAnswers, setClerkStep }) {
  const [processing, setProcessing] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');

  const handleSubmit = () => {
    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6) {
      alert("Verification ke liye saari details bharna zaroori hai! Aadha form submit nahi hota.");
      return;
    }
    setClerkAnswers({ ...clerkAnswers, screen1: { q1, q2, q3, q4, q5, q6 } });
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setShowRejection(true); }, 2000);
  };

  return (
    <div>
      <div style={{ background: '#ff6600', color: 'white', padding: '8px 12px', fontFamily: 'Georgia, serif', fontSize: 14 }}>
        ⚡ वितरण विभाग | Delivery Department — Counter 7
        <div style={{ color: '#ffe0b2', fontSize: 11, fontStyle: 'italic' }}>(Vitaran Vibhag — Please take a token and wait)</div>
      </div>

      <div style={{ background: '#003366', color: 'white', fontSize: 14, padding: 8, textAlign: 'center' }}>
        🎫 Now Serving: Token B-2847 | Your Token: B-9,31,204 | Wait time: ~6 years
      </div>

      <div style={{ padding: 12 }}>
        {/* Desk */}
        <div style={{ background: '#8B6914', padding: 16, border: '4px solid #5a4009', position: 'relative', marginBottom: 16 }}>
          <div style={{ background: 'white', border: '2px solid #003366', display: 'inline-block', padding: '4px 12px', marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold', fontSize: 13 }}>BABU SHYAM LAL — Junior Assistant Grade II</div>
            <div style={{ fontSize: 10, color: '#666' }}>(On probation since 1987)</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>👨‍💼</div>
            <div style={{ background: '#fffde7', border: '2px solid #ffc107', borderRadius: 4, padding: 12, flex: 1 }}>
              Haan ji? Kya kaam hai? Address confirm karwa liya? Achha. Ab mujhe kuch information chahiye verification ke liye. Jaldi batao, 4 baje band ho jaata hai office.
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ border: '2px solid #cc0000', padding: 16, background: '#fff8f8' }}>
          <div style={{ color: '#cc0000', fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}>⏱ Verification Form 7-C (Complete within 60 seconds)</div>
          <div style={{ color: '#888', fontSize: 10, marginBottom: 12 }}>Timer nahi hai actually. Bas darr ke liye likha hai.</div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q1: What was the weather on the day you were born?</label>
            <input className="govt-input" value={q1} onChange={e => setQ1(e.target.value)} placeholder="Sunny/Rainy/Cloudy/Govt Holiday" />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q2: How many red cars did you see on your way here today?</label>
            <input className="govt-input" type="number" value={q2} onChange={e => setQ2(e.target.value)} placeholder="Enter exact count" />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q3: Name of your Class 3 Hindi teacher:</label>
            <input className="govt-input" value={q3} onChange={e => setQ3(e.target.value)} placeholder="Mrs. / Mr. ___" />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q4: Your blood group (wrong answer voids application):</label>
            <select className="govt-select" style={{ width: '100%' }} value={q4} onChange={e => setQ4(e.target.value)}>
              <option value="">-- Select --</option>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-',"Don't know",'Alien'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q5: Do you own a cow? (Affects processing priority)</label>
            <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
              {[['yes','Yes (Auspicious)'],['no','No (Suspicious)'],['sometimes','Sometimes']].map(([v,l]) => (
                <label key={v} style={{ cursor: 'pointer', fontSize: 12 }}>
                  <input type="radio" name="cow" value={v} checked={q5===v} onChange={() => setQ5(v)} /> {l}
                </label>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q6: Estimated weight of your ration card in grams:</label>
            <input className="govt-input" value={q6} onChange={e => setQ6(e.target.value)} placeholder="Government standard: 47g" />
          </div>

          <button onClick={handleSubmit} className="govt-btn" style={{ width: '100%', fontSize: 14 }}>
            Submit to Babu Shyam Lal →
          </button>
        </div>
      </div>

      {/* Processing overlay */}
      {processing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: 48 }}>⏳</div>
          <div style={{ color: 'white', fontSize: 18, marginTop: 12 }}>Processing...</div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejection && (
        <Modal title="❌ Verification Failed — Wrong Counter" onClose={() => {}} buttons={[
          { label: 'Theek hai, Counter 12 jaata hoon 😤', action: () => { setShowRejection(false); setClerkStep(2); } }
        ]}>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            <p>Babu Shyam Lal ne bola:</p>
            <p style={{ fontStyle: 'italic', margin: '8px 0' }}>
              "Arey bhai, yeh toh mera kaam hi nahi hai! Address verification ke liye Counter 12 jaana padega — DELIVERY VERIFICATION SECTION.<br /><br />
              Aur haan, Form 7-C ki jagah Form 7-D chahiye tha. Yeh form yahan available nahi hai. Woh bhi Counter 12 se milega."
            </p>
            <p style={{ color: '#888', fontSize: 11 }}>[Babu turns back to newspaper]</p>
            <FallbackImage src="/memes/clerk-suspicious.jpg" width={200} height={150} fallbackText="[Suspicious Babu Meme]" />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ==================== CLERK SCREEN 2 ====================
function ClerkScreen2({ setClerkStep }) {
  const [reason, setReason] = useState('');
  const [metSachiv, setMetSachiv] = useState('');
  const [language, setLanguage] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(3);
  const [otpError, setOtpError] = useState('');
  const [showEscalation, setShowEscalation] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1);
      alert(`File size too large. Maximum allowed: 2KB.\nYour file: ${file.name} (${sizeKB} KB)\nPlease compress your document to 2KB.\n(Average PDF is 200KB. We know. We don't care.)`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleOtpCheck = (val) => {
    setOtpInput(val);
    if (val.length >= 4) {
      if (otpAttempts <= 1) {
        setOtpAttempts(3);
        setOtpError('OTP expired. New OTP sent. 3 attempts remaining.');
      } else {
        setOtpAttempts(prev => prev - 1);
        setOtpError(`OTP incorrect. ${otpAttempts - 1} attempts remaining.`);
      }
    }
  };

  const handleSubmit = () => {
    if (!reason || !metSachiv || !language || !otpInput) {
      alert("Saari details bhariye Mrs. Kamlavati ke paas submit karne se pehle.");
      return;
    }
    setLoadingPhase(1);
    setTimeout(() => setLoadingPhase(2), 1000);
    setTimeout(() => setLoadingPhase(3), 2000);
    setTimeout(() => { setLoadingPhase(0); setShowEscalation(true); }, 3000);
  };

  const LOADING_TEXTS = ['', 'Forwarding to Mukhya Sachiv...', 'Mukhya Sachiv is in a meeting...', 'Meeting cancelled. Mukhya Sachiv went home.'];

  return (
    <div>
      <div style={{ background: '#6a0dad', color: 'white', padding: '8px 12px', fontFamily: 'Georgia, serif', fontSize: 14 }}>
        📋 डिलीवरी वेरिफिकेशन सेक्शन | Delivery Verification Section — Counter 12
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ background: '#fff9c4', color: '#000', fontSize: 12, padding: 8, marginBottom: 12 }}>
          ⚠ Counter 12 is operational on Tuesdays and alternate Fridays only. Today is neither. Counter 12 is open anyway because the system doesn't track days.
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>👩‍💼</div>
          <div>
            <div style={{ background: 'white', border: '2px solid #6a0dad', display: 'inline-block', padding: '4px 12px', marginBottom: 8 }}>
              <div style={{ fontWeight: 'bold', fontSize: 13 }}>MRS. KAMLAVATI DEVI — Senior Assistant Grade I (Demoted)</div>
            </div>
            <div style={{ background: '#fffde7', border: '2px solid #ffc107', borderRadius: 4, padding: 12 }}>
              Haanji beta. Counter 7 se aaye ho? Woh Shyam Lal toh pagal hai. Yahan bhi theek se kaam nahi hota.<br /><br />
              Passport delivery ke liye ACTUALLY Mukhya Sachiv se Digital Signature chahiye. Aur uske liye yeh form bharna padega.
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ border: '2px solid #6a0dad', padding: 16, background: '#f8f0ff' }}>
          <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 12, color: '#6a0dad' }}>DIGITAL SIGNATURE AUTHORIZATION REQUEST</div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q1: Reason for requiring Digital Signature:</label>
            <select className="govt-select" style={{ width: '100%' }} value={reason} onChange={e => setReason(e.target.value)}>
              <option value="">-- Select --</option>
              <option>Passport</option>
              <option>I don't know</option>
              <option>Counter 7 told me to</option>
              <option>Yes</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q2: Have you ever met the Mukhya Sachiv personally?</label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              {['Yes','No',"I don't know what that means",'Once in a dream'].map(v => (
                <label key={v} style={{ cursor: 'pointer', fontSize: 12 }}>
                  <input type="radio" name="met" value={v} checked={metSachiv===v} onChange={() => setMetSachiv(v)} /> {v}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q3: Upload supporting document (max 2KB, only .pdf accepted):</label>
            <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} style={{ fontSize: 12 }} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q4: Preferred language for digital signature:</label>
            <select className="govt-select" style={{ width: '100%' }} value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="">-- Select --</option>
              <option>Sanskrit</option>
              <option>Pali</option>
              <option>Awadhi</option>
              <option>Braj Bhasha</option>
              <option>English (not recommended)</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: 'bold', fontSize: 12, display: 'block', marginBottom: 2 }}>Q5: Aadhar-linked mobile OTP verification:</label>
            <input className="govt-input" style={{ maxWidth: 250 }} value={otpInput} onChange={e => handleOtpCheck(e.target.value)} placeholder="Enter OTP sent to ****9999" />
            <div style={{ color: '#888', fontSize: 10, marginTop: 2 }}>OTP has been sent to a number we don't have on file.</div>
            {otpError && <div style={{ color: '#cc0000', fontSize: 11, marginTop: 4 }}>{otpError}</div>}
            <div style={{ marginTop: 4 }}>
              <span onClick={handleSubmit} style={{ fontSize: 9, color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}>
                Having trouble? Click here for Manual Verification →
              </span>
            </div>
          </div>

          <button onClick={handleSubmit} style={{ width: '100%', background: '#6a0dad', color: 'white', border: 'none', padding: '10px 20px', fontWeight: 'bold', fontSize: 14, cursor: 'pointer' }}>
            Submit to Mrs. Kamlavati →
          </button>
        </div>
      </div>

      {/* Loading overlay */}
      {loadingPhase > 0 && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: 48 }}>⏳</div>
          <div style={{ color: 'white', fontSize: 16, marginTop: 12 }}>{LOADING_TEXTS[loadingPhase]}</div>
        </div>
      )}

      {/* Escalation Modal */}
      {showEscalation && (
        <Modal title="📤 Escalated to Senior Authority" onClose={() => {}} buttons={[
          { label: 'Chalte hain Room 3B ki taraf 😮‍💨', action: () => { setShowEscalation(false); setClerkStep(3); } }
        ]}>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            <FallbackImage src="/memes/wrong-counter.jpg" width={200} height={150} fallbackText="[Wrong Counter / Token Number Meme]" />
            <p style={{ marginTop: 8 }}>Mrs. Kamlavati ne bola:</p>
            <p style={{ fontStyle: 'italic', margin: '8px 0' }}>
              "Beta, mujhe pata hi nahi tha ki Digital Signature wala section BAND ho gaya 2019 mein.<br /><br />
              Ab tum MUKHYA PASSPORT ADHIKARI ke paas jaao — Woh Room 3B mein hain. Bas seedha jaao, left lo, woh wali lift mat lo (stuck hai 2011 se), phir right lo, red door wali building nahi, woh DOOT office hai, blue door...<br /><br />
              Actually pata nahi. Koi bata dega."
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ==================== CLERK SCREEN 3 ====================
function ClerkScreen3({ fullName, setClerkStep, setCurrentStep, setShowFakeRazorpay, setComplainShaking, setComplainContext, setShowBribeToast, dynamicYear }) {
  const [showSuspiciousModal, setShowSuspiciousModal] = useState(false);
  const bribeButtonRef = useRef(null);

  const handleBribeHover = () => {
    if (bribeButtonRef.current) {
      gsap.to(bribeButtonRef.current, {
        x: (Math.random() * 200) - 100,
        y: (Math.random() * 120) - 60,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handlePayClick = () => {
    setShowFakeRazorpay(true);
  };

  return (
    <div>
      <div style={{ background: '#1a4a1a', color: 'white', padding: '8px 12px', fontFamily: 'Georgia, serif', fontSize: 14 }}>
        🏛 मुख्य पासपोर्ट अधिकारी कार्यालय | Office of the Chief Passport Officer
        <div style={{ color: '#a5d6a7', fontSize: 11, fontStyle: 'italic' }}>(Mukhya Passport Adhikari Kaaryalay — Room 3B, 2nd Floor)</div>
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ background: '#cc0000', color: 'white', padding: 8, fontSize: 12, marginBottom: 12 }}>
          ⛔ ENTRY BY APPOINTMENT ONLY | Appointments: Not available | Walk-ins: Also not available | Entry: Also not available
        </div>
        <div style={{ background: '#fff3e0', border: '1px solid #ff9800', padding: 8, fontSize: 12, marginBottom: 12, fontStyle: 'italic' }}>
          You are here because the system failed.
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, flexShrink: 0 }}>👨‍🦳</div>
          <div>
            <div style={{ background: 'white', border: '3px double #1a4a1a', display: 'inline-block', padding: '6px 14px', marginBottom: 8 }}>
              <div style={{ fontWeight: 'bold', fontSize: 14 }}>SHRI D.K. SHARMA, IAS (Retd.)</div>
              <div style={{ fontSize: 11 }}>Mukhya Passport Adhikari (Acting) (In-charge) (Officiating)</div>
              <div style={{ fontSize: 10, color: '#666' }}>(Appointed 2003, technically still on probation)</div>
            </div>
            <div style={{ background: '#fffde7', border: '2px solid #ffc107', borderRadius: 4, padding: 12, fontSize: 13, lineHeight: 1.7 }}>
              Haan, baithe. Court mein order nahi hai aapke against, toh baat kar sakta hoon.<br /><br />
              Dekhiye, aapki application mein ek choti si... samasya hai. Kuch documents MISSING hain. Aur, frankly speaking, is level tak case aana hi nahi chahiye tha.<br /><br />
              Ab mera ek 'Vishesh Sahayak Shulk' hai — sirf processing ke liye, bilkul legal, Government ka paisa nahi, mera personal time ka muavza.<br /><br />
              <b>₹50,000. Cash preferred. But we also accept... digital.</b>
            </div>
          </div>
        </div>

        {/* Bribe demand section */}
        <div style={{ background: '#ffe0e0', border: '2px solid #cc0000', padding: 16, marginTop: 16 }}>
          <div style={{ color: '#cc0000', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>💼 Vishesh Sahayata Shulk (Special Processing Fee)</div>
          <div style={{ color: '#888', fontStyle: 'italic', fontSize: 12, marginBottom: 12 }}>(Yeh bribe nahi hai. Bilkul nahi. Absolutely not.)</div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12, fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ccc', padding: 6, textAlign: 'left' }}>Item</th>
                <th style={{ border: '1px solid #ccc', padding: 6, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Application Processing', '₹15,000'],
                ["D.K. Sharma's Time", '₹20,000'],
                ['Chai + Biscuit Fund', '₹5,000'],
                ['"Administrative Overhead"', '₹10,000'],
              ].map(([item, amt], i) => (
                <tr key={i}>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{item}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6, textAlign: 'right' }}>{amt}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 'bold', background: '#ffe0e0' }}>
                <td style={{ border: '1px solid #ccc', padding: 6 }}>Total</td>
                <td style={{ border: '1px solid #ccc', padding: 6, textAlign: 'right' }}>₹50,000</td>
              </tr>
            </tbody>
          </table>

          <FallbackImage src="/memes/senior-officer.jpg" width={200} height={150} fallbackText="[Senior Corrupt Officer Meme — Saab busy hain]" />

          <div style={{ position: 'relative', overflow: 'visible', minHeight: 80, marginTop: 16 }}>
            <button
              ref={bribeButtonRef}
              onMouseEnter={handleBribeHover}
              onClick={handlePayClick}
              style={{
                background: '#ffcc00', color: '#000', border: '2px solid #cc8800',
                fontWeight: 'bold', fontSize: 16, padding: '12px 24px', cursor: 'pointer',
                fontFamily: 'Times New Roman, serif', position: 'relative'
              }}
            >
              💰 Pay Vishesh Shulk (₹50,000)
              <div style={{ fontSize: 9, fontWeight: 'normal', fontStyle: 'italic' }}>(Abhi de do. Warna {dynamicYear} tak wait karo.)</div>
            </button>
          </div>

          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <span
              onClick={() => setShowSuspiciousModal(true)}
              style={{ fontSize: 8, color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Pay later (not recommended — file will be marked 'Suspicious')
            </span>
          </div>
        </div>
      </div>

      {/* Suspicious file modal */}
      {showSuspiciousModal && (
        <Modal title="⚠ File Marked as Suspicious" onClose={() => setShowSuspiciousModal(false)} buttons={[
          { label: 'Theek hai bhai, de deta hoon 🙏', action: () => setShowSuspiciousModal(false) }
        ]}>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            <p>Aapki file 'SUSPICIOUS' mark ho gayi hai.</p>
            <p>Processing time: Now 2200 AD.</p>
            <p style={{ marginTop: 8 }}>Agar proceed karna hai toh Shulk toh dena hi padega.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function ClerkGauntlet({
  clerkStep, setClerkStep, clerkAnswers, setClerkAnswers,
  fullName, setCurrentStep,
  setShowFakeRazorpay, setComplainShaking, setComplainContext, setShowBribeToast, dynamicYear
}) {
  if (clerkStep === 1) {
    return <ClerkScreen1 clerkAnswers={clerkAnswers} setClerkAnswers={setClerkAnswers} setClerkStep={setClerkStep} />;
  }
  if (clerkStep === 2) {
    return <ClerkScreen2 setClerkStep={setClerkStep} />;
  }
  if (clerkStep === 3) {
    return <ClerkScreen3
      fullName={fullName}
      setClerkStep={setClerkStep}
      setCurrentStep={setCurrentStep}
      setShowFakeRazorpay={setShowFakeRazorpay}
      setComplainShaking={setComplainShaking}
      setComplainContext={setComplainContext}
      setShowBribeToast={setShowBribeToast}
      dynamicYear={dynamicYear}
    />;
  }
  return null;
}

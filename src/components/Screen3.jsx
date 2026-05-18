import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function Screen3({
  appId, fullName, selectedState,
  setCurrentStep,
  setComplainShaking, setComplainContext,
  setShowBribeToast, setShowFakeLoader, showFakeLoader
}) {
  const approveButtonRef = useRef(null);
  const fakeProgressRef = useRef(null);

  const handleMouseEnter = () => {
    if (approveButtonRef.current) {
      gsap.to(approveButtonRef.current, {
        x: (Math.random() * 200) - 100,
        y: (Math.random() * 120) - 60,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const loadAndOpenRazorpay = () => {
    if (window.Razorpay) { openRazorpay(); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => openRazorpay();
    script.onerror = () => {
      triggerBribeFlow();
    };
  };

  const openRazorpay = () => {
    const options = {
      key: "YOUR_KEY_ID",
      amount: "5000000",
      currency: "INR",
      name: "Dept. of Bureaucracy & Chai",
      description: "Tatkal Sahayata Rashi (Gift) — Bilkul bribe nahi hai 😇",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
      order_id: "order_BPS2154TATKAL",
      handler: function (response) {
        alert("🎉 Sahayata Rashi prapt hui! Application fast-tracked to... 2154. Dhanyavaad!");
        setCurrentStep(4);
      },
      prefill: { name: fullName, email: "aam.aadmi@bharat.gov.in", contact: "9999999999" },
      notes: { address: "Sarkari Kaaryalay, Room No. 3B, New Delhi - 110001" },
      theme: { color: "#808080" },
      modal: {
        ondismiss: function () {
          setComplainShaking(true);
          setComplainContext('bribe');
          setShowBribeToast(true);
        }
      }
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function () {
        setComplainShaking(true);
        setComplainContext('bribe');
        setShowBribeToast(true);
      });
      rzp1.open();
    } catch (e) {
      triggerBribeFlow();
    }
  };

  const triggerBribeFlow = () => {
    setComplainShaking(true);
    setComplainContext('bribe');
    setShowBribeToast(true);
    setShowFakeLoader(true);
    setTimeout(() => { setShowFakeLoader(false); setCurrentStep(4); }, 5000);
  };

  return (
    <div>
      {/* Section header */}
      <div style={{ background: '#003366', color: 'white', padding: '8px 12px', fontFamily: 'Georgia, serif', fontSize: 14 }}>
        चरण 3: आवेदन स्थिति | Step 3 of 4: Application Status
        <div style={{ color: '#aaa', fontSize: 11, fontStyle: 'italic' }}>(Charan 3: Aavedan Sthiti)</div>
      </div>

      <div style={{ padding: 12 }}>
        {/* Application Tracker */}
        <div style={{ border: '2px solid #003366', padding: 16, marginBottom: 16, background: 'white' }}>
          <table style={{ fontSize: 13, lineHeight: 2 }}>
            <tbody>
              <tr><td style={{ fontWeight: 'bold', paddingRight: 16 }}>Application ID:</td><td>{appId}</td></tr>
              <tr><td style={{ fontWeight: 'bold', paddingRight: 16 }}>Applicant Name:</td><td>{fullName || '(Not provided)'}</td></tr>
              <tr><td style={{ fontWeight: 'bold', paddingRight: 16 }}>Delivery State:</td><td>{selectedState}</td></tr>
              <tr><td style={{ fontWeight: 'bold', paddingRight: 16 }}>Status:</td>
                <td><span className="orange-blink" style={{ color: 'orange', fontSize: 16 }}>🟠</span> PENDING REVIEW</td></tr>
            </tbody>
          </table>
        </div>

        {/* Progress Timeline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, overflow: 'auto' }}>
          {[
            { label: 'Submitted', icon: '✓', done: true },
            { label: 'Received', icon: '✓', done: true },
            { label: 'Under Review', icon: '⏳', pending: true },
            { label: 'Approval', icon: '🔒', locked: true },
            { label: 'Dispatch', icon: '🔒', locked: true },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 0, margin: '0 auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: 'white',
                  background: step.done ? '#28a745' : step.pending ? '#ff8c00' : '#999'
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: 10, marginTop: 4,
                  textDecoration: step.locked ? 'line-through' : 'none',
                  color: step.locked ? '#999' : '#333'
                }}>
                  {step.label}
                </div>
              </div>
              {i < 4 && <div style={{ flex: 1, height: 2, background: step.done ? '#28a745' : '#ccc', margin: '0 4px' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Approval Date */}
        <div style={{ background: '#ffe0e0', border: '2px solid #cc0000', padding: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 12 }}>🗓 अनुमानित अनुमोदन तिथि: (Anumaanit Anumodan Tithi — Estimated Approval Date)</div>
          <div style={{ fontWeight: 'bold', color: '#cc0000', fontSize: 22, fontFamily: 'Georgia, serif' }}>14th August, 2154</div>
          <div style={{ color: '#888', fontSize: 11 }}>(Subject to server availability, chai fund status, and whether the processing officer is on leave)</div>
        </div>

        <hr style={{ borderStyle: 'dashed', margin: '16px 0' }} />

        {/* Tatkal VIP Section */}
        <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>⚡ Tatkal / VIP Processing (Fast Track Seva)</div>
        <div style={{ background: '#ece9d8', border: '1px solid #999', padding: 12, marginBottom: 16, fontSize: 13, lineHeight: 1.8 }}>
          For urgent processing, a nominal 'Sahayata Rashi' (Donation/Gift) is required by the processing officer. This is completely voluntary and definitely not a bribe at all 😉.<br /><br />
          <b>Sahayata Rashi Amount: ₹50,000</b><br /><br />
          Processing Time after Gift: Still 2154, but you'll feel better about it.
        </div>

        {/* Escape Button */}
        <div style={{ position: 'relative', overflow: 'visible', minHeight: 80, marginBottom: 16 }}>
          <button
            ref={approveButtonRef}
            onMouseEnter={handleMouseEnter}
            onClick={() => loadAndOpenRazorpay()}
            style={{
              background: '#ffcc00', color: '#000', border: '2px solid #cc8800',
              fontWeight: 'bold', fontSize: 16, padding: '12px 24px', cursor: 'pointer',
              fontFamily: 'Times New Roman, serif', position: 'relative'
            }}
          >
            💰 Approve Now (Pay Gift / Tatkal VIP)
            <div style={{ fontSize: 9, fontWeight: 'normal', fontStyle: 'italic' }}>
              (Abhi Approve Karo — Sahayata Rashi De Do)
            </div>
          </button>
        </div>
      </div>

      {/* Fake Loader Overlay */}
      {showFakeLoader && <FakeLoader ref={fakeProgressRef} />}
    </div>
  );
}

const FakeLoader = React.forwardRef((props, ref) => {
  const progressRef = useRef(null);

  React.useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, { width: '100%', duration: 5, ease: 'power1.inOut' });
    }
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9994,
      background: 'rgba(0,0,0,0.85)', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ fontSize: 60 }}>⏳</div>
      <div style={{ color: 'white', fontSize: 18, marginTop: 16 }}>Processing your request... Kripya prateeksha karein...</div>
      <div style={{ width: 300, height: 16, background: '#555', marginTop: 16, border: '1px solid #888' }}>
        <div ref={progressRef} style={{ height: '100%', background: '#cc0000', width: '0%' }} />
      </div>
      <div style={{ color: '#888', fontSize: 12, marginTop: 8 }}>This may take 6-8 business years.</div>
    </div>
  );
});

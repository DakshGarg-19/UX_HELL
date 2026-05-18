import { gsap } from 'gsap';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import { LeftSidebar, RightSidebar } from './components/Sidebars';
import Footer from './components/Footer';
import Modal from './components/Modal';
import FallbackImage from './components/FallbackImage';
import Screen0 from './components/Screen0';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import Screen4 from './components/Screen4';
import FakeRazorpay from './components/FakeRazorpay';
import SchemeBanner from './components/SchemeBanner';
import ClerkGauntlet from './components/ClerkGauntlet';

export default function App() {
  // ===== NAVIGATION =====
  const [currentStep, setCurrentStep] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  // ===== CLERK GAUNTLET =====
  const [clerkStep, setClerkStep] = useState(0);
  const [clerkAnswers, setClerkAnswers] = useState({});

  // ===== FORM DATA =====
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState(null);
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [motherLabel, setMotherLabel] = useState("Mother's Name* (Mata ka Naam)");
  const [motherLabelChanged, setMotherLabelChanged] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  // ===== ADDRESS / MAP =====
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [pinPlaced, setPinPlaced] = useState(false);
  const [pinX, setPinX] = useState(null);
  const [pinY, setPinY] = useState(null);

  // ===== SCREEN 1 PRANK STATE =====
  const [hasWiped, setHasWiped] = useState(false);
  const [captchaAttempts, setCaptchaAttempts] = useState(0);
  const [genderPrankCount, setGenderPrankCount] = useState(0);

  // ===== GLOBAL MECHANICS =====
  const [complainContext, setComplainContext] = useState('general');
  const [complainShaking, setComplainShaking] = useState(false);
  const [showBribeToast, setShowBribeToast] = useState(false);
  const [showFakeLoader, setShowFakeLoader] = useState(false);
  const [showFakeRazorpay, setShowFakeRazorpay] = useState(false);

  // ===== GLOBAL WAIT TIME (shared across Sidebar, Screen3, Complain Modal) =====
  const [waitYears, setWaitYears] = useState(74);
  const [waitMonths, setWaitMonths] = useState(3);
  const [waitDays, setWaitDays] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.2) {
        setWaitDays(prev => prev + Math.floor(Math.random() * 15) + 5);
        if (Math.random() < 0.1) setWaitMonths(prev => prev + 1);
      } else {
        setWaitDays(prev => prev <= 1 ? 1 : prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dynamicYear = new Date().getFullYear() + waitYears;

  // ===== MODAL STATE =====
  const [navModalOpen, setNavModalOpen] = useState(false);
  const [complainModalOpen, setComplainModalOpen] = useState(false);
  const [sirPleaseModal, setSirPleaseModal] = useState(false);
  const [twoFatherFlash, setTwoFatherFlash] = useState(false);

  // ===== COMPUTED =====
  const appId = useMemo(() =>
    "BPS/2024/" + Math.floor(Math.random() * 90000000 + 10000000),
    [resetCount]);

  // ===== REFS =====
  const complainBtnRef = useRef(null);
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  // ===== CUSTOM CURSOR =====
  useEffect(() => {
    const handleMouseMove = (e) => {
      gsap.to("#custom-cursor", {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.9,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ===== COMPLAIN BUTTON SHAKE =====
  useEffect(() => {
    if (complainShaking && complainBtnRef.current) {
      gsap.to(complainBtnRef.current, {
        x: 10, duration: 0.05, repeat: 10, yoyo: true,
        onComplete: () => {
          gsap.set(complainBtnRef.current, { x: 0 });
          setComplainShaking(false);
        }
      });
    }
  }, [complainShaking]);

  // ===== SET COMPLAIN CONTEXT ON STEP CHANGE =====
  useEffect(() => {
    if (clerkStep > 0) {
      if (clerkStep === 3) setComplainContext('bribe');
      else setComplainContext('general');
      return;
    }
    if (currentStep === 0) setComplainContext('general');
    if (currentStep === 1) setComplainContext('gender');
    if (currentStep === 2) setComplainContext('general');
    if (currentStep === 3) setComplainContext('bribe');
    if (currentStep === 4) setComplainContext('general');
  }, [currentStep, clerkStep]);

  // ===== RESET ALL STATE =====
  const handleReset = () => {
    setCurrentStep(0);
    setClerkStep(0);
    setClerkAnswers({});
    setShowFakeRazorpay(false);
    setFullName('');
    setGender(null);
    setFatherName('');
    setMotherName('');
    setMotherLabel("Mother's Name* (Mata ka Naam)");
    setMotherLabelChanged(false);
    setMobileNumber('');
    setRefNumber('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    setSelectedAddress('');
    setSelectedState('');
    setPinPlaced(false);
    setPinX(null);
    setPinY(null);
    setHasWiped(false);
    setCaptchaAttempts(0);
    setGenderPrankCount(0);
    setComplainContext('general');
    setComplainShaking(false);
    setShowBribeToast(false);
    setShowFakeLoader(false);
    setResetCount(prev => prev + 1);
  };

  // ===== COMPLAIN MODAL CONTENT =====
  const getComplainContent = () => {
    switch (complainContext) {
      case 'general':
        return {
          title: '📢 शिकायत / Shikayat',
          body: (
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              <p>Possible complaints:</p>
              <ul style={{ paddingLeft: 16 }}>
                <li>Difficulty navigating portal</li>
                <li>UI is confusing and hostile</li>
                <li>Server is always down</li>
              </ul>
            </div>
          ),
          buttons: [
            { label: 'Theek hai yaar 😔', action: () => setComplainModalOpen(false) },
            { label: 'Main haar gaya 😭', action: () => setComplainModalOpen(false) }
          ]
        };
      case 'gender':
        return {
          title: '📢 Gender Shikayat',
          body: (
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              <p>Gender changed without consent. This is a violation of Article 21.</p>
            </div>
          ),
          buttons: [
            { label: 'Accept Government Decision 🙏', action: () => setComplainModalOpen(false) },
            { label: 'File RTI', action: () => { setComplainModalOpen(false); window.open('about:blank'); } }
          ]
        };
      case 'parents':
        return {
          title: '📢 Do Baap Shikayat',
          body: (
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              <p>Being asked to fill details for two fathers. This is biologically impossible.</p>
            </div>
          ),
          buttons: [
            { label: 'Chalta hai 😅', action: () => setComplainModalOpen(false) },
            {
              label: 'Mere do do baap 😤', action: () => {
                setComplainModalOpen(false);
                setTwoFatherFlash(true);
                setTimeout(() => setTwoFatherFlash(false), 1500);
              }
            }
          ]
        };
      case 'wipe':
        return {
          title: '📢 Data Loss Shikayat',
          body: (
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              <p>All data erased without warning. Demanding ₹0 compensation.</p>
            </div>
          ),
          buttons: [
            { label: "Fine I'll retype it 😤", action: () => setComplainModalOpen(false) },
            { label: 'I want compensation 💀', action: () => setComplainModalOpen(false) }
          ]
        };
      case 'bribe': {
        const buttons = [
          { label: `Main ${dynamicYear} tak wait karunga 😮‍💨`, action: () => setComplainModalOpen(false) },
          {
            label: "Please sir it's urgent! 🙏", action: () => {
              setComplainModalOpen(false);
              setSirPleaseModal(true);
              setTimeout(() => setSirPleaseModal(false), 5000);
            }
          },
          {
            label: 'TU JAANTA NAHI MERA BAAP KAUN HAI 😤', action: () => {
              setComplainModalOpen(false);
              if (clerkStep === 3) {
                setClerkStep(0);
              }
              setCurrentStep(4);
            }
          }
        ];
        // 4th option when on clerk screen 3
        if (clerkStep === 3) {
          buttons.push({
            label: "I'll just pay and get this over with 💸",
            action: () => { setComplainModalOpen(false); setShowFakeRazorpay(true); }
          });
        }
        return {
          title: '📢 Ghoos / Bribe Shikayat',
          body: (
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              <p>Being asked for ₹50,000 gift — "Aapko kya karna hai?"</p>
            </div>
          ),
          buttons
        };
      }
      default:
        return { title: '📢 शिकायत', body: <p>No complaint context.</p>, buttons: [{ label: 'OK', action: () => setComplainModalOpen(false) }] };
    }
  };

  const complainContent = getComplainContent();

  // ===== RENDER CONTENT =====
  const renderContent = () => {
    if (clerkStep > 0) {
      return (
        <ClerkGauntlet
          clerkStep={clerkStep} setClerkStep={setClerkStep}
          clerkAnswers={clerkAnswers} setClerkAnswers={setClerkAnswers}
          fullName={fullName} setCurrentStep={setCurrentStep}
          setShowFakeRazorpay={setShowFakeRazorpay}
          setComplainShaking={setComplainShaking}
          setComplainContext={setComplainContext}
          setShowBribeToast={setShowBribeToast}
          dynamicYear={dynamicYear}
        />
      );
    }

    switch (currentStep) {
      case 0: return <Screen0 setCurrentStep={setCurrentStep} />;
      case 1: return (
        <Screen1
          fullName={fullName} setFullName={setFullName}
          gender={gender} setGender={setGender}
          fatherName={fatherName} setFatherName={setFatherName}
          motherName={motherName} setMotherName={setMotherName}
          motherLabel={motherLabel} setMotherLabel={setMotherLabel}
          motherLabelChanged={motherLabelChanged} setMotherLabelChanged={setMotherLabelChanged}
          genderPrankCount={genderPrankCount} setGenderPrankCount={setGenderPrankCount}
          captchaAttempts={captchaAttempts} setCaptchaAttempts={setCaptchaAttempts}
          hasWiped={hasWiped} setHasWiped={setHasWiped}
          setCurrentStep={setCurrentStep}
          setComplainContext={setComplainContext}
          mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}
          refNumber={refNumber} setRefNumber={setRefNumber}
          dobDay={dobDay} setDobDay={setDobDay}
          dobMonth={dobMonth} setDobMonth={setDobMonth}
          dobYear={dobYear} setDobYear={setDobYear}
          resetCount={resetCount}
        />
      );
      case 2: return (
        <Screen2
          pinPlaced={pinPlaced} setPinPlaced={setPinPlaced}
          pinX={pinX} setPinX={setPinX}
          pinY={pinY} setPinY={setPinY}
          selectedState={selectedState} setSelectedState={setSelectedState}
          selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}
          setCurrentStep={setCurrentStep}
          setClerkStep={setClerkStep}
        />
      );
      case 3: return (
        <Screen3
          appId={appId} fullName={fullName} selectedState={selectedState}
          setCurrentStep={setCurrentStep}
          setComplainShaking={setComplainShaking}
          setComplainContext={setComplainContext}
          setShowBribeToast={setShowBribeToast}
          setShowFakeLoader={setShowFakeLoader}
          showFakeLoader={showFakeLoader}
          setShowFakeRazorpay={setShowFakeRazorpay}
          waitYears={waitYears} waitMonths={waitMonths} waitDays={waitDays} dynamicYear={dynamicYear}
        />
      );
      case 4: return (
        <Screen4
          fullName={fullName} fatherName={fatherName}
          selectedAddress={selectedAddress} onReset={handleReset}
          dynamicYear={dynamicYear}
        />
      );
      default: return <Screen0 setCurrentStep={setCurrentStep} />;
    }
  };

  // Determine FakeRazorpay props based on context
  const razorpayProps = clerkStep === 3 ? {
    amount: "₹50,000",
    recipientName: "D.K. Sharma (Personal)",
    description: "Vishesh Sahayata Shulk — Room 3B Processing",
  } : {
    amount: "₹50,000",
    recipientName: "Dept. of Bureaucracy & Chai",
    description: "Tatkal Sahayata Rashi (Gift) — Bilkul bribe nahi hai 😇",
  };

  return (
    <div style={{ cursor: 'none', minHeight: '100vh', background: '#f5f0e8' }}>
      {/* Custom Cursor */}
      <div id="custom-cursor" style={{
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 9999, fontSize: 20
      }}>⏳</div>

      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar onNavClick={() => setNavModalOpen(true)} />

      {/* Ticker */}
      <Ticker />

      {/* Scheme Banner (replaces lunch break scheduler) */}
      <SchemeBanner currentStep={currentStep} />

      {/* 3-Column Layout */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 200px)' }}>
        <LeftSidebar waitYears={waitYears} waitMonths={waitMonths} waitDays={waitDays} />
        <div style={{ flex: 1, borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', background: '#fff', minWidth: 0 }}>
          {renderContent()}
        </div>
        <RightSidebar />
      </div>

      {/* Footer */}
      <Footer />

      {/* ===== GLOBAL OVERLAYS ===== */}

      {/* Nav Under Construction Modal */}
      {navModalOpen && (
        <Modal title="निर्माण जारी है (Under Construction)" onClose={() => setNavModalOpen(false)}>
          <p>Yeh section abhi bana nahi hai. Please check back in 6-8 business years.</p>
        </Modal>
      )}

      {/* Complain Button (hidden on screen 4) */}
      {currentStep !== 4 && (
        <div ref={complainBtnRef} style={{
          position: 'fixed', bottom: 16, left: 16, zIndex: 9997,
        }}>
          <button
            onClick={() => setComplainModalOpen(true)}
            style={{
              background: '#cc0000', color: 'white', border: '2px solid #800000',
              padding: '8px 12px', fontWeight: 'bold', fontSize: 13,
              fontFamily: 'Arial, sans-serif', cursor: 'pointer'
            }}
          >
            📢 शिकायत करें
            <div style={{ fontSize: 9, fontStyle: 'italic', fontWeight: 'normal' }}>
              (Shikayat Karein — File Complaint)
            </div>
          </button>
        </div>
      )}

      {/* Complain Modal */}
      {complainModalOpen && (
        <Modal title={complainContent.title} onClose={() => setComplainModalOpen(false)}
          buttons={complainContent.buttons}>
          {complainContent.body}
        </Modal>
      )}

      {/* Sir Please Modal */}
      {sirPleaseModal && (
        <Modal title="🥺 Sir Please..." onClose={() => setSirPleaseModal(false)}>
          <div style={{ textAlign: 'center' }}>
            <FallbackImage src="/memes/sir-please.jpg" width={200} height={150}
              fallbackText="[Sir Please 🥹 — Please sir ek baar consider karo]" />
            <div style={{ marginTop: 8, fontSize: 14 }}>Sir please... ek baar consider karo 🥺</div>
          </div>
        </Modal>
      )}

      {/* Two Father Flash */}
      {twoFatherFlash && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10001,
          background: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 120
        }}>
          😂
        </div>
      )}

      {/* Bribe Toast */}
      {showBribeToast && currentStep !== 4 && (
        <div
          onClick={() => { setShowBribeToast(false); setComplainModalOpen(true); setComplainContext('bribe'); }}
          className="pulse-anim"
          style={{
            position: 'fixed', bottom: 70, left: 16, zIndex: 9996,
            background: '#cc0000', color: 'white', border: '2px dashed #ffcc00',
            padding: 8, fontSize: 11, maxWidth: 180, cursor: 'pointer'
          }}
        >
          💡 Ghoos maanda gaya?<br />
          (Bribe attempt hua?)<br />
          Shikayat karein! ☝️
        </div>
      )}

      {/* Fake Razorpay Modal */}
      <FakeRazorpay
        isOpen={showFakeRazorpay}
        amount={razorpayProps.amount}
        recipientName={razorpayProps.recipientName}
        description={razorpayProps.description}
        prefillName={fullName}
        onSuccess={() => {
          setShowFakeRazorpay(false);
          if (clerkStep === 3) {
            setClerkStep(0);
          }
          setCurrentStep(4);
        }}
        onDismiss={() => {
          setShowFakeRazorpay(false);
          setComplainShaking(true);
          setComplainContext('bribe');
          setShowBribeToast(true);
          setTimeout(() => setComplainShaking(false), 2000);
        }}
      />

      {/* Fake Loader (from Screen 3) */}
      {showFakeLoader && (
        <FakeLoaderOverlay />
      )}
    </div>
  );
}

function FakeLoaderOverlay() {
  const progressRef = useRef(null);
  useEffect(() => {
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
      <div style={{ color: 'white', fontSize: 18, marginTop: 16 }}>
        Processing your request... Kripya prateeksha karein...
      </div>
      <div style={{ width: 300, height: 16, background: '#555', marginTop: 16, border: '1px solid #888' }}>
        <div ref={progressRef} style={{ height: '100%', background: '#cc0000', width: '0%' }} />
      </div>
      <div style={{ color: '#888', fontSize: 12, marginTop: 8 }}>
        This may take 6-8 business years.
      </div>
    </div>
  );
}

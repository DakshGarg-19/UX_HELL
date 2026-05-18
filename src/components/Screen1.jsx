import React, { useState } from "react";
import { gsap } from "gsap";
import FallbackImage from "./FallbackImage";
import Modal from "./Modal";
import useCaptcha from "./CaptchaSection";

export default function Screen1({
  fullName, setFullName,
  gender, setGender,
  fatherName, setFatherName,
  motherName, setMotherName,
  motherLabel, setMotherLabel,
  motherLabelChanged, setMotherLabelChanged,
  genderPrankCount, setGenderPrankCount,
  captchaAttempts, setCaptchaAttempts,
  hasWiped, setHasWiped,
  setCurrentStep, setComplainContext,
  mobileNumber, setMobileNumber,
  refNumber, setRefNumber,
  dobDay, setDobDay,
  dobMonth, setDobMonth,
  dobYear, setDobYear,
  resetCount,
}) {
  const [mobileError, setMobileError] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showParentsModal, setShowParentsModal] = useState(false);
  const [showWipeOverlay, setShowWipeOverlay] = useState(false);

  // ── Data wipe logic (extracted so captcha can call it) ──
  const triggerDataWipe = () => {
    gsap.to("body", { backgroundColor: "#ffffff", duration: 0.1, yoyo: true, repeat: 3 });
    setShowWipeOverlay(true);
    setTimeout(() => {
      setShowWipeOverlay(false);
      setFullName(""); setGender(null); setFatherName(""); setMotherName("");
      setMobileNumber(""); setRefNumber(""); setDobDay(""); setDobMonth(""); setDobYear("");
      setCaptchaAttempts(0);
      setHasWiped(true);
      setComplainContext("wipe");
      captchaHook.resetCaptcha();
    }, 4000);
  };

  // ── CAPTCHA hook ──
  const captchaHook = useCaptcha({
    captchaAttempts,
    setCaptchaAttempts,
    onCaptchaPassed: () => {
      // This is the original Step B / Step C logic
      if (!hasWiped) {
        triggerDataWipe();
        return;
      }
      // Already wiped — proceed to next step
      setCurrentStep(2);
    },
  });

  // ── Non-CAPTCHA handlers (unchanged) ──
  const handleGenderChange = (val) => {
    setGender(val);
    if (genderPrankCount < 2) {
      setTimeout(() => {
        const opposite = val === "male" ? "female" : "male";
        setGender(opposite);
        setGenderPrankCount((prev) => prev + 1);
        setComplainContext("gender");
        setShowGenderModal(true);
      }, 1000);
    }
  };

  const handleMotherFocus = () => {
    if (!motherLabelChanged) {
      setMotherLabel("Father's Name (2)* (Doosre Pita ka Naam)");
      setMotherLabelChanged(true);
      setComplainContext("parents");
      setShowParentsModal(true);
    }
  };

  const handleMobileBlur = () => {
    if (mobileNumber.length !== 11 || !mobileNumber.startsWith("0")) {
      setMobileError(
        "Galat number bhai! Must start with 0 and be exactly 11 digits. STD code is mandatory. e.g., 0XXXXXXXXXX. Ye format 1987 se chal raha hai.",
      );
    } else {
      setMobileError("");
    }
  };

  // ── NEXT button handler ──
  const handleNext = () => {
    // Delegate to CAPTCHA validation first — it returns true if it's handling things
    if (captchaHook.validate()) return;
  };

  return (
    <div>
      {/* Section header */}
      <div style={{ background: "#003366", color: "white", padding: "8px 12px", fontFamily: "Georgia, serif", fontSize: 14 }}>
        चरण 1: व्यक्तिगत विवरण | Step 1 of 4: Personal Details
        <div style={{ color: "#aaa", fontSize: 11, fontStyle: "italic" }}>(Charan 1: Vyaktigat Vivaran)</div>
      </div>

      <div style={{ padding: 12 }}>
        {/* Full Name */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>
            Full Name<span style={{ color: "red" }}>*</span> (Poora Naam)
          </label>
          <input className="govt-input" value={fullName} onChange={(e) => setFullName(e.target.value)}
            placeholder="As per Aadhaar (no nicknames, no Guddu, no Pappu)" />
        </div>

        {/* Application Reference Number */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>
            Application Reference Number<span style={{ color: "red" }}>*</span>{" "}(Aavedan Sankhya)
          </label>
          <input className="govt-input" value={refNumber} onChange={(e) => setRefNumber(e.target.value)}
            placeholder="Format: XX-YYYY-ZZZZ/AAAA" />
          <div style={{ color: "#888", fontSize: 10, marginTop: 2 }}>
            Format: 2 letters, hyphen, 4 numbers, hyphen, 4 letters, slash, 4 letters. Must include a valid Western astrological sun sign abbreviation.
          </div>
          {refNumber && (
            <div style={{ color: "#cc0000", fontSize: 11, marginTop: 4, border: "1px solid #cc0000", padding: 4, background: "#fff0f0" }}>
              Arre bhai! Invalid format. Must contain exactly 2 letters, 4 numbers, 4 letters, and a valid astrological sign
              (Ari/Tau/Gem/Can/Leo/Vir/Lib/Sco/Sag/Cap/Aqu/Pis). Current entry: {refNumber} — REJECTED 🚫
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>Date of Birth<span style={{ color: "red" }}>*</span></label>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <div>
              <label style={{ fontSize: 9 }}>Day<span style={{ color: "red" }}>*</span></label>
              <select className="govt-select" value={dobDay} onChange={(e) => setDobDay(e.target.value)}>
                <option value="">--</option>
                {Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 9 }}>Month<span style={{ color: "red" }}>*</span></label>
              <select className="govt-select" value={dobMonth} onChange={(e) => setDobMonth(e.target.value)}>
                <option value="">--</option>
                {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 9 }}>Year<span style={{ color: "red" }}>*</span></label>
              <select className="govt-select" value={dobYear} onChange={(e) => setDobYear(e.target.value)}>
                <option value="">--</option>
                {Array.from({ length: 196 }, (_, i) => <option key={i} value={1995 - i}>{1995 - i}</option>)}
              </select>
            </div>
          </div>
          <div style={{ color: "#888", fontSize: 9, marginTop: 2 }}>
            Note: Year range 1800–1995. Persons born after 1995 are not yet recognized as adults by this portal.
          </div>
        </div>

        {/* Gender */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>
            Gender<span style={{ color: "red" }}>*</span> (Ling — please select carefully, Government will verify)
          </label>
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            <label style={{ cursor: "pointer", fontSize: 13 }}>
              <input type="radio" name="gender" checked={gender === "male"} onChange={() => handleGenderChange("male")} /> Male (Purush)
            </label>
            <label style={{ cursor: "pointer", fontSize: 13 }}>
              <input type="radio" name="gender" checked={gender === "female"} onChange={() => handleGenderChange("female")} /> Female (Mahila)
            </label>
          </div>
        </div>

        {/* Father's Name */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>Father's Name<span style={{ color: "red" }}>*</span> (Pita ka Naam)</label>
          <input className="govt-input" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
        </div>

        {/* Mother's Name (or Father 2) */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>{motherLabel}</label>
          <input id="mothers-name-input" className="govt-input" value={motherName}
            onChange={(e) => setMotherName(e.target.value)} onFocus={handleMotherFocus} />
        </div>

        {/* Mobile Number */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold", fontSize: 12 }}>
            Mobile Number<span style={{ color: "red" }}>*</span> (STD Code Required — Apna Mobile Number)
          </label>
          <input className="govt-input" value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)} onBlur={handleMobileBlur} />
          {mobileError && <div style={{ color: "#cc0000", fontSize: 11, marginTop: 4 }}>{mobileError}</div>}
        </div>

        {/* ── NEW CAPTCHA SECTION (rendered by hook) ── */}
        {captchaHook.captchaJSX}

        {/* Next Button */}
        <button onClick={handleNext} className="govt-btn"
          style={{ width: "100%", fontSize: 18, padding: "14px 20px", height: 48 }}
          disabled={captchaHook.submitting}>
          आगे बढ़ें → (Aage Badhen — Proceed to Next Step)
        </button>
      </div>

      {/* Gender Prank Modal */}
      {showGenderModal && (
        <Modal title="🔄 Gender Verification Alert" onClose={() => setShowGenderModal(false)}>
          <div style={{ textAlign: "center" }}>
            <FallbackImage src="/memes/leo.jpg" width={200} height={150}
              fallbackText="[Leonardo DiCaprio Pointing Meme — Aap chronology samajhiye]" />
            <div style={{ fontWeight: "bold", fontSize: 14, marginTop: 8 }}>Aap chronology samajhiye.</div>
            <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
              Gender swapped by Government Mandate under Form 7(b). (Sarkar ne aapki gender badal di — please cooperate.)
            </div>
          </div>
        </Modal>
      )}

      {/* Parents Prank Modal */}
      {showParentsModal && (
        <Modal title="👨‍👨‍👦 Parent Verification Alert" onClose={() => setShowParentsModal(false)}>
          <div style={{ textAlign: "center" }}>
            <FallbackImage src="/memes/dodo-baap.jpg" width={200} height={150}
              fallbackText="[Mere Do Do Baap Meme — Two fathers detected 😱]" />
            <div style={{ fontWeight: "bold", fontSize: 14, marginTop: 8 }}>Mere do do baap?! 😱</div>
            <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
              Ye kaise possible hai? Portal confused hai. (The portal has detected two fathers. Please explain.)
            </div>
          </div>
        </Modal>
      )}

      {/* Wipe Overlay */}
      {showWipeOverlay && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9995, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <FallbackImage src="/memes/sleep.jpg" width={300} height={200}
            fallbackText="[Sleeping Government Officer 😴 — Server on break]" />
          <div style={{ color: "#cc0000", fontWeight: "bold", fontSize: 24, marginTop: 16 }}>⚠ SERVER CRASHED. DATA LOST.</div>
          <div style={{ color: "#cc0000", fontSize: 18, marginTop: 8 }}>LUNCH BREAK IN PROGRESS.</div>
          <div style={{ color: "#666", fontStyle: "italic", fontSize: 13, marginTop: 8, maxWidth: 500, textAlign: "center" }}>
            Sabhi data swatah nasht ho gaya. (All data has been automatically destroyed.) Please refill the form. We apologise for the inconvenience. We are not actually sorry.
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';

const CODE_POOL = ['INDIA','SEVA5','BHARAT','FORM7','SARKAR','DELHI','VOTE4','APPLY','PASS1','GARIB'];
function generateCode() { return CODE_POOL[Math.floor(Math.random() * CODE_POOL.length)]; }
function generateCode2() {
  const pool = ['JAI7','HIND5','NIC99','BABU3','DESK1'];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function useCaptcha({ captchaAttempts, setCaptchaAttempts, onCaptchaPassed }) {
  const [captchaCode, setCaptchaCode] = useState(() => generateCode());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [captchaExpireTimer, setCaptchaExpireTimer] = useState(45);
  const expireRef = useRef(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(null);
  const [checkboxPhase, setCheckboxPhase] = useState(0);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [showDoubleCaptcha, setShowDoubleCaptcha] = useState(false);
  const [captchaCode2, setCaptchaCode2] = useState('');
  const [captchaInput2, setCaptchaInput2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitPhase, setSubmitPhase] = useState(0);

  const startExpireTimer = useCallback(() => {
    if (expireRef.current) clearInterval(expireRef.current);
    setCaptchaExpireTimer(45);
    const id = setInterval(() => {
      setCaptchaExpireTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setCaptchaCode(generateCode());
          setCaptchaInput(''); setCaptchaInput2('');
          setCaptchaError('⏰ CAPTCHA expired!\nAap zyada soch rahe the. Naya code generate ho gaya.');
          setHasStartedTyping(false); setCheckboxPhase(0);
          setCheckbox1(false); setCheckbox2(false);
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    expireRef.current = id;
  }, []);

  useEffect(() => { startExpireTimer(); return () => { if (expireRef.current) clearInterval(expireRef.current); }; }, [startExpireTimer]);

  // Re-start expire timer when it hits 45 again after expiry
  useEffect(() => {
    if (captchaExpireTimer === 45 && !expireRef.current) startExpireTimer();
  }, [captchaExpireTimer, startExpireTimer]);

  const handleRefreshCaptcha = () => {
    const nc = refreshCount + 1;
    setRefreshCount(nc);
    setCaptchaCode(generateCode()); setCaptchaInput(''); setCaptchaInput2('');
    setCaptchaError(''); setCaptchaExpireTimer(45); setHasStartedTyping(false);
    setCheckboxPhase(0); setCheckbox1(false); setCheckbox2(false);
    if (expireRef.current) clearInterval(expireRef.current);
    startExpireTimer();
    if (nc === 2) setCaptchaError('⚠ Arre bhai, phir se refresh? Pehle wala bhi sahi tha.\n(The old code was perfectly fine.)');
    if (nc === 3) { setShowDoubleCaptcha(true); setCaptchaCode2(generateCode2()); setCaptchaError('🚨 Bahut zyada refresh! Ab 2 CAPTCHAs solve karne honge.'); }
    if (nc > 3) setCaptchaError(`Refresh #${nc}. Ek aur pe session suspend ho sakti hai.`);
  };

  const handleCaptchaInput = (e) => {
    const v = e.target.value.toUpperCase();
    if (!hasStartedTyping) setHasStartedTyping(true);
    setCaptchaInput(v);
    if (captchaError && !captchaError.includes('paste')) setCaptchaError('');
  };

  const handleCaptchaKeydown = (e) => {
    const now = Date.now();
    if (lastKeystroke && (now - lastKeystroke) < 80) {
      e.preventDefault(); setCaptchaInput('');
      setCaptchaError('🤖 Bot detected! Type slowly like a govt employee.\nInput cleared.');
      setLastKeystroke(null); return;
    }
    setLastKeystroke(now);
  };

  const handlePaste = (e) => { e.preventDefault(); setCaptchaError('🚫 Copy-paste detected! Type karo haath se.'); };
  const handleCtxMenu = (e) => { e.preventDefault(); setCaptchaError('Right-click bhi nahi chalega bhai. 😤'); };

  const handleCheckbox1 = () => {
    if (checkboxPhase === 1) { setCheckbox1(true); setCheckboxPhase(2); setTimeout(() => { setCheckbox1(false); setCheckboxPhase(3); }, 3000); }
    if (checkboxPhase === 3) { setCheckbox1(true); setCheckboxPhase(4); }
  };
  const handleCheckbox2 = () => { setCheckbox2(true); setCheckboxPhase(5); };

  const triggerSubmissionQueue = (onComplete) => {
    setSubmitting(true); setSubmitProgress(0); setSubmitPhase(1);
    setSubmitMessage('Submitting CAPTCHA response...');
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog >= 89) {
        prog = 89; clearInterval(iv); setSubmitProgress(89); setSubmitPhase(2);
        setSubmitMessage('Server busy. Response queued...');
        setTimeout(() => {
          setSubmitPhase(3); setSubmitMessage('Connection lost. Retrying...');
          setTimeout(() => {
            setSubmitProgress(100); setSubmitPhase(4); setSubmitMessage('✓ CAPTCHA Verified! Redirecting...');
            setTimeout(() => { setSubmitting(false); setSubmitProgress(0); setSubmitPhase(0); onComplete(); }, 1500);
          }, 2000);
        }, 5000);
      } else { setSubmitProgress(prog); }
    }, 300);
  };

  const validate = () => {
    if (submitting) return true;
    if (checkboxPhase >= 1 && checkboxPhase < 5) {
      setCaptchaError('Pehle robot confirmation complete karo!'); return true;
    }
    const cc = captchaCode.toUpperCase(), ui = captchaInput.toUpperCase().trim();
    if (showDoubleCaptcha) {
      const c2 = captchaCode2.toUpperCase(), u2 = captchaInput2.toUpperCase().trim();
      if (ui !== cc || u2 !== c2) {
        setCaptchaError('Dono CAPTCHA galat hain ya ek galat hai. Dobara try karo.');
        setCaptchaAttempts(p => p + 1); setCaptchaInput(''); setCaptchaInput2(''); return true;
      }
    }
    if (!showDoubleCaptcha && ui !== cc) {
      const msgs = [
        'Galat! Dhyan se dekho. Code is right there. No tricks.',
        'Phir galat! Code clearly dikh raha hai. Are you okay?',
        'Bhai... code aankho ke saamne hai. No case-sensitivity. No spaces.',
        'Itni baar galat? Government is concerned about you.'
      ];
      setCaptchaError(msgs[Math.min(captchaAttempts, msgs.length - 1)]);
      setCaptchaAttempts(p => p + 1); setCaptchaInput(''); return true;
    }
    if (checkboxPhase === 0) { setCheckboxPhase(1); setCaptchaError(''); return true; }
    if (checkboxPhase === 5) { setCaptchaError(''); triggerSubmissionQueue(() => onCaptchaPassed()); return true; }
    return true;
  };

  const resetCaptcha = () => {
    setCaptchaCode(generateCode()); setCaptchaInput(''); setCaptchaInput2('');
    setCaptchaError(''); setCheckboxPhase(0); setCheckbox1(false); setCheckbox2(false);
    setRefreshCount(0); setShowDoubleCaptcha(false); setSubmitting(false);
    setSubmitProgress(0); setSubmitPhase(0); setHasStartedTyping(false);
    setCaptchaExpireTimer(45);
    if (expireRef.current) clearInterval(expireRef.current);
    startExpireTimer();
  };

  // ── Checkbox JSX ──
  const checkboxJSX = checkboxPhase >= 1 && checkboxPhase <= 5 ? (
    <div style={{ marginTop: 12, border: '2px solid #003366', padding: 12, background: '#f0f0f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <input type="checkbox" id="rc1" checked={checkbox1} disabled={checkboxPhase === 2 || checkboxPhase >= 4}
          onChange={handleCheckbox1} style={{ width: 16, height: 16, cursor: 'pointer' }} />
        <label htmlFor="rc1" style={{ fontSize: 13, cursor: 'pointer' }}>
          ☑ Main robot nahi hoon. <span style={{ fontSize: 9, color: '#666' }}>(I am not a robot)</span>
        </label>
      </div>
      {checkboxPhase === 2 && <div style={{ fontSize: 11, color: '#003366', marginBottom: 6 }}>⏳ Verifying... Browser fingerprint check...</div>}
      {checkboxPhase === 3 && (
        <div style={{ fontSize: 11, color: '#cc0000', background: '#ffe0e0', padding: 6, border: '1px solid #cc0000', marginBottom: 8 }}>
          ❌ Verification failed. Fingerprint mismatch.<br/>
          <button onClick={() => setCheckboxPhase(1)} style={{ marginTop: 4, background: '#003366', color: 'white', border: 'none', padding: '3px 8px', fontSize: 10, cursor: 'pointer' }}>Retry →</button>
        </div>
      )}
      {checkboxPhase >= 4 && (<>
        <div style={{ fontSize: 10, color: '#006600', marginBottom: 6, background: '#d4edda', padding: '4px 8px', border: '1px solid #28a745' }}>✓ First confirmation received.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <input type="checkbox" id="rc2" checked={checkbox2} onChange={handleCheckbox2} style={{ width: 16, height: 16, cursor: 'pointer' }} />
          <label htmlFor="rc2" style={{ fontSize: 13, cursor: 'pointer' }}>
            ☑ Main DEFINITELY robot nahi hoon. <span style={{ fontSize: 9, color: '#666' }}>(Confirm previous confirmation)</span>
          </label>
        </div>
        {checkboxPhase === 4 && <div style={{ fontSize: 9, color: '#888' }}>(Pehli confirmation ki confirmation zaroori hai.)</div>}
      </>)}
      {checkboxPhase === 5 && (
        <div style={{ fontSize: 11, color: '#006600', background: '#d4edda', padding: 6, border: '1px solid #28a745', marginTop: 8 }}>
          ✓✓ Both confirmed. Click "आगे बढ़ें" to submit.
        </div>
      )}
    </div>
  ) : null;

  // ── Submission queue JSX ──
  const submissionJSX = submitting ? (
    <div style={{ marginTop: 12, border: '2px solid #003366', padding: 12, background: '#f0ede0', textAlign: 'center' }}>
      <div style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 8 }}>⏳ {submitMessage}</div>
      <div style={{ background: '#ccc', height: 20, width: '100%', border: '1px solid #999', marginBottom: 6, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: submitProgress + '%', background: submitPhase === 2 ? '#ff6600' : submitProgress === 100 ? '#006600' : '#003366', transition: submitPhase === 1 ? 'width 0.5s ease' : 'none' }} />
      </div>
      <div style={{ fontSize: 10, color: '#666' }}>
        {submitProgress < 89 && 'Communicating with server...'}
        {submitProgress >= 89 && submitPhase === 2 && '⚠ Connection unstable. Do NOT close this window.'}
        {submitPhase === 3 && '🔄 Retrying...'}
        {submitPhase === 4 && '✓ Approved!'}
      </div>
      {submitPhase === 2 && <div style={{ fontSize: 9, color: '#cc0000', marginTop: 4 }}>Freeze at 89% is a feature, not a bug.</div>}
    </div>
  ) : null;

  // ── Main captcha JSX ──
  const captchaJSX = (
    <div style={{ border: '1px solid #aaa', padding: 14, background: '#ece9d8', marginBottom: 12 }}>
      <label style={{ fontWeight: 'bold', fontSize: 13 }}>Security Verification* (Compulsory / Zaroori) 🔐</label>
      <div style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>(Suraksha Jaanch — Type the code shown below exactly as displayed)</div>

      {!showDoubleCaptcha ? (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ background: captchaExpireTimer <= 10 ? '#cc0000' : '#003366', color: 'white', fontSize: 11, padding: '2px 8px', fontFamily: 'monospace' }}>⏱ Expires in: {captchaExpireTimer}s</div>
            <div style={{ fontSize: 9, color: '#888' }}>(Auto-refreshes on expiry.)</div>
          </div>
          <div style={{ display: 'inline-block', background: '#f5f5dc', border: '2px solid #003366', padding: '10px 20px', fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 'bold', letterSpacing: 10, color: '#003366', userSelect: 'none', marginBottom: 6 }}>{captchaCode}</div>
          <div style={{ fontSize: 9, color: '#666', marginBottom: 10 }}>
            (Type the code shown above)<br/>⚠ No copy-paste allowed.<br/>
            <span style={{ color: '#cc0000' }}>Note: Case sensitive. Or not. Government hasn't decided yet.</span>
          </div>
          <button onClick={handleRefreshCaptcha} style={{ background: '#4a86d8', color: 'white', border: 'none', padding: '5px 12px', fontSize: 12, cursor: 'pointer', marginBottom: 8 }}>🔄 Refresh CAPTCHA (Get easier code)</button>
          {refreshCount >= 2 && <div style={{ fontSize: 9, color: '#cc0000', marginBottom: 4 }}>⚠ Excessive refreshing logged.{refreshCount >= 3 && ' Session flagged.'}</div>}
          <div>
            <input type="text" value={captchaInput} maxLength={captchaCode.length + 2}
              placeholder={`Type the ${captchaCode.length}-character code`}
              style={{ width: '100%', padding: 8, fontSize: 16, border: '2px solid #003366', fontFamily: 'Courier New, monospace', letterSpacing: 4, boxSizing: 'border-box' }}
              onChange={handleCaptchaInput} onKeyDown={handleCaptchaKeydown}
              onPaste={handlePaste} onContextMenu={handleCtxMenu}
              disabled={checkboxPhase >= 1 || submitting} autoComplete="off" autoCorrect="off" spellCheck="false" />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: '#ffe0e0', border: '2px solid #cc0000', padding: 8, marginBottom: 10, fontSize: 12, color: '#cc0000' }}>
            ⚠ Bahut zyada refresh! Ab 2 CAPTCHA solve karne honge.<br/><span style={{ fontSize: 9, color: '#666' }}>(This is your fault.)</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4 }}>CAPTCHA 1 of 2:</div>
            <div style={{ display: 'inline-block', background: '#f5f5dc', border: '2px solid #003366', padding: '8px 16px', fontFamily: 'Georgia', fontSize: 24, fontWeight: 'bold', letterSpacing: 8, color: '#003366', userSelect: 'none', marginBottom: 4 }}>{captchaCode}</div>
            <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              onPaste={handlePaste} onContextMenu={handleCtxMenu} placeholder="First code..."
              disabled={checkboxPhase >= 1 || submitting}
              style={{ display: 'block', width: '100%', padding: 6, border: '2px solid #003366', fontFamily: 'Courier New', fontSize: 14, letterSpacing: 3, marginTop: 4, boxSizing: 'border-box' }} autoComplete="off" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4 }}>CAPTCHA 2 of 2:</div>
            <div style={{ display: 'inline-block', background: '#fff8dc', border: '2px solid #cc6600', padding: '8px 16px', fontFamily: 'Courier New', fontSize: 24, fontWeight: 'bold', letterSpacing: 8, color: '#cc6600', userSelect: 'none', marginBottom: 4, transform: 'rotate(1deg)' }}>{captchaCode2}</div>
            <input type="text" value={captchaInput2} onChange={(e) => setCaptchaInput2(e.target.value.toUpperCase())}
              onPaste={handlePaste} onContextMenu={handleCtxMenu} placeholder="Second code..."
              disabled={checkboxPhase >= 1 || submitting}
              style={{ display: 'block', width: '100%', padding: 6, border: '2px solid #cc6600', fontFamily: 'Courier New', fontSize: 14, letterSpacing: 3, marginTop: 4, boxSizing: 'border-box' }} autoComplete="off" />
          </div>
        </div>
      )}

      {captchaError && <div style={{ color: '#cc0000', fontSize: 12, marginTop: 6, background: '#ffe0e0', border: '1px solid #cc0000', padding: 6, whiteSpace: 'pre-line' }}>{captchaError}</div>}
      {checkboxJSX}
      {submissionJSX}
      <div style={{ marginTop: 8, textAlign: 'right' }}>
        <span style={{ fontSize: 9, color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => alert('Audio CAPTCHA Player initializing...\n\n[Loading: captcha_audio_hindi_v3.mp3]\n[File size: 847MB]\n[Download time: 6-8 business years]\n\nError: Audio server is on lunch break.')}>
          🔊 Visually impaired? Audio CAPTCHA →
        </span>
      </div>
    </div>
  );

  return { validate, resetCaptcha, captchaJSX, submitting };
}

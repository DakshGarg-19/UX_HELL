import React from 'react';

export default function Screen0({ setCurrentStep }) {
  return (
    <div>
      {/* Section header */}
      <div style={{ background: '#003366', color: 'white', padding: '8px 12px', fontFamily: 'Georgia, serif', fontSize: 14 }}>
        पासपोर्ट सेवाएँ | Passport Services
        <div style={{ color: '#aaa', fontSize: 11, fontStyle: 'italic' }}>(Passport Sevaen — Passport Services)</div>
      </div>

      <div style={{ padding: 12 }}>
        {/* Welcome */}
        <div style={{ color: '#cc0000', fontWeight: 'bold', fontSize: 18, fontFamily: 'Georgia, serif', marginBottom: 4 }}>
          भारत के नागरिकों का स्वागत है!
        </div>
        <div style={{ color: '#666', fontSize: 12, fontStyle: 'italic', marginBottom: 16 }}>
          (Bharat ke Nagrikon ka Swagat hai! — Welcome, Citizens of India!)
        </div>

        {/* Required Documents */}
        <div style={{ border: '1px solid #aaa', background: '#f0ede0', padding: 12, marginBottom: 16 }}>
          <div style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 8 }}>
            ⚠ Required Documents (Aavashyak Dastavez):
          </div>
          <ol style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.8 }}>
            <li>Aadhaar Card (Original + 7 Photocopies + 1 Photocopy of Photocopy)</li>
            <li>Birth Certificate of your neighbour (notarised)</li>
            <li>Class 2 School Report Card (minimum Grade C in Drawing)</li>
            <li>Proof that you existed before the year 2007</li>
            <li>Affidavit stating you are not a time traveller</li>
            <li>One passport-size photo (taken before sunrise, no smiling)</li>
            <li>Blood type certificate (from a govt hospital only, not Lal Path Labs)</li>
            <li>NOC from your previous landlord (all landlords since 1990)</li>
            <li>Bank statement showing balance between ₹0 and ₹10,00,000</li>
            <li>Death certificate of anyone in family (if applicable; if not, obtain one)</li>
            <li>Character certificate from at least one panchayat member</li>
            <li>Completed Form 17-B (not yet available for download)</li>
          </ol>
        </div>

        {/* Start button */}
        <button
          onClick={() => setCurrentStep(1)}
          className="govt-btn"
          style={{ width: '100%', fontSize: 18, padding: '14px 20px' }}
        >
          START APPLICATION →
        </button>

        <div style={{ fontSize: 9, color: '#888', marginTop: 6, lineHeight: 1.4 }}>
          By clicking Start, you agree to our 847-page Terms &amp; Conditions (PDF, 1.2GB download). Non-compliance is punishable under Section 420 IPC. By proceeding you also waive all rights including the right to waive rights.
        </div>
      </div>
    </div>
  );
}
